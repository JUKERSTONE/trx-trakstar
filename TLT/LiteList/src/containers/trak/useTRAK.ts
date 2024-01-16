import React, {useEffect, useState, useContext} from 'react';
import {
  SPOTIFY_GET_ARTIST,
  SPOTIFY_GET_ARTIST_ALBUMS,
  SPOTIFY_GET_ARTIST_RELATED_ARTISTS,
  SPOTIFY_GET_ARTIST_TOP_TRACKS,
  api,
  useAPI,
} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {
  useLITELISTState,
  handleAppendLikes,
  handleLikeTRAK,
  handleUpdateTRAKLIST,
} from '../../app';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';
import {useTRX} from '../../app/hooks/useTRX';

export const useTRAK = ({navigation, route, ...props}: any) => {
  const config: any = {
    clientID: '29dec26a7f304507b4a9d9bcf0ef210b',
    redirectURL: 'com.trxklist://oauthredirect/',
    tokenRefreshURL:
      'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/refresh',
    tokenSwapURL:
      'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/spotify/swap',
    scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
  };

  const {handleGetState} = useLITELISTState();
  const [userCategory, setUserCategory] = useState();

  const [pressedLike, setPressedLike] = useState(false);
  const [comment, setComment] = useState(null);
  const {useGET} = useAPI();

  const profile = handleGetState({index: 'profile'});
  const player = handleGetState({index: 'player'});
  const keys = handleGetState({index: 'keys'});

  const {handleLikeTRX} = useTRX({...navigation, ...route, ...props});

  const TRXProfile = profile.TRX;

  useEffect(() => {
    const userCategory = TRXProfile.userCategory;

    setUserCategory(userCategory);
  }, []);

  const handleNFTNavigation = (item: any) => {
    alert('Passive Crypto Earning Coming Soon..');
  };

  const handleTRAKInteraction = async ({type, trak, item}: any) => {
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 71 ~ handleTRAKInteraction ~ trak',
      trak,
    );
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 71 ~ handleTRAKInteraction ~ item',
      item,
    );

    const id = trak.genius.id;
    console.log('🚀 ~ file: useTRAK.ts:79 ~ handleTRAKInteraction ~ id:', id);

    switch (type) {
      case 'save':
        setPressedLike(true);
        handleLikeTRX({geniusId: id}).catch(() => {
          setPressedLike(false);
        });
        break;
      case 'share':
        const action = handleMediaPlayerAction({playbackState: 'share'});
        store.dispatch(action);
        break;
      case 'send':
        navigation.navigate('MMS');
        break;
      case 'fanclub':
        navigation.navigate('MODAL', {
          type: 'match-trak',
          exchange: {
            active: true,
            item: {
              title: trak.title,
              artist: trak.artist,
            },
          },
        });
        break;

      default:
        break;
    }
  };

  const handleYouTube = (event: string) => {
    switch (event) {
      case 'playing':
        setTimeout(() => {
          const action = handleMediaPlayerAction({
            playbackState: 'pause:force',
          });
          store.dispatch(action);
        }, 1000);
      default:
        const action1 = handleMediaPlayerAction({
          playbackState: 'pause:force:off',
        });
        store.dispatch(action1);
    }
    // event => alert(JSON.stringify(event))
  };

  const handleComment = (text: any) => {
    setComment(text);
  };

  const handleSubmitComment = (trak: any) => {
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 167 ~ handleSubmitComment ~ trak',
      trak,
    );

    const data = {
      // keep trak structure
      identifiers: {
        isrc: '', // ultimate key

        genius: '', // the prize

        spotify: '', // utility1
        apple_music: '', // utility2
      },
      serialized_trak: JSON.stringify(trak),
      comments: [
        ...trak.comments,
        {
          id: profile.TRX.trak_name,
          avatar: profile.TRX.avatarURL,
          text: comment,
          sentAt: new Date().toString(),
        },
      ],
    };
    // needs to decide whether its putting into traklist for first time or just updating the comments
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 173 ~ handleSubmitComment ~ data',
      data,
    );

    if (trak.isTRX) {
      // UPDATE COMMENT ONLY
    } else {
      // POST TRAK TO TRX
    }
  };

  const handleGenius = (item: any) => {
    console.log('🚀 ~ file: useTRAK.ts ~ line 206 ~ handleGenius ~ item', item);
    navigation.navigate('GENIUS', {
      url: item.meta.genius_url,
    });
  };

  const handleSpotify = async (trak: any) => {
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 304 ~ handleSpotify ~ trak',
      trak,
    );
    const action = handleMediaPlayerAction({playbackState: 'pause:force'});
    store.dispatch(action);

    try {
      if (await SpotifyRemote.isConnectedAsync()) {
        // await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        await SpotifyRemote.playUri(trak.spotify?.uri);
      } else {
        await SpotifyAuth.endSession();
        const session = await SpotifyAuth.authorize(config);
        console.log(
          '🚀 ~ file: useTRAK.ts ~ line 306 ~ handleSpotify ~ session',
          session,
        );

        await SpotifyRemote.connect(session.accessToken);
        await SpotifyRemote.playUri(trak.spotify?.uri);
      }
    } catch (err) {
      alert(err);

      console.error("Couldn't authorize with or connect to Spotify", err);
      const session = await SpotifyAuth.authorize(config);
      await SpotifyRemote.connect(session.accessToken);
      await SpotifyRemote.playUri(trak.spotify?.uri);
    }
  };

  return {
    // TRAK,
    // handleSeeMoreMeta,
    handleNFTNavigation,
    handleTRAKInteraction,
    userCategory,
    player,
    handleYouTube,
    handleComment,
    handleSubmitComment,
    handleGenius,
    TRXProfile,
    handleSpotify,
    pressedLike,
  };
};
