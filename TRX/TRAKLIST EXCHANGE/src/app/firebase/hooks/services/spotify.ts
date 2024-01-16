import auth from '@react-native-firebase/auth';
import {
  store,
  setTRAKLANDProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../../stores';
import {api, useAPI} from '../../../../api';
import firestore from '@react-native-firebase/firestore';
import {spotifyRefresh, spotifyProfileRefresh} from '../../../hooks';

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

      const {accessToken, refreshToken}: any = await spotifyRefresh(
        spotifyRefreshToken,
      );

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

      return traklandProfile;
    });
};
