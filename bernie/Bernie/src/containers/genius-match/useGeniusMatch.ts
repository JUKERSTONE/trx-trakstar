import React, {useEffect, useState, useContext} from 'react';
import {useAPI, APIKeys, routes} from '../../api';
import {useBERNIEState} from '../../app';
import firestore from '@react-native-firebase/firestore';

export const useGeniusMatch = ({navigation, route}: any) => {
  const [query, setQuery] = useState<any>(null);
  const [TRAK, setTRAK] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [TRAKCollection, setTRAKCollection] = useState<any>([]);
  const [seed, setSeed] = useState<any>();
  const [isRare, setIsRare] = useState<boolean>(false);
  const [selectedValueLabel, setSelectedValueLabel] = useState('standard');
  const [selectedValueTier, setSelectedValueTier] = useState('tier_4');
  const [mintLoading, setMintLoading] = useState(false);
  const [spotifyID, setSpotifyID] = useState<any>(null);
  const [appleMusicID, setAppleMusicID] = useState<any>(null);
  const [youTubeID, setYouTubeID] = useState<any>(null);
  const [soundcloudID, setSoundcloudID] = useState<any>(null);
  const [trakTemplate, setTrakTemplate] = useState<any>(null);

  console.log(
    '🚀 ~ file: useGeniusMatch.ts:6 ~ useGeniusMatch ~ route:',
    route.params.reference,
  );

  useEffect(() => {
    console.log(
      '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ spotifyID:',
      spotifyID,
    );
    console.log(
      '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ :',
      appleMusicID,
    );
    console.log(
      '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ e:',
      soundcloudID,
    );
    console.log(
      '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ rf:',
      youTubeID,
    );
  }, [soundcloudID, youTubeID, appleMusicID, spotifyID]);

  const reference = route.params.reference;

  const {handleGetState} = useBERNIEState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.trx.accessToken;
  console.log(
    '🚀 ~ file: useMineToken.ts ~ line 24 ~ useMineToken ~ accessToken',
    accessToken,
  );

  const {GET, POST} = useAPI();

  useEffect(() => {
    setTRAKCollection([...TRAKCollection, TRAK]);
  }, [TRAK]);

  // useEffect(() => {
  //   console.log(
  //     '🚀 ~ file: useMineToken.ts ~ line 25 ~ useMineToken ~ TRAKCollection',
  //     TRAKCollection,
  //   );
  // }, [TRAKCollection]);

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  const handleAction = () => {
    setTRAKCollection([]);
    const route = routes.genius({method: 'search', payload: {query}});
    const token = APIKeys.genius.accessToken;

    const response = GET({route, token});

    Promise.resolve(response)
      .then((res: any) => {
        const geniusHits = res.data.response.hits;
        return geniusHits;
      })
      .then((geniusHits: any) => {
        geniusHits.map((hit: any) => {
          const geniusId = hit.result.id;

          const route = routes.genius({method: 'songs', payload: {geniusId}});

          const response = GET({route, token});

          Promise.resolve(response).then((res: any) => {
            const song = res.data.response.song;

            const meta = {
              genius_url: song.url,
              release_date: song.release_date,
              description: song.description,
              custom_performances: song.custom_performances, // use
              recording_location: song.recording_location,
              writer_artists: song.writer_artists,
              featured_artists: song.featured_artists,
              producer_artists: song.producer_artists,
              song_relationships: song.song_relationships,
              // artist : get from genius FOR socials
            };

            let centralized: any = [];
            let providers: any[] = [
              'apple_music',
              'soundcloud',
              'spotify',
              'youtube',
            ];

            const media = song.media;
            const hasAppleMusic = song.apple_music_id;
            const apple_music = hasAppleMusic
              ? {id: song.apple_music_id}
              : null;

            if (hasAppleMusic) {
              centralized.push('apple_music');
            }

            let trak: any = {
              artist: song.artist_names,
              title: song.title,
              thumbnail: song.song_art_image_thumbnail_url,
              apple_music,
              genius: {id: JSON.stringify(geniusId)},
              soundcloud: null,
              spotify: null,
              youtube: null,
            };

            media.map((media: any) => {
              switch (media.provider) {
                case 'soundcloud':
                  centralized.push('soundcloud');
                  trak[media.provider] = {url: media.url};
                  break;
                case 'spotify':
                  centralized.push('spotify');
                  trak[media.provider] = {id: media.native_uri.split(':')[2]};
                  break;
                case 'youtube':
                  centralized.push('youtube');
                  trak[media.provider] = {url: media.url};
                  break;
                default:
                  trak[media.provider] = {url: media.url};
                  break;
              }
            });

            let missingProviders: any = [];

            providers.map((provider: string) => {
              const hasProvider = centralized.includes(provider);
              if (!hasProvider) {
                missingProviders.push(provider);
              }
            });

            setTRAK({
              trak,
              meta,
              missingProviders,
            });
          });
        });
      });
  };

  const handleSeed = ({item}: any) => {
    setSeed(item);
    // setModalVisible(true);
    navigation.navigate('TRXFill', {trak: item, isPreview: true, reference});
  };

  const handleMintTRAK = async ({seed}: any) => {
    console.log(
      '🚀 ~ file: useGeniusMatch.ts:162 ~ handleMintTRAK ~ seed:',
      seed,
    );
    setMintLoading(true);

    const {trak, meta, missingProviders} = seed;
    // check
    const isPrimaryTRAK = seed.trak.spotify || spotifyID ? true : false;

    // check for duplicates

    const {title, artist} = trak;

    // const route = routes.bernie({
    //   method: 'duplicate_trak',
    //   payload: null,
    // });
    // console.log(
    //   '🚀 ~ file: useMineToken.ts ~ line 158 ~ handleMintTRAK ~ route',
    //   route,
    // );
    // console.log(
    //   '🚀 ~ file: useMineToken.ts ~ line 158 ~ handleMintTRAK ~ {title, artist}',
    //   {title, artist},
    // );

    // const response: any = POST({
    //   route,
    //   token: null,
    //   body: {title, artist},
    //   ContentType: 'application/json',
    // });
    // console.log(
    //   '🚀 ~ file: useMineToken.ts ~ line 160 ~ handleMintTRAK ~ response',
    //   response,
    // );

    // Promise.resolve(response).then((res: any) => {
    // const data = res.data;
    // console.log(
    //   '🚀 ~ file: useMineToken.ts ~ line 180 ~ Promise.resolve ~ data',
    //   data,
    // );
    // const {hasDuplicates} = data;
    const hasDuplicates = false;
    // console.log(
    //   '🚀 ~ file: useMineToken.ts ~ line 185 ~ Promise.resolve ~ hasDuplicates',
    //   hasDuplicates,
    // );

    switch (hasDuplicates) {
      case true:
        // @ts-ignore
        alert('Seems like TRAK already exists');
        setMintLoading(false);
        break;
      case false:
        // @ts-ignore
        switch (isPrimaryTRAK) {
          case true:
            const spotifyURI = seed.trak.spotify?.uri;
            const id = spotifyID ? spotifyID.id : spotifyURI.split(':')[2];
            const route = routes.spotify({method: 'track', payload: {id}});
            const state = handleGetState({index: 'keys'});

            const token = state.spotify.bernie.access_token;
            const response: any = GET({route, token});

            Promise.resolve(response).then(async (res: any) => {
              const data = res.data;
              if (!data) {
                // @ts-ignore
                alert('Invalid Spotify ID');
                setIsRare(false);
                setSelectedValueLabel('standard');
                setSelectedValueTier('tier_4');
                setMintLoading(false);
                setSpotifyID(null);
                setAppleMusicID(null);
                setYouTubeID(null);
                setSoundcloudID(null);
              }

              // extra data

              const trakCandidate = {
                trak,
                meta,
                missingProviders,
                comments: [],
                likes: [],
              };

              console.log(
                '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ spotifyID:',
                spotifyID,
              );
              console.log(
                '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ :',
                appleMusicID,
              );
              console.log(
                '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ e:',
                soundcloudID,
              );
              console.log(
                '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ rf:',
                youTubeID,
              );

              const data1 = {
                protocol: `trx-00`,
                TRAK: {
                  ...seed,
                  // extraData
                  comments: [],
                  likes: [],
                  trak: {
                    ...seed.trak,
                    spotify: spotifyID
                      ? `spotify:track:${spotifyID}`
                      : seed.trak.spotify,
                    apple_music: appleMusicID
                      ? appleMusicID
                      : seed.trak.apple_music,
                    soundcloud: soundcloudID
                      ? soundcloudID
                      : seed.trak.soundcloud,
                    youtube: youTubeID ? {url: youTubeID} : seed.trak.youtube,
                  },
                },
              };

              const {protocol, TRAK} = data1;

              const trakURI = `trx:00:${reference.isrc}`;

              const trxExists = (
                await firestore().doc(`TRX/trx:00:${reference.isrc}`).get()
              ).exists;

              if (trxExists) {
                alert(
                  `${reference.title} by ${reference.artist} already exists in TRX`,
                );
                return;
              }

              await firestore()
                .doc(`TRX/${trakURI}`)
                .set({
                  title: reference.title,
                  artist: reference.artist,
                  isrc: reference.isrc,
                  serialized_trak: JSON.stringify(data1),
                  // extra data
                })
                .then(async () => {
                  alert('succesfully matched');
                  await firestore()
                    .collection('likes')
                    .where('title', '==', reference.title)
                    .where('artist', '==', reference.artist)
                    .limit(1)
                    .get()
                    .then((doc: any) => {
                      const path = doc._changes[0]._nativeData.doc.path;
                      firestore()
                        .doc(path)
                        .update({isPreview: false, trakURI: trakURI}); // migrate to 00 like
                      console.log(
                        '🚀 ~ file: useGeniusMatch.ts:334 ~ .then ~ doc:',
                        doc,
                      );
                      //
                    });

                  setMintLoading(false);
                })
                .catch(err => {
                  alert('could not match');
                  console.log(
                    '🚀 ~ file: useGeniusMatch.ts:275 ~ Promise.resolve ~ err:',
                    err,
                  );
                  setMintLoading(false);
                });
            });
            break;
          case false:
            const trakCandidate = {
              trak,
              meta,
              missingProviders,
              comments: [],
              likes: [],
            };
            console.log(
              '🚀 ~ file: useGeniusMatch.ts:323 ~ Promise.resolve ~ trakCandidate:',
              trakCandidate,
            );

            const data = {
              protocol: `trx-00`,
              TRAK: {
                ...seed,
                isLocal: true,
                comments: [],
                likes: [],
                trak: {
                  ...seed.trak,
                  spotify: spotifyID
                    ? `spotify:track:${spotifyID}`
                    : seed.trak.spotify,
                  apple_music: appleMusicID
                    ? appleMusicID
                    : seed.trak.apple_music,
                  soundcloud: soundcloudID
                    ? soundcloudID
                    : seed.trak.soundcloud,
                  youtube: youTubeID ? {url: youTubeID} : seed.trak.youtube,
                  isLocal: true,
                },
              },
            };

            console.log(
              '🚀 ~ file: useGeniusMatch.ts:344 ~ //Promise.resolve ~ data:',
              data,
            );

            const {protocol, TRAK} = data;

            const trakURI = `trx:00:${reference.isrc}`;

            const trxExists = (
              await firestore().doc(`TRX/trx:00:${reference.isrc}`).get()
            ).exists;

            if (trxExists) {
              alert(
                `${reference.title} by ${reference.artist} already exists in TRX`,
              );
              return;
            }
            console.log(
              '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ spotifyID:',
              spotifyID,
            );
            console.log(
              '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ :',
              appleMusicID,
            );
            console.log(
              '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ e:',
              soundcloudID,
            );
            console.log(
              '🚀 ~ file: useGeniusMatch.ts:413 ~ //Promise.resolve ~ rf:',
              youTubeID,
            );

            console.log(
              '🚀 ~ file: useGeniusMatch.ts:370 ~ //Promise.resolve ~ trakCandidate:',
              trakCandidate,
            );
            await firestore()
              .doc(`TRX/${trakURI}`)
              .set({
                title: reference.title,
                artist: reference.artist,
                isrc: reference.isrc,
                serialized_trak: JSON.stringify({
                  protocol: `trx-00`,
                  TRAK: {
                    ...seed,
                    isLocal: true,
                    comments: [],
                    likes: [],
                    trak: {
                      ...seed.trak,
                      spotify: spotifyID
                        ? `spotify:track:${spotifyID}`
                        : seed.trak.spotify,
                      apple_music: appleMusicID
                        ? appleMusicID
                        : seed.trak.apple_music,
                      soundcloud: soundcloudID
                        ? soundcloudID
                        : seed.trak.soundcloud,
                      youtube: youTubeID ? {url: youTubeID} : seed.trak.youtube,
                      isLocal: true,
                    },
                  },
                }),
              })
              .then(async () => {
                alert('succesfully matched');
                // update likes document with new trx id
                await firestore()
                  .collection('likes')
                  .where('title', '==', reference.title)
                  .where('artist', '==', reference.artist)
                  .limit(1)
                  .get()
                  .then((doc: any) => {
                    const path = doc._changes[0]._nativeData.doc.path;
                    firestore()
                      .doc(path)
                      .update({isPreview: false, trakURI: trakURI});
                    console.log(
                      '🚀 ~ file: useGeniusMatch.ts:334 ~ .then ~ doc:',
                      doc,
                    );
                    //
                  });

                setMintLoading(false);

                navigation.goBack();
              })
              .catch(err => {
                alert('could not match');
                console.log(
                  '🚀 ~ file: useGeniusMatch.ts:275 ~ Promise.resolve ~ err:',
                  err,
                );
                setMintLoading(false);
              });

            break;
        }
        break;
    }
    //
    //
    // });
  };

  const handleIDChange = ({text, provider}: any) => {
    switch (provider) {
      case 'spotify':
        if (text === '') {
          setSpotifyID(null);
        } else setSpotifyID({uri: text});
        break;
      case 'apple_music':
        if (text === '') {
          setAppleMusicID(null);
        } else setAppleMusicID({id: text});
        break;
      case 'youtube':
        if (text === '') {
          setYouTubeID(null);
        } else setYouTubeID({url: text});
        break;
      case 'soundcloud':
        if (text === '') {
          setSoundcloudID(null);
        } else setSoundcloudID({url: text});
        break;
    }
  };

  return {
    handleInputChange,
    handleAction,
    TRAKCollection,
    modalVisible,
    setModalVisible,
    handleMintTRAK,
    handleSeed,
    seed,
    setSeed,
    setIsRare,
    isRare,
    selectedValueLabel,
    setSelectedValueLabel,
    selectedValueTier,
    setSelectedValueTier,
    mintLoading,
    handleIDChange,
  };
};
