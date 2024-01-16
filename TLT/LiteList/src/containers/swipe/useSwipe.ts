import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  PlayerContext,
  appendLike,
} from '../../stores';
import {handleLikeTRAK, useGenerate} from '../../app';
import axios from 'axios';
import {useLITELISTState} from '../../app';
import Toast from 'react-native-toast-message';
import {requestSubscription} from 'react-native-iap';
import {useTRX} from '../../app/hooks/useTRX';
import {handleTRX00SpotifyDependancies} from '../../app/handlers/trx00SpotifyDependencies';

export const useSwipe = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [query, setQuery] = useState('All Me Drake');
  const keys = handleGetState({index: 'keys'});
  const player = handleGetState({index: 'player'});
  const subscriptions = handleGetState({index: 'subscriptions'});

  const {handleRequestTRX} = useTRX({...navigation, ...route});

  const {usePOST} = useAPI();
  const packages = subscriptions.packages;
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 21 ~ useSwipe ~ packages',
    packages,
  );
  console.log('🚀 ~ file: useSwipe.ts ~ line 17 ~ useSwipe ~ player', player);
  const spotify = keys.spotify;
  console.log('🚀 ~ spotify:', spotify);
  const accessToken = spotify.accessToken;
  const appToken = spotify.appToken;
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 17 ~ useSwipe ~ accessToken',
    accessToken,
  );
  const {
    handleRecommendations,
    // recommendations,
    progress,
    // handleReload,
  } = useGenerate();
  console.log(
    '🚀 ~ file: useSwipe.ts ~ line 32 ~ useSwipe ~ progress',
    progress,
  );

  const isUnavailable = player.title && player!.source.uri;

  const {userData, setUserData} = useContext(PlayerContext);
  console.log('🚀 ~ file: Swipe.tsx ~ line 44 ~ userData', userData);
  const swiperRef = userData.swiperRef;

  // const handleSetPlayer = ({web, cover_art, artist, title}: any) => {
  const handleSetPlayer = (card: any) => {
    const {web, cover_art, artist, title} = card;
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 25 ~ handleSetPlayer ~ web, cover_art, artist, title',
      web,
      cover_art,
      artist,
      title,
    );

    const action = handleMediaPlayerAction({
      playbackState: 'source',
      uri: web.spotify.preview,
      url: cover_art,
      artist,
      title,
      mode: 'header',
      id: {
        spotify: web.spotify.id,
        apple_music: web.apple_music?.id,
      },
    });
    store.dispatch(action);
  };

  const handleGenerateItems = (index: any) => {
    alert('handle generate items');
    // if (index == recommendations.length - 8) {
    //   alert(
    //     'Generating new recommendations based on your listening history...',
    //   );
    //   handleRecommendations();
    // }
  };

  const handleLoadRecommendations = () => {
    //
    handleRecommendations();
  };

  const handleSwipedRight = async (recommendations: any, index: any) => {
    // alert(recommendations, index);
    console.log(recommendations[index], 'okjk');

    const card = recommendations[index];
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 76 ~ handleSwipedRight ~ card',
      card,
    );
    const ids = card.web.spotify.id;
    const route = api.spotify({method: 'save-track', payload: {ids}});
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 83 ~ handleSwipedRight ~ route',
      route,
    );

    await axios
      .put(route, [ids], {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(() => {
        setSpotifyModal(true);
      })
      .catch(err => {
        // console.log(err, ' - track not saved');
      });

    setTimeout(() => setSpotifyModal(false), 1000);
  };

  const handleTRAKInteraction = async ({type, player}: any) => {
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 112 ~ handleTRAKInteraction ~ player',
      player,
    );
    switch (type) {
      case 'renew':
        navigation.navigate('REGEN');
        break;
      case 'save':
        const ids = player.id;

        const route = api.spotify({method: 'save-track', payload: {ids}});
        console.log('🚀 ~ handleTRAKInteraction ~ route:', route);
        console.log('🚀 ~ handleTRAKInteraction ~ accessToken:', accessToken);

        console.log('🚀 ~ handlerrTRAKInteraction ~ appToken:', appToken);
        const extraData = await handleTRX00SpotifyDependancies({
          id: player.id,
          accessToken: appToken,
        });
        console.log('🚀 ~ handleTRAKInteraction ~ appToken:', appToken);
        console.log('🚀 ~ handleTRAKInteraction ~ extraData:', extraData);

        if (!accessToken) {
          return await handleRequestTRX({
            trak: {
              title: player.title,
              artist: player.artist,
              cover_art: player.image.uri,
              isPreview: true,
              isrc: null,
              preview: player.source.uri,
              spotifyId: player.id,
              genres: null,
              audioFeatures: null,
            },
            request: 'preview',
          }).then(() => {
            const action = appendLike({
              title: player.title,
              artist: player.artist,
              cover_art: player.image.uri,
              isPreview: true,
              isrc: null,
              preview: player.source.uri,
            });
            store.dispatch(action);
          });
        }

        await axios
          .put(route, [ids], {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
          })
          .then(async () => {
            await handleRequestTRX({
              trak: {
                title: player.title,
                artist: player.artist,
                cover_art: player.image.uri,
                isPreview: true,
                preview: player.source.uri,
                spotifyId: player.id,
                isrc: extraData.isrc,
                genres: extraData.genres,
                audioFeatures: extraData.audioFeatures,
              },
              request: 'preview',
            });

            Toast.show({
              type: 'success',
              text1: 'GLAD YOU LIKE IT!',
              text2: 'We added this song to your TRAKLIST™️.',
            });
          })
          .then(() => {
            const action = appendLike({
              title: player.title,
              artist: player.artist,
              cover_art: player.image.uri,
              isPreview: true,
              isrc: extraData.isrc,
              preview: player.source.uri,
            });
            store.dispatch(action);
          })
          .catch(err => {
            console.log(err, ' - track not saved');
            Toast.show({
              type: 'error',
              text1:
                "Error saving '" + !player.hidden
                  ? player.players.spotify.item.artists[0].name
                  : player.artist + ' - ' + !player.hidden
                  ? player.players.spotify.item.name
                  : player.title,
              text2: 'track not saved',
            });
          });
        setTimeout(() => setIsModalVisible(false), 1000);
        break;
      case 'share':
        const action = handleMediaPlayerAction({playbackState: 'share'});
        store.dispatch(action);
        break;
      case 'send':
        navigation.navigate('MMS');
        break;
      case 'sync':
        alert('playlists coming soon');
        break;
      case 'crypto':
        navigation.navigate('SOCIAL');
        break;
      case 'cancel':
        console.log(
          '🚀 ~ file: useSwipe.ts ~ line 198 ~ handleTRAKInteraction ~ cancelLoading',
          cancelLoading,
        );
        if (!cancelLoading) {
          swiperRef.current.swipeLeft();
        }
        setCancelLoading(false);
        break;
      case 'fanclub':
        console.log(
          '🚀 ~ file: useSwipe.ts ~ line 159 ~ handleTRAKInteraction ~ player',
          player,
        );
        navigation.navigate('MODAL', {
          type: 'match-trak',
          exchange: {
            active: true,
            item: {
              title: !player.hidden
                ? player.players.spotify.item.name
                : player.title,
              artist: !player.hidden
                ? player.players.spotify.item.artists[0].name
                : player.artist,
              modal: true,
            },
          },
        });
        break;
      default:
        break;
    }
  };

  const handleQueue = async (id: any) => {
    const route1 = api.spotify({
      method: 'queue-item',
      payload: {
        trackURI: `spotify%3Atrack%3A${id}`,
      },
    });
    console.log(
      '🚀 ~ file: translateRecommendations.ts ~ line 68 ~ recommendations.map ~ route1',
      route1,
    );

    await usePOST({route: route1, token: keys.spotify.accessToken})
      .then((res: any) => {
        console.log(
          '🚀 ~ file: translateRecommendations.ts ~ line 70 ~ awaitusePOST ~ res',
          res,
        );
      })
      .catch((err: any) => {
        console.log(
          '🚀 ~ file: translateRecommendations.ts ~ line 73 ~ awaitusePOST ~ err',
          err,
        );
      });
  };

  const handleNavigationPaywall = () => {
    navigation.navigate('PAYWALL_MODAL');
  };

  return {
    handleSetPlayer,
    handleGenerateItems,
    handleLoadRecommendations,
    handleNavigationPaywall,
    handleSwipedRight,
    isModalVisible,
    progress,
    handleTRAKInteraction,
    setCancelLoading,
    cancelLoading,
    isUnavailable,
    handleQueue,
    setQuery,
    query,
  };
};
