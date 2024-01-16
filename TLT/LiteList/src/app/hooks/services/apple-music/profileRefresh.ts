import axios from 'axios';
import {useAsyncStorage, asyncStorageIndex} from '../../../../stores';
import {useLITELISTState} from '../../../useLITELISTState';
import {
  SPOTIFY_CURRENT_USER,
  SPOTIFY_GET_PLAYLISTS,
  SPOTIFY_GET_TOP_TRACKS,
  SPOTIFY_GET_TOP_ARTISTS,
  SPOTIFY_GET_RECENTLY_PLAYED,
} from '../../../../api';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const appleMusicProfileRefresh = async () => {
  const playlists = await AppleMusic.getUserPlaylists().catch(() => []);
  const recents = await AppleMusic.recentPlayed().catch(() => []);
  const heavyRotation = await AppleMusic.getHeavyRotation().catch(() => []);
  const recommendations = await AppleMusic.getRecommendations().catch(() => []);

  if (recommendations.length == 0) {
    return {
      data: 'Cannot retrieve recommendations.',
      success: false,
    };
  }

  return {
    data: {
      playlists,
      recents,
      heavyRotation,
      recommendations,
    },
    success: true,
  };
};
