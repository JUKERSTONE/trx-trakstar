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
import axios from 'axios';

export const handleGetGenreCollections = async () => {
  const {useGET} = useAPI();
  const route = api.bernie({
    method: 'genre-collections',
  });
  console.log(
    '🚀 ~ file: getGenreCollections.ts:24 ~ handleGetGenreCollections ~ route:',
    route,
  );

  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.trx.accessToken;
  console.log(
    '🚀 ~ file: getGenreCollections.ts:33 ~ handleGetGenreCollections ~ accessToken:',
    accessToken,
  );

  const trak = await useGET({route, token: accessToken});

  console.log(
    '🚀 ~ file: getGenreCollections.ts:26 ~ handleGetGenreCollections ~ isrc:',
    trak,
  );
  return trak.data.genreCollections;
};
