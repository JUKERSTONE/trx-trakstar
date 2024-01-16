import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useTRAKLISTState} from '../../useTRAKLISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export const handleBuildProfile = async ({spotify, appleMusic}: any) => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useTRAKLISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const recommendation = appleMusic?.recommendations;

  const topTracks = spotify?.top_tracks;
  const topArtists = spotify?.top_artists;
  const spotifyPlaylists = spotify?.playlists;
  const appleMusicPlaylists = appleMusic?.playlists;
  const heavyRotation = appleMusic?.heavyRotation;
  console.log(
    '🚀 ~ file: useProfile.ts ~ line 63 ~ handleStreaming ~ heavyRotation',
    heavyRotation,
  );
  const user = spotify?.user;

  const profileType =
    recommendation != null && topTracks.length != 0
      ? 'primary'
      : recommendation != null && topTracks.length == 0
      ? 'apple_music'
      : topTracks.length != 0 && recommendation == null
      ? 'spotify'
      : 'offline';

  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 44 ~ handleRecommendations ~ profiefeeeleType',
    profileType,
  );

  switch (profileType) {
    case 'primary':
      const topTracksArrayPrimary = topTracks.map((track: any) => {
        return {
          info: 'topTracks',
          ...track,
        };
      });
      const topArtistsArrayPrimary = topArtists.map((track: any) => {
        return {
          info: 'topArtists',
          ...track,
        };
      });
      const heavyRotationPrimary = heavyRotation.map((track: any) => {
        console.log(
          '🚀 ~ file: useProfile.ts ~ line 98 ~ heavyRotationPrimary ~ track',
          track,
        );

        const art = track.attributes.artwork.url;

        const split = art.split('{')[0];

        const artwork = `${split}200x200bb.jpg`;

        // url
        return {
          info: 'heavyRotation',
          artwork,
          ...track,
        };
      });
      const spotifyPlaylistsArrayPrimary = spotifyPlaylists.map(
        (track: any) => {
          return {
            info: 'playlists:spotify',
            ...track,
          };
        },
      );
      const appleMusicPlaylistsArrayPrimary = appleMusicPlaylists.map(
        (track: any) => {
          return {
            info: 'playlists:apple_music',
            ...track,
          };
        },
      );

      const favourites = [
        ...topTracksArrayPrimary,
        ...topArtistsArrayPrimary,
        ...heavyRotationPrimary,
      ];

      const playlists = [
        ...spotifyPlaylistsArrayPrimary,
        ...appleMusicPlaylistsArrayPrimary,
      ];

      firestore().doc(`users/${userId}`).update({favourites, playlists});
      break;
    case 'spotify':
      const topTracksArray = topTracks.map((track: any) => {
        return {
          info: 'topTracks',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 123 ~ topTracksArray ~ topTracksArray',
        topTracksArray,
      );
      const topArtistsArray = topArtists.map((track: any) => {
        return {
          info: 'topArtists',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 133 ~ topArtistsArray ~ topArtistsArray',
        topArtistsArray,
      );
      const playlistsArray = spotifyPlaylists.map((track: any) => {
        return {
          info: 'playlists:spotify',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 140 ~ playlistsArray ~ playlistsArray',
        playlistsArray,
      );

      const favouritesSpotify = [...topTracksArray, ...topArtistsArray];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 141 ~ heavyRotationPrimary ~ favouritesSpotify',
        favouritesSpotify,
      );

      const playlistsSpotify = [...playlistsArray];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 155 ~ heavyRotationPrimary ~ playlistsSpotify',
        playlistsSpotify,
      );

      firestore()
        .doc(`users/${userId}`)
        .update({
          favorites: JSON.stringify(favouritesSpotify),
          playlists: JSON.stringify(playlistsSpotify),
        });

      break;
  }
};
