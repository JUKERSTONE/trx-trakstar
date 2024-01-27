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
import {useLITELISTState} from '../../useLITELISTState';
import {useFirebase} from '../useFirebase';

const {useGET} = useAPI();
const {handleStore} = useAsyncStorage();

export const handleSearchUsers = async (query: string) => {
  const {handleGetState} = useLITELISTState();
  return firestore()
    .collection('users')
    .get()
    .then(data => {
      let users: any = [];
      data.forEach((doc: any) => {
        users.push(doc.data());
      });
      console.log('🚀 ~ file: searchUsers.ts ~ line 23 ~ .then ~ users', users);

      const profile = handleGetState({index: 'profile'});
      const TRXProfile = profile.TRX;

      const filteredUsers = users.filter(
        (user: any) => user.id !== TRXProfile.id,
      );

      return filteredUsers;
    });
};
