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
import uuid from 'react-native-uuid';

export const handleGenerateProduct = async () => {
  const products = await firestore()
    .collection('storefront-products')
    .get()
    .then((data: any) => {
      let products: any = [];

      data.forEach((doc: any) => {
        products.push(doc.data());
      });

      return products;
    });

  const activityId = uuid.v4();

  const randomIndex = Math.floor(Math.random() * products.length);

  const unit = products[randomIndex];

  const content = {
    activityId,
    merchandiseId: unit.id,
    type: 'sale',
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
  };

  await firestore()
    .doc('ios-live-activities/' + activityId)
    .set(content);

  return {
    content,
  };
};
