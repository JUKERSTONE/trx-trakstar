import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
  setPlayers,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {handleNowPlaying, handleNowPlayingApple} from '../../hooks';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const handleBuildProfile = async ({
  trakland: {spotify, apple_music},
  userCategory,
}: any) => {
  console.log(
    '🚀 ~ file: buildProfile.ts ~ line 26 ~ apple_music',
    apple_music,
  );
  console.log(
    '🚀 ~ file: buildProfile.ts ~ line 22 ~ userCategory',
    userCategory,
  );
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const recommendation = apple_music?.recommendations;
  const appleRecents = apple_music?.recents;
  const topTracks = spotify?.top_tracks;
  const topArtists = spotify?.top_artists;
  const spotifyPlaylists = spotify?.playlists;
  const appleMusicPlaylists = apple_music?.playlists;
  console.log(
    '🚀 ~ file: buildProfile.ts ~ line 38 ~ appleMusicPlaylists',
    appleMusicPlaylists,
  );
  const heavyRotation = apple_music?.heavyRotation;
  console.log(
    '🚀 ~ file: useProfile.ts ~ line 63 ~ handleStreaming ~ heavyRotation',
    heavyRotation,
  );
  const user = spotify?.user;

  switch (userCategory) {
    case 'primary':
      const nowPlaying = await handleNowPlaying();
      const nowPlayingApple = handleNowPlayingApple(appleRecents);
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 66 ~ appleRecents',
        appleRecents,
      );

      const action = setPlayers({
        spotify: nowPlaying,
        apple_music: nowPlayingApple,
      });
      store.dispatch(action);

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

      firestore()
        .doc(`users/${userId}`)
        .update({
          favorites: JSON.stringify(favourites),
          playlists: JSON.stringify(playlists),
          userCategory,
        });
      break;
    case 'spotify':
      const nowPlaying1 = await handleNowPlaying();
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 129 ~ heavyRotationPrimary ~ nowPlaying1',
        nowPlaying1,
      );

      const action1 = setPlayers({spotify: nowPlaying1, apple_music: null});
      store.dispatch(action1);

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
          userCategory,
        });
      break;
    case 'apple_music':
      const recents = await AppleMusic.recentPlayed().catch(() => []);
      const latestPlayer = {
        id: recents[0].id,
        title: recents[0].attributes.name,
        artistName: recents[0].attributes.artistName,
        cover_art: recents[0].attributes.artwork.url,
      };
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 193 ~ heavyRotationPrimary ~ recents',
        recents,
      );

      const action4 = setPlayers({apple_music: latestPlayer});
      store.dispatch(action4);

      const heavyRotationAppleMusic = heavyRotation.map((track: any) => {
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
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 165 ~ heavyRotationAppleMusic ~ heavyRotationAppleMusic',
        heavyRotationAppleMusic,
      );
      // no artists - apple music (build please)

      const playlistsArrayAppleMusic = appleMusicPlaylists.map((track: any) => {
        return {
          info: 'playlists:apple_music',
          ...track,
        };
      });
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 140 ~ playlistsArray ~ playlistsArray',
        playlistsArray,
      );

      const favouritesAppleMusic = [...heavyRotationAppleMusic];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 141 ~ heavyRotationPrimary ~ favouritesAppleMusic',
        favouritesAppleMusic,
      );

      const playlistsAppleMusic = [...playlistsArrayAppleMusic];
      console.log(
        '🚀 ~ file: buildProfile.ts ~ line 155 ~ heavyRotationPrimary ~ playlistsAppleMusic',
        playlistsAppleMusic,
      );

      firestore()
        .doc(`users/${userId}`)
        .update({
          favorites: JSON.stringify(favouritesAppleMusic),
          playlists: JSON.stringify(playlistsAppleMusic),
          userCategory,
        });

      break;
    case 'offline':
      // const action4 = setPlayers({apple_music: latestPlayer});
      // store.dispatch(action4);
      return firestore()
        .doc(`users/${userId}`)
        .update({
          userPreferences: JSON.stringify(profile.trakland.trx),
          userCategory,
        });

    default:
      break;
  }
};
