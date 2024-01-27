import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
  setLikes,
  handlePublicKeys,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const handleGetCategories = async () => {
  return await firestore()
    .collection(`storefront-categories`)
    .get()
    .then((data: any) => {
      let categories: any = [];

      data.forEach((doc: any) => {
        categories.push({category: doc.id, ...doc.data()});
      });

      return categories;
    });
};
