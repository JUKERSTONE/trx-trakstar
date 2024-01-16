import {api, useAPI} from '../../../api';
import {useLITELISTState} from '../../../app';

export const handleNowPlaying = async () => {
  const {usePOST, useGET} = useAPI();
  const {handleGetState} = useLITELISTState();
  const route = api.spotify({method: 'get-playback'});
  const keys = handleGetState({index: 'keys'});
  const spotifyKey = keys.spotify.accessToken;
  console.log(
    '🚀 ~ file: nowPlaying.ts ~ line 10 ~ handleNowPlaying ~ spotifyKey',
    spotifyKey,
  );

  const response = await useGET({route, token: keys.spotify.accessToken});
  console.log(
    '🚀 ~ file: TRXPlayer.tsx ~ line 92 ~ handleGetSpotifyPlayer ~ response',
    response,
  );

  return response.data;
};
