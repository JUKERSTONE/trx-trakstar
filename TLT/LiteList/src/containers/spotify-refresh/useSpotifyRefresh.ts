import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  storeKeysSpotify,
  setTRAKLANDProfile,
  setSpotifyOOS,
} from '../../stores';
import {
  useGenerate,
  handleGetColor,
  useEffectAsync,
  spotifyProfileRefresh,
  handleBuildProfile,
} from '../../app';
import axios from 'axios';
import {useLITELISTState} from '../../app';
import {Alert} from 'react-native';
import {useSpotify} from '../../authentication/spotify';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

export const useSpotifyRefresh = ({artistData, navigation}: any) => {
  const {authorizeSpotify} = useSpotify();

  const userId = useSelector((state: any) => state.profile.TRX.id);

  useEffectAsync(async () => {
    const {refreshToken, accessToken} = await authorizeSpotify();

    const spotifyProfile: any = await spotifyProfileRefresh(accessToken).then(
      async (res: any) => {
        await firestore()
          .doc(`users/${userId}/services/spotify`)
          .update({refresh_token: refreshToken})
          .then(() => {
            const action = storeKeysSpotify({accessToken, refreshToken});
            store.dispatch(action);
          });

        const spotify = {
          refresh_token: refreshToken,
          top_tracks: res.topTracks,
          playlists: res.playlists,
          top_artists: res.topArtists,
          user: res.user,
        };

        const trakland = {
          spotify,
          apple_music: null,
        };

        await handleBuildProfile({
          trakland: trakland,
          userCategory: 'spotify',
        });

        const action1 = setTRAKLANDProfile(trakland);
        store.dispatch(action1);

        const action2 = setSpotifyOOS(false);
        store.dispatch(action2);

        navigation.navigate('MAIN');
      },
    );
  }, []);

  return {};
};
