import auth from '@react-native-firebase/auth';
import {
  store,
  setTRAKLANDProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
  setSpotifyOOS,
} from '../../../../stores';
import {api, useAPI} from '../../../../api';
import firestore from '@react-native-firebase/firestore';
import {spotifyRefresh, spotifyProfileRefresh} from '../../../hooks';
import Toast from 'react-native-toast-message';
import {useSpotify} from '../../../../authentication/spotify';

export const handleSpotifyService = async ({user}: any) => {
  console.log(
    '🚀 ~ file: services.ts ~ line 14 ~ handleSpotifyService ~ user',
    user,
  );

  const id = user._user.uid;
  console.log(
    '🚀 ~ file: services.ts ~ line 15 ~ handleSpotifyService ~ id',
    id,
  );
  return await firestore()
    .doc(`users/${id}/services/spotify`)
    .get()
    .then(async (doc: any) => {
      const spotify = doc.data();
      console.log('🚀 ~ file: spotify.ts ~ line 29 ~ .then ~ spotify', spotify);

      const spotifyRefreshToken = spotify.refresh_token;

      const {
        success,
        data: {accessToken, refreshToken, message},
      }: any = await spotifyRefresh(spotifyRefreshToken);

      if (success) {
        await firestore()
          .doc(`users/${id}/services/spotify`)
          .update({refresh_token: refreshToken});

        const spotifyProfile: any = await spotifyProfileRefresh(accessToken);

        const traklandProfile = {
          refresh_token: refreshToken,
          top_tracks: spotifyProfile.topTracks,
          playlists: spotifyProfile.playlists,
          top_artists: spotifyProfile.topArtists,
          user: spotifyProfile.user,
        };
        return {
          success: true,
          data: traklandProfile as any,
        };
      } else {
        // if not for removing token then trigger new auth

        console.log(
          '🚀 ~ file: spotify.ts ~ line 60 ~ .then ~ message',
          message,
        );
        if (message === 'Failed to remove token') {
          // return {
          //   success: false,
          //   data: message as any,
          // };
        } else if (message === 'spotify_refresh') {
          // alert(1)
          // const action = setSpotifyOOS(true);
          // store.dispatch(action);
          // // const {authorizeSpotify} = useSpotify();
          // // const {refreshToken, accessToken} = await authorizeSpotify();

          return {
            success: false,
            data: 'Spotify Refresh Token Invalid' as any,
          };
        } else
          Toast.show({
            type: 'info',
            text1: 'All good? Keep reloading',
            text2: "Please contact info@tsb.media if you can't access the app",
          });
      }
    })
    .catch(error => {
      console.log(
        '🚀 ~ file: spotify.ts ~ line 56 ~ handleSpotifyService ~ error',
        error,
      );
      return {
        success: false,
        data: 'No Spotify Subcription Found' as any,
      };
    });
};
