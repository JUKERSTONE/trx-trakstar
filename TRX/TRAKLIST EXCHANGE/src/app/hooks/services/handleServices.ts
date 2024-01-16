import axios from 'axios';
import {
  store,
  setTRAKLANDProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
// @ts-ignore
import {useFirebase} from '../../firebase';
export const handleServices = async ({user}: any) => {
  const {handleSpotifyService, handleAppleMusicService, handleBuildProfile} =
    useFirebase();

  const spotify = await handleSpotifyService({user}); // on fail, redo with timeout 10 seconds until it gets it right

  const {success, data} = await handleAppleMusicService(); // on fail, redo with timeout 10 seconds until it gets it right

  switch (success) {
    case true:
      const trakland = {
        spotify,
        apple_music: data,
      };

      const action = setTRAKLANDProfile(trakland);
      store.dispatch(action);
      break;
    case false:
      const trakland1 = {
        spotify,
        apple_music: null,
      };
      // alert(data);
      const action1 = setTRAKLANDProfile(trakland1);
      store.dispatch(action1);
      break;
    default:
      break;
  }

  // build profile

  await handleBuildProfile({spotify, appleMusic: success.data});
};
