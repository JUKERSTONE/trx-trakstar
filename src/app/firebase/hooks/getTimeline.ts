import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';

export const handleGetTimeline = async () => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: getTransactions.ts ~ line 24 ~ handleGetTransactions ~ TRXProfile',
    TRXProfile,
  );

  return firestore()
    .collection('posts')
    .get()
    .then((data: any) => {
      let posts: any[] = [];
      data.forEach((doc: any) => {
        console.log(
          '🚀 ~ file: getposts.ts ~ line 43 ~ data.forEach ~ doc.data()',
          doc.data(),
        );
        posts.push(doc.data());
      });
      return posts;
    });
};
