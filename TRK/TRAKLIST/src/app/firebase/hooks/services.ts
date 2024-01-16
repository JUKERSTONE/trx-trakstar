import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {spotifyRefresh} from '../../hooks/';

export const handleSpotifyService = ({user}: any) => {
  const id = user._user.uid;
  firestore()
    .doc(`users/${id}/services/spotify`)
    .get()
    .then(async (doc: any) => {
      const spotify = doc.data();
      console.log(
        '🚀 ~ file: services.ts ~ line 19 ~ .onSnapshot ~ services',
        spotify,
      );
      const spotifyRefreshToken = spotify.refresh_token;
      console.log(
        '🚀 ~ file: listenUserProfile.ts ~ line 46 ~ .onSnapshot ~ spotifyRefreshToken',
        spotifyRefreshToken,
      );
      const refreshToken = await spotifyRefresh(spotifyRefreshToken);
      console.log(
        '🚀 ~ file: listenUserProfile.ts ~ line 51 ~ .onSnapshot ~ refreshToken',
        refreshToken,
      );

      firestore()
        .doc(`users/${id}/services/spotify`)
        .update({refresh_token: refreshToken});
    });
};
