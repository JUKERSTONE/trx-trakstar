import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {handleLikeTRAK} from '.';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const handleValidateProfile = async (phoneNumber: string) => {
  const profileExists = await firestore()
    .collection('users')
    .where('phone_number', '==', phoneNumber.replace(/\s+/g, ''))
    .get()
    .then(doc => {
      return !doc.empty;
    });

  return profileExists;
};
