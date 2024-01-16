import auth from '@react-native-firebase/auth';

import {routes, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';

export const handleSignIn = ({email, password}: any) => {
  const {GET} = useAPI();
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
