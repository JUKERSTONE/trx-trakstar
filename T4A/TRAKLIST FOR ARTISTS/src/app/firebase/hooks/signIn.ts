import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';

export const handleSignIn = ({email, password}: any) => {
  const {handleStore} = useAsyncStorage();
  const {useGET} = useAPI();
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then((data: any) => {
      const idToken = data.user.getIdTokenResult();
      console.log('🚀 ~ file: signIn.ts ~ line 19 ~ .then ~ idToken', idToken);
      return idToken;
    })
    .then((idToken: any) => {
      firestore()
        .collection('users')
        .where('email_address', '==', email)
        .get()
        .then((data: any) => {
          let user: any[] = [];
          data.forEach((doc: any) => {
            user.push(doc.data());
          });
          return user[0];
        })

        .then(profile => {
          const payload = profile;

          const action = setTRXProfile(payload);
          store.dispatch(action);
          const action_2 = storeKeysTRX(idToken.token);
          store.dispatch(action_2);
          // const key = asyncStorageIndex.profile;
          // handleStore({key, value: payload});
        });
    })
    .catch(err => {
      // @ts-ignore
      alert('error');
      console.error(err.code);
    });
};
