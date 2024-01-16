import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';

export const handleSignIn = ({email, password}: any) => {
  const {handleStore} = useAsyncStorage();
  const {useGET} = useAPI();

  return auth()
    .signInWithEmailAndPassword(email, password)
    .then((data: any) => {
      const idToken = data.user.getIdTokenResult();
      return idToken;
    })
    .catch(err => {
      // @ts-ignore
      alert('error');
      console.error(err.code);
    });
};
