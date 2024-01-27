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

export const handleGetHomeStructure = async () => {
  return firestore()
    .collection('traklist-collections')
    .get()
    .then((data: any) => {
      const collections: any = [];

      data.forEach((doc: any) => {
        collections.push(doc.data());
      });

      const orderedTrak = collections.sort((a, b) => {
        return a.rank - b.rank;
      });
      console.log(
        '🚀 ~ file: getHomeStructure.ts:28 ~ orderedTrak ~ orderedTrak:',
        orderedTrak,
      );
      return orderedTrak;
    });
};
