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

export const handleLikeExists = async ({trak}: any) => {
  console.log('🚀 ~ file: likeTRAK.ts:22 ~ handleLikeTRAK ~ trak:', trak);
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.spotify.accessToken;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  // check for duplicates
  // if yes, isPreview = false, trakURI = trx:00:isrc

  return await firestore()
    .collection('likes')
    .where('artist', '==', trak.artist)
    .where('title', '==', trak.title)
    .where('userId', '==', userId)
    .limit(1)
    .get()
    .then(data => {
      return !data.empty;
    });
};
