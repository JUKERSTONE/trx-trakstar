import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';

export const handleTrakStarTrending = () => {
  return firestore()
    .collection('fundamentals/TRAKSTAR/streaming')
    .orderBy('count', 'desc')
    .limit(20)
    .get()
    .then((data: any) => {
      let collection: any = [];

      data.forEach((doc: any) => {
        console.log(
          '🚀 ~ file: getTrakstarTrending.ts:25 ~ data.forEach ~ oc.data():',
          doc.data(),
        );
        const trak = {
          cover_art: doc.data().cover_art,
          title: doc.data().title,
          artist: doc.data().artist,
          nav: doc.data().trakUri,
        };
        collection.push(trak);
      });

      console.log(
        '🚀 ~ file: getTrakstarTrending.ts:26 ~ .then ~ collection:',
        collection,
      );
      return collection;
    });
};
