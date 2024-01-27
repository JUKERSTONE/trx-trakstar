import React, {useEffect, useState, useContext} from 'react';
import {APIKeys, api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  appendLike,
  setYoutubeId,
  setTraklist,
  useAsyncStorage,
  asyncStorageIndex,
  appendTraklist,
} from '../../stores';
import {
  useGenerate,
  useFirebase,
  useLITELISTState,
  useEffectAsync,
  handleLikeTRAK,
  handleGetTRX00,
} from '../../app';
import {Alert} from 'react-native';
import {handleAddTRX04} from '../firebase/hooks/addTRX04';
import Toast from 'react-native-toast-message';
import {TRX_00} from '../../types';
import {TRX_04} from '../../types/TRX/TRX-04';
import {useSelector} from 'react-redux';
import {handleAddTRX00} from '../firebase/hooks/addTRX00';
import {Trak} from '../../types/TRX/trak';
import {handleTRX00SpotifyDependancies} from '../handlers/trx00SpotifyDependencies';
import {handleRequestTrak} from '../firebase/hooks/requestTrak';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import {PlayerContext} from '../../stores';

const {handleGetState} = useLITELISTState();
const {handleClear, handleStore} = useAsyncStorage();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.spotify.accessToken;
const appToken = keys.spotify.appToken;

export const useTRX = (props?: any) => {
  const {useGET} = useAPI();
  const {
    mode,
    paused,
    muted,
    players,
    repeat,
    source,
    image,
    cover_art,
    uri,
    title,
    artist,
    queue,
    index,
    youtubeId,
    youtubeMinimize,
    isTraklist,
    traklistIndex,
    traklist,
    id,
    isrc,
    hidden,
    isPrimaryPlayer,
    youtubeLoop,
    radio,
  } = useSelector((state: any) => state.player);

  const {userData, setUserData} = useContext(PlayerContext);

  const handleStreamTRX = async ({
    uri,
    title,
    artist,
    cover_art,
    geniusId,
  }: {
    uri: string;
    title: string;
    artist: string;
    cover_art: string;
    geniusId: string;
  }) => {
    const trxRadio = radio;

    console.log('🚀 ~ useTRX ~ trxRadio:', trxRadio);
    console.log('🚀 ~ useTRX ~ traklistIndex:', traklistIndex);
    // if next branch doesn't exist, create it
    if (traklistIndex === traklist.length - 1) {
      const traklist = await Promise.all(
        trxRadio.default.value.map(async (isrc: string) => {
          return await handleGetTRX00({trakURI: `trx:00:${isrc}`});
        }),
      );

      const playerService = traklist.map((item: any) => {
        const trak = JSON.parse(item.serialized_trak).TRAK;
        console.log('🚀 ~ file: radio.ts:27 ~ trx ~ trak:', trak);
        return {
          player: {
            title: trak.trak.title,
            artist: trak.trak.artist,
            cover_art: trak.trak.thumbnail,
            geniusId: trak.trak.genius.id,
          },
          service: {provider: 'youtube', url: trak.trak.youtube.url},
          id: item.id,
        };
      });

      const action1 = handleMediaPlayerAction({
        playbackState: 'pause:force',
      });

      store.dispatch(action1);
      const action = appendTraklist({
        traklist: playerService,
        radio: trxRadio.default,
      });

      store.dispatch(action);

      await handleStore({
        key: asyncStorageIndex.radio,
        value: {
          trx: trxRadio.default,
          traklist: playerService,
          index: 0,
        },
      });
    } else {
      await handleStore({
        key: asyncStorageIndex.radio,
        value: {
          trx: trxRadio,
          traklist,
          index: traklistIndex + 1,
        },
      });
    }

    console.log('🚀 ~ file: stream.ts:15 ~ handleStream ~ uri:', uri);
    const {handleGetState} = useLITELISTState();
    const profile = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    const userId = TRXProfile.id;
    console.log(
      '🚀 ~ file: retrieveStory.ts ~ line 18 ~ handleRetrieveStory ~ userId',
      userId,
    );

    const sessionId = uuid.v4();

    const session = {
      id: sessionId,
      userId,
      uri,
      title,
      artist,
      cover_art,
      geniusId,
      streamingAt: new Date().toString(),
    };

    const streamDoc = await firestore()
      .doc('fundamentals/TRAKSTAR/streaming/' + uri)
      .get()
      .then(async doc => {
        const data = doc.data();
        console.log('🚀 ~ file: stream.ts:39 ~ handleStream ~ data:', data);
        if (doc.exists) {
          await firestore()
            .doc('fundamentals/TRAKSTAR/streaming/' + uri)
            .update({
              count: data?.count + 1,
              artist,
              cover_art,
              geniusId,
              title,
              uri,
            });
        } else {
          await firestore()
            .doc('fundamentals/TRAKSTAR/streaming/' + uri)
            .set({
              count: 1,
              artist,
              cover_art,
              geniusId,
              title,
              uri,
            })
            .catch(err => {
              alert('stream err');
              console.log('🚀 ~ file: stream.ts:52 ~ handleStream ~ err:', err);
            });
        }

        console.log('🚀 ~ file: getTrending.ts:29 ~ .then ~ data:', doc.data());
      })
      .then(async () => {
        //
        // update user playback
        const userPlaybackRef = firestore().doc(
          `users/${userId}/playback/` + uri,
        );

        await firestore()
          .doc(`sessions/${sessionId}`)
          .set(session)
          .then(() => {
            userPlaybackRef.get().then(doc => {
              if (doc.exists) {
                const data = doc.data();
                userPlaybackRef.update({
                  count: data?.count + 1,
                  artist,
                  cover_art,
                  geniusId,
                  title,
                  uri,
                });
              } else {
                userPlaybackRef.set({
                  count: 1,
                  artist,
                  cover_art,
                  geniusId,
                  title,
                  uri,
                });
              }

              Toast.show({
                type: 'info',
                text1: "That's called a stream!",
                text2: `Thank you for using TrakStar™ - Free music, no ads`,
              });
            });
          });
      })
      .catch(err => {
        // alert('err stream 1');
        console.log('🚀 ~ file: stream.ts:70 ~ .then ~ err:', err);
      });

    console.log(
      '🚀 ~ file: stream.ts:24 ~ handleStream ~ streamDoc:',
      streamDoc,
    );
  };

  const handleLikeTRX = async ({geniusId}: {geniusId: string}) => {
    const route = api.genius({method: 'songs', payload: {geniusId}});
    const token = APIKeys.genius.accessToken;
    const response = await useGET({route, token});
    console.log(
      '🚀 ~ file: TRAKLISTradio.tsx:93 ~ handleGenius ~ response:',
      response,
    );

    const profile = handleGetState({index: 'profile'});
    const TRX = profile.TRX;
    console.log('🚀 ~ handleLikeTRX ~ TRX:', TRX);
    const userId = TRX.id;
    console.log('🚀 ~ handleLikeTRX ~ userId:', userId);

    const trak = await Promise.resolve(response).then(async (res: any) => {
      const song = res.data.response.song;
      console.log('🚀 ~ file: useTRAKTab.ts ~ line 46 ~ trak ~ song', song);

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
      const apple_music = hasAppleMusic ? {id: song.apple_music_id} : null;

      console.log('🚀 ~ file: useTRX.ts:102 ~ trak ~ media:', media);
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

      const trakCandidate: Trak = {
        trak,
        meta,
        missingProviders,
        comments: [],
        likes: [],
      };
      console.log(
        '🚀 ~ file: useTRAKTab.ts ~ line 116 ~ Promise.resolve ~ trawwk',
        trakCandidate,
      );
      return trakCandidate;
    });

    let protocol: string = '';

    if (!accessToken) {
      console.log('🚀 ~ file: useTRX.ts:161 ~ useTRX ~ trak:', trak);
      return await handleLikeTRAK({
        trak: {...trak, ytid: trak.trak.youtube?.url.split('=')[1]},
        protocol: 'trx:04',
      })
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'TRX TrakStar!',
            text2: 'Radio optimizing your experience',
          });
        })
        .then(() => {
          const action = appendLike({
            ...trak.trak,
            userId,
            trxUri: 'trx:04:' + trak.trak.youtube?.url.split('=')[1],
          });
          store.dispatch(action);
        });
    }

    if (trak.trak.spotify?.id && trak.trak.youtube?.url) {
      protocol = 'trx:00';
    } else if (!trak.trak.spotify?.id && trak.trak.youtube?.url) {
      protocol = 'trx:04';
    }

    switch (protocol) {
      case 'trx:00':
        if (!trak.trak.spotify?.id) return;
        const extraData = await handleTRX00SpotifyDependancies({
          id: trak.trak.spotify.id!,
          accessToken,
        });

        return await handleAddTRX00({trak: {...trak, ...extraData}})
          .then(() =>
            handleLikeTRAK({trak: {...trak, ...extraData}, protocol: 'trx:00'}),
          )
          .then(() => {
            console.log('🚀 ~ handleLikeTRX ~ trak:', trak, {
              ...trak.trak,
              userId,
            });
            const action = appendLike({
              ...trak.trak,
              userId,
              trxUri: 'trx:04:' + trak.trak.youtube?.url.split('=')[1],
            });
            store.dispatch(action);
            Toast.show({
              type: 'success',
              text1: 'GLAD YOU LIKE IT!',
              text2: 'We added this song to your TRAKLIST™️.',
            });
          });

      case 'trx:04':
        console.log('🚀 ~ handleLikeTRX ~ trak:', trak, {
          ...trak.trak,
          userId,
        });
        return await handleAddTRX04({trak})
          .then(() => {
            handleLikeTRAK({
              trak: {...trak, ytid: trak.trak.youtube?.url.split('=')[1]},
              protocol: 'trx:04',
            });
          })
          .then(() => {
            const action = appendLike({
              ...trak.trak,
              userId,
            });
            store.dispatch(action);
            Toast.show({
              type: 'success',
              text1: 'GLAD YOU LIKE IT!',
              text2: 'We added this song to your TRAKLIST™️.',
            });
          });

      default:
        return;
    }
  };

  const handleRequestTRX = async ({
    trak,
    request,
  }: {
    trak: any;
    request: 'unavailable' | 'preview';
  }) => {
    console.log('🚀 ~ file: useTRX.ts:349 ~ useTRX ~ trak:', trak);
    switch (request) {
      case 'unavailable':
        await handleRequestTrak(trak);
        break;
      case 'preview':
        await handleLikeTRAK({trak, protocol: 'trx:isrc'});
        break;
      default:
        break;
    }
  };

  const handlePlayTRX = async ({
    navigation,
    geniusId,
    spotifyAccessToken,
    trx,
    media,
  }: {
    navigation: any;
    geniusId?: any;
    spotifyAccessToken: any;
    trx?: any;
    media?: any;
  }) => {
    console.log('🚀 ~ file: useTRX.ts:375 ~ useTRX ~ media:', media);
    const {handleGetState} = useLITELISTState();
    const profile = handleGetState({index: 'profile'});
    console.log('🚀 ~ file: useTRX.ts:376 ~ useTRX ~ profile:', profile);

    if (media) {
      const traklist = media
        .filter((item: any) => item)
        .map((item: any) => {
          console.log('🚀 ~ file: useTRX.ts:381 ~ traklist ~ item:', item);
          console.log('🚀 ~ file: useTape.ts:200 ~ media.map ~ item:', item);

          const serviceIndex = item.media.findIndex(
            (item: any) => item.provider == 'youtube',
          );

          if (serviceIndex === -1) return;

          const service = {
            provider: item.media[serviceIndex].provider,
            url: item.media[serviceIndex].url,
          };

          console.log('🚀 ~ file: useTape.ts:203 ~ media.map ~ seeervice:', {
            title: item.title,
            artist: item.artist_names,
            cover_art: item.song_art_image_thumbnail_url,
            geniusId: item.id,
            service,
            id: item.id,
          });

          return {
            player: {
              title: item.title,
              artist: item.artist_names,
              cover_art: item.song_art_image_thumbnail_url,
              geniusId: item.id,
            },
            service,
            id: item.id,
          };
        });
      console.log('🚀 ~ file: useTRX.ts:410 ~ traklist ~ traklist:', traklist);

      const filteredTrak = traklist.filter((item: any) => item);
      console.log(
        '🚀 ~ file: useTape.ts:236 ~ handleTRAK ~ filteredTrak:',
        filteredTrak,
      );
      console.log('🚀 ~ file: useTape.ts:218 ~ traklist ~ traklist:', traklist);

      const action1 = handleMediaPlayerAction({
        playbackState: 'pause:force',
      });
      console.log('🚀 ~ file: useTape.ts:200 ~ handleTRAK ~ media:', media);

      store.dispatch(action1);
      const action = setTraklist({
        traklist: filteredTrak,
        activeIndex: traklistIndex,
      });

      store.dispatch(action);

      return;
    }

    if (trx) {
      if (trx.trak.youtube) {
        // more states - horray

        const action1 = handleMediaPlayerAction({
          playbackState: 'pause:force',
        });
        store.dispatch(action1);
        const action = setYoutubeId({
          youtubeId: trx.trak.youtube.url,
          player: {
            geniusId: trx.trak.genius.id,
            title: trx.trak.title,
            artist: trx.trak.artist,
            cover_art: trx.trak.thumbnail,
          },
          trak: {
            protocol: trx.protocol,
            trak: trx,
          },
        });
        store.dispatch(action);
        return;
      } else {
        handleRequestTRX({trak: trx, request: 'unavailable'});

        navigation.navigate('MODAL', {
          type: 'trak',
          exchange: {
            active: true,
            item: trx,
          },
        });
        return;
      }
    }

    const token = APIKeys.genius.accessToken;
    const route = api.genius({method: 'songs', payload: {geniusId}});

    const response = useGET({route, token});

    const trak: any = await Promise.resolve(response).then((res: any) => {
      const song = res.data.response.song;
      console.log('🚀 ~ file: useTRAKTab.ts ~ line 46 ~ trak ~ song', song);

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
      const apple_music = hasAppleMusic ? {id: song.apple_music_id} : null;

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

      //

      const trakCandidate = {
        trak,
        meta,
        missingProviders,
        comments: [],
        likes: [],
      };
      console.log(
        '🚀 ~ file: useTRAKTab.ts ~ line 116 ~ Promise.resolve ~ trawwk',
        trakCandidate,
      );
      return trakCandidate;
    });
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line eeeew134 ~ handleTRAK ~ trak',
      trak.trak.youtube,
    );

    // play youtube

    console.log('🚀 ~ file: useTRAKTab.ts:230 ~ handleTRAK ~ trak:', trak);

    let protocol: string = '';

    if (trak.trak.spotify?.id && trak.trak.youtube?.url) {
      const extraData = await handleTRX00SpotifyDependancies({
        id: trak.trak.spotify?.id,
        accessToken: spotifyAccessToken,
      });
      trak.isrc = extraData.isrc;
      trak.audioFeatures = extraData.audioFeatures;
      trak.genres = extraData.genres;
      protocol = `trx:00:${extraData.isrc}`;
    } else if (trak.trak.youtube?.url) {
      protocol = `trx:04:${trak.trak.youtube?.url.split('=')[1]}`;
    }

    if (trak.trak.youtube) {
      // if (!profile.trakland.spotify) {
      //   await handleLikeTRX({geniusId: trak.trak.genius.id});
      // }

      // more states - horray
      const action1 = handleMediaPlayerAction({
        playbackState: 'pause:force',
      });
      store.dispatch(action1);
      const action = setYoutubeId({
        youtubeId: trak.trak.youtube.url,
        player: {
          geniusId: trak.trak.genius.id,
          title: trak.trak.title,
          artist: trak.trak.artist,
          cover_art: trak.trak.thumbnail,
        },
        trak: {
          protocol,
          trak,
        },
      });
      store.dispatch(action);
    } else {
      handleRequestTRX({trak, request: 'unavailable'});

      navigation.navigate('MODAL', {
        type: 'trak',
        exchange: {
          active: true,
          item: trak,
        },
      });
    }
  };

  const handleStakeTRX = () => {
    alert(1);
  };

  return {
    handleStreamTRX, // trak in player state
    handleLikeTRX, // local append
    handleRequestTRX, // integrate new likes,
    handlePlayTRX,
    handleStakeTRX,
  };
};
