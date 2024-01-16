import React, {useEffect, useState, useContext} from 'react';
import {useAPI, APIKeys, routes} from '../../api';
import {useBERNIEState} from '../../app';

export const useMineToken = () => {
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
              custom_performances: song.custom_performances,
              recording_location: song.recording_location,
              writer_artists: song.writer_artists,
              producer_artists: song.producer_artists,
              song_relationships: song.song_relationships,
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
    setModalVisible(true);
  };

  const handleMintTRAK = ({seed}: any) => {
    setMintLoading(true);

    const {trak, meta} = seed;
    const isPrimaryTRAK = seed.trak.spotify || spotifyID ? true : false;

    // check for duplicates

    const {title, artist} = trak;

    const route = routes.traklist({
      method: 'duplicate_trak',
      payload: null,
    });
    // console.log(
    //   '🚀 ~ file: useMineToken.ts ~ line 158 ~ handleMintTRAK ~ route',
    //   route,
    // );
    // console.log(
    //   '🚀 ~ file: useMineToken.ts ~ line 158 ~ handleMintTRAK ~ {title, artist}',
    //   {title, artist},
    // );

    const response: any = POST({
      route,
      body: {title, artist, isTRX: seed.trak.spotify && seed.trak.apple_music},
      ContentType: 'application/json',
    });

    Promise.resolve(response).then((res: any) => {
      const data = res.data;
      // console.log(
      //   '🚀 ~ file: useMineToken.ts ~ line 180 ~ Promise.resolve ~ data',
      //   data,
      // );
      const {hasDuplicates} = data;
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

              Promise.resolve(response).then((res: any) => {
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

                const TRAKProps = {
                  artist: seed.trak.artist,
                  title: seed.trak.title,
                  cover_art: seed.trak.thumbnail,
                  isrc: data.external_ids.isrc,
                  isPrimaryTRAK: true,
                  isNFT: false,
                  spotify: spotifyID ? spotifyID : seed.trak.spotify,
                  genius: seed.trak?.genius,
                  apple_music: appleMusicID
                    ? appleMusicID
                    : seed.trak?.apple_music,
                  youtube: youTubeID ? youTubeID : seed.trak?.youtube,
                  soundcloud: soundcloudID
                    ? soundcloudID
                    : seed.trak?.soundcloud,
                  label: selectedValueLabel,
                  isRare: isRare,
                  tier: selectedValueTier,
                  meta,
                  trakURI: `trx:00:${data.external_ids.isrc}`,
                };

                console.log(
                  '🚀 ~ file: useMineToken.ts ~ line 256 ~ Promise.resolve ~ TRAKProps',
                  TRAKProps,
                );

                const route = routes.traklist({
                  method: 'set_trak',
                });
                console.log(
                  '🚀 ~ file: useMineToken.ts:275 ~ Promise.resolve ~ spotifyID:',
                  spotifyID,
                );

                const response = POST({
                  route,
                  token: accessToken,
                  tokenType: 'Bearer',
                  body: {
                    protocol: `trx-00`,
                    TRAK: {
                      isLocal: true,
                      isrc: data.external_ids.isrc,
                      comments: [],
                      likes: [],
                      trak: {
                        ...seed.trak,
                        spotify: spotifyID ? spotifyID : seed.trak.spotify,
                        apple_music: appleMusicID
                          ? appleMusicID
                          : seed.trak.apple_music,
                        soundcloud: soundcloudID
                          ? soundcloudID
                          : seed.trak.soundcloud,
                        youtube: youTubeID
                          ? {url: youTubeID}
                          : seed.trak.youtube,
                        isLocal: true,
                      },
                      meta: seed.meta,
                    },
                  },
                  ContentType: 'application/json',
                });
                console.log(
                  '🚀 ~ file: useMineToken.ts:281 ~ Promise.resolve ~ response:',
                  response,
                );

                Promise.resolve(response)
                  .then((res: any) => {
                    const data = res.data;
                    const {success, trakToken} = data;
                    console.log(
                      '🚀 ~ file: useMineToken.ts:290 ~ .then ~ success:',
                      success,
                    );
                    // console.log(
                    //   '🚀 ~ file: useMineToken.ts ~ line 243 ~ Promise.resolve ~ trakToken',
                    //   trakToken,
                    // );
                    setMintLoading(false);
                    if (success) {
                      // @ts-ignore
                      alert('PRIMARY TRAK minted');
                    }
                  })
                  .catch(err => {
                    console.log(
                      '🚀 ~ file: useMineToken.ts:305 ~ Promise.resolve ~ err:',
                      err,
                    );
                    alert('ERROR: Cannot mine primary TRAK');
                    setMintLoading(false);
                  });
              });
              break;
            case false:
              const secondaryTRAKRoute = routes.traklist({
                method: 'set_trak',
              });

              const secondaryTRAKResponse = POST({
                route: secondaryTRAKRoute,
                token: accessToken,
                tokenType: 'Bearer',
                body: {
                  protocol: `trx-04`,
                  TRAK: {
                    comments: [],
                    likes: [],
                    trak: {
                      ...seed.trak,
                      spotify: {uri: `spotify:track:${spotifyID}`},
                      apple_music: {id: appleMusicID},
                      soundcloud: {url: soundcloudID},
                      youtube: {url: youTubeID},
                      isLocal: true,
                    },
                    ...seed,
                  },
                },
                ContentType: 'application/json',
              });

              Promise.resolve(secondaryTRAKResponse)
                .then((res: any) => {
                  const data = res.data;
                  const {success, trakToken} = data;
                  // console.log(
                  //   '🚀 ~ file: useMineToken.ts ~ line 243 ~ Promise.resolve ~ trakToken',
                  //   trakToken,
                  // );

                  setMintLoading(false);
                  if (success) {
                    // @ts-ignore
                    alert('SECONDARY minted');
                    // @ts-ignore
                  } else {
                    alert('ERROR: Cannot mine secondary TRAK');
                    setMintLoading(false);
                  }
                })
                .catch(err => {
                  alert('ERROR: Cannot mine secondary TRAK');
                  setMintLoading(false);
                });
              break;
          }
          break;
      }
      //
      //
    });
  };

  const handleIDChange = ({text, provider}: any) => {
    switch (provider) {
      case 'spotify':
        if (text === '') {
          setSpotifyID(null);
        } else setSpotifyID({id: text});
        break;
      case 'apple_music':
        if (text === '') {
          setAppleMusicID(null);
        } else setAppleMusicID({id: text});
        break;
      case 'youtube':
        if (text === '') {
          setYouTubeID(null);
        } else setYouTubeID({id: text});
        break;
      case 'soundcloud':
        if (text === '') {
          setSoundcloudID(null);
        } else setSoundcloudID({id: text});
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
