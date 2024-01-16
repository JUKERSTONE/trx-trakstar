import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useTRAKLISTState} from '../../useTRAKLISTState';

const {useGET} = useAPI();
const {handleStore} = useAsyncStorage();
const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const handleRegister = async ({TRXProfile}: any) => {
  const {
    email_address,
    isAuthenticatedSpotify,
    location,
    password,
    phone_number,
    quotable,
    subscription,
    trak_name,
    trak_symbol,
    user_name,
  } = TRXProfile;

  auth()
    .createUserWithEmailAndPassword(email_address, password)
    .then(async data => {
      const id = data.user.uid;

      firestore()
        .collection('users')
        .add({
          id,
          email_address,
          isAuthenticatedSpotify,
          location,
          password,
          phone_number,
          quotable,
          subscription,
          trak_name,
          trak_symbol,
          user_name,
        })
        .then(() => {
          const route = api.bernie({
            method: 'raffle',
            payload: {
              subscription,
            },
          });
          const response: any = useGET({route, token: accessToken});

          const trak = response;

          return trak;
        })
        .then(userTRAK => {
          const trak = userTRAK.data;
          TRXProfile.wallet = trak;
          const payload = TRXProfile;
          const action = setTRXProfile(payload);
          store.dispatch(action);
          const key = asyncStorageIndex.profile;
          handleStore({key, value: payload});
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        return 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        return 'That email address is invalid!';
      }

      console.error(error);
    });
};
