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
import {useLITELISTState} from '../../useLITELISTState';
import {handleCrypto} from '../../../app';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';

export const handleListenUserProfile = async (user: any, idToken: string) => {
  const {handleGetState} = useLITELISTState();
  console.log('ferfe');
  const keys = handleGetState({index: 'keys'});
  console.log(
    '🚀 ~ file: listenUserProfile.ts ~ line 20 ~ handleListenUserProfile ~ keys',
    keys,
  );

  const {useGET, usePOST} = useAPI();
  const {handleGet} = useAsyncStorage();
  const email = user._user.email;
  const id = user._user.uid;

  firestore()
    .doc(`users/${id}`)
    .onSnapshot(async (snap: any) => {
      const profile = snap.data();

      const action_3 = setTRXProfile({
        ...profile,
      });
      store.dispatch(action_3);

      const payload = user._user;
      const FBaction = setFirebaseProfile(payload);
      store.dispatch(FBaction);

      const action = storeKeysTRX(idToken);
      store.dispatch(action);
    });

  return {
    success: true,
  };
};
