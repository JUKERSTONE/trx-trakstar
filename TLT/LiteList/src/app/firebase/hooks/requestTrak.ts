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
import Toast from 'react-native-toast-message';

export const handleRequestTrak = async (trak: any) => {
  const {handleGet, handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const wallet = TRXProfile.wallet;

  // does exist code

  const collectionRef = firestore()
    .collection(`fundamentals`)
    .doc('BERNIE')
    .collection('requests');

  // const duplicates = collectionRef
  //   .where('artist', '==', trak.artist)
  //   .where('title', '==', trak.title)
  //   .get()
  //   .then((data: any) => {
  //     let duplicates: any = [];
  //     data.forEach((doc: any) => {
  //       duplicates.push(doc.data());
  //     });

  //     if (duplicates === undefined || duplicates.length == 0) {
  //       return {hasDuplicates: false};
  //     }

  //     return {hasDuplicates: true, duplicates};
  //   });

  // if ((await duplicates).hasDuplicates) {
  //   alert('Duplicate', 'This trak has already been requested.');
  //   return;
  // }

  collectionRef.add({requestedAt: new Date(), ...trak}).then(() => {
    Toast.show({
      type: 'info',
      text1: "You've caught us!. Check back later.",
      text2: `You're early to this page!! Request for Trak has been sent.`,
    });
  });
};
