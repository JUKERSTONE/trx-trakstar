import axios from 'axios';
import {
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysSpotify,
  store,
} from '../../../../stores';

const queryString = require('query-string');

export const spotifyRefresh = async (refresh_token: any) => {
  console.log(
    '🚀 ~ file: refreshToken.ts ~ line 5 ~ spotifyRefreshToken ~ refresh_token',
    refresh_token,
  );
  const route = 'https://accounts.spotify.com/api/token';
  const {handleStore} = useAsyncStorage();
  return await axios
    .post(
      route,
      queryString.stringify({
        grant_type: 'refresh_token',
        refresh_token,
        client_id: '29dec26a7f304507b4a9d9bcf0ef210b',
        client_secret: '1d27af3b5c4946c1a411657ca50490d0',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(response => {
      console.log(
        '🚀 ~ file: listenUserProfile.ts ~ line 66 ~ .onSnapshot ~ response',
        response,
      );

      const accessToken = response.data.access_token;
      console.log(
        '🚀 ~ file: refreshToken.ts ~ line 40 ~ spotifyRefresh ~ accessToken',
        accessToken,
      );
      // handleStore({
      //   key: asyncStorageIndex.refreshTokenSpotify,
      //   value: response.data.refresh_token,
      // });

      const tokens = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      };
      console.log(
        '🚀 ~ file: refreshToken.ts ~ line 47 ~ spotifyRefresh ~ tokens',
        tokens,
      );

      const action = storeKeysSpotify(tokens);
      store.dispatch(action);

      // send access token to local state
      // alert('success');
      return {success: true, data: tokens};
    })
    .catch(error => {
      console.log(
        '🚀 ~ file: listenUserProfile.ts ~ line 73 ~ .onSnapshot ~ error',
        {1: error, 2: error.message, 3: error.response.data.error_description},
        // alert(1),
      );
      if (error.response.data.error_description === 'Failed to remove token') {
        return {success: false, data: {message: 'Failed to remove token'}};
      } else if (
        error.response.data.error_description === 'Invalid refresh token'
      ) {
        return {success: false, data: {message: 'spotify_refresh'}};
      } else return {success: false, data: {message: 'error'}};
    });
};
