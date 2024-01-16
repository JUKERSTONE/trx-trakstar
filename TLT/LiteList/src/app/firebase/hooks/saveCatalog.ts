import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
  asyncStorageIndex,
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

export const handleSaveTRX = async ({type, value}: any) => {
  const {handleStore} = useAsyncStorage();
  switch (type) {
    case 'save-playlist':
      await handleStore({key: asyncStorageIndex.catalogPlaylist, value});
      break;
    case 'save-album':
      await handleStore({key: asyncStorageIndex.catalogAlbum, value});
      break;
    default:
      break;
  }
};
