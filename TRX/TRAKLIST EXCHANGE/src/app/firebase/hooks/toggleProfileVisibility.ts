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
import {useTRAKLISTState} from '../../useTRAKLISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export const handleToggleProfileVisibility = async () => {
  const {handleGetState} = useTRAKLISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const isPrivate = TRXProfile.isPrivate;
  const userId = TRXProfile.id;
  return firestore().doc(`users/${userId}`).update({isPrivate: !isPrivate});
};
