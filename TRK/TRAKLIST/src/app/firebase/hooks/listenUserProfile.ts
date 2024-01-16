import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
  asyncStorageIndex,
  setAuthentication,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useTRAKLISTState} from '../../useTRAKLISTState';
import axios from 'axios';
import {Base64} from '../../../core';
import {spotifyRefresh} from '../../hooks';

export const handleListenUserProfile = async (user: any, idToken: string) => {
  const {useGET, usePOST} = useAPI();
  const {handleGet} = useAsyncStorage();
  const email = user._user.email;
  const id = user._user.uid;

  // const serialized_stacks_keys: any = await handleGet({
  //   key: asyncStorageIndex.stacks_keys,
  // });
  // const stacks_keys = JSON.parse(serialized_stacks_keys);

  firestore()
    .doc(`users/${id}`)
    .onSnapshot(async (snap: any) => {
      const profile = snap.data();
      console.log(
        '🚀 ~ file: getUserProfile.ts ~ line 39 ~ .onSnapshot ~ profile',
        profile,
      );

      const spotifyRefreshToken = profile.spotifyRefreshToken;
      console.log(
        '🚀 ~ file: listenUserProfile.ts ~ line 39 ~ .onSnapshot ~ spotifyRefreshToken',
        spotifyRefreshToken,
      );
      spotifyRefresh(spotifyRefreshToken);

      const action_3 = setTRXProfile({...profile});
      store.dispatch(action_3);

      const payload = user._user;
      const FBaction = setFirebaseProfile(payload);
      store.dispatch(FBaction);

      const action = storeKeysTRX(idToken);
      store.dispatch(action);
    });
  return idToken;
};
