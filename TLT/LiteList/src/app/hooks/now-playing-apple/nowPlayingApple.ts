import {api, useAPI} from '../../../api';
import {useLITELISTState} from '../..';

export const handleNowPlayingApple = (appleRecents: any) => {
  console.log(
    '🚀 ~ file: nowPlayingApple.ts ~ line 5 ~ handleNowPlayingApple ~ appleRecents',
    appleRecents,
  );

  const lastPlayed = appleRecents[0];
  return {
    id: lastPlayed.id,
    artist: lastPlayed.attributes.artistName,
    title: lastPlayed.attributes.name,
    cover_art: lastPlayed.attributes.artwork.url,
  };
};
