import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
  setLikes,
  setTraklist,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {useTRX} from '../../hooks/useTRX';
import {handleRequestTrak} from './requestTrak';
import {handleLikeTRAK} from '..';

export const handleTRAKLIST = async () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  console.log('🚀 cfile:', profile);
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log('🚀 ~ file: likes.ts:31 ~ handleTRAKLIST ~ userId:', userId);

  if (profile.trakland.trx?.length) {
    await profile.trakland.trx.map(async (like: any) => {
      console.log(
        '🚀 ~ file: likes.ts:32 ~ awaitprofile.trakland.trx.map ~ like:',
        like,
      );
      await handleRequestTRX({
        trak: like.trak,
        request: like.request,
      });
    });
  }

  const traklist = await firestore()
    .collection('likes')
    .where('userId', '==', userId)
    .get()
    .then((data: any) => {
      console.log('🚀 ~ file: likes.ts ~ line 31 ~ .then ~ data', data);
      let traklist: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        traklist.push(data);
      });

      return traklist;
    });
  console.log('🚀 ~ file: likes.ts:30 ~ handleTRAKLIST ~ traklist:', traklist);

  console.log(
    '🚀 ~ file: likes.ts ~ line 31 ~ handleTRAKLIST ~ traklist',
    traklist.length,
  );

  if (!traklist.length) {
    const action = setLikes({likes: []});
    store.dispatch(action);
    return;
  }

  const shuffledLikes = shuffle(traklist);
  console.log(
    '🚀 ~ file: likes.ts:49 ~ handleTRAKLIST ~ shuffledLikes:',
    shuffledLikes,
  );

  const traklistInput = shuffledLikes.map((trak: any) => {
    if (trak.isPreview) return;
    console.log('🚀 ~ file: likes.ts:56 ~ shuffledLikes.map ~ trak:', trak);
    return {
      player: {
        title: trak.title,
        artist: trak.artist,
        cover_art: trak.thumbnail ?? trak.cover_art,
        geniusId: trak.genius.id ?? null,
      },
      service: {
        provider: 'youtube',
        url: `http://www.youtube.com/watch?v=${trak.youtube.url.split('=')[1]}`,
      },
      id: trak.genius.id,
    };
  });
  console.log(
    '🚀 ~ file: likes.ts:76 ~ traklistInput ~ traklistInput:',
    traklistInput,
  );

  const filteredTraklistInput = traklistInput.filter((item: any) => item);
  console.log(
    '🚀 ~ file: likes.ts:85 ~ handleTRAKLIST ~ filteredTraklistInput:',
    filteredTraklistInput,
  );
  const filteredTraklist = traklist.filter((item: any) => !item.migratedAt);
  console.log(
    '🚀 ~ file: likes.ts:88 ~ handleTRAKLIST ~ filteredTraklist:',
    filteredTraklist,
  );
  console.log(
    '🚀 ~ file: likes.ts:83 ~ handleTRAKLIST ~ filteredTraklistInput:',
    filteredTraklistInput,
  );

  // const action1 = setTraklist({traklist: filteredTraklistInput});
  // store.dispatch(action1);

  const action = setLikes({likes: filteredTraklist});
  store.dispatch(action);
};

function shuffle(a: any) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const handleRequestTRX = async ({
  trak,
  request,
}: {
  trak: any;
  request: 'unavailable' | 'preview';
}) => {
  console.log('🚀 ~ file: useTRX.ts:349 ~ useTRX ~ trak:', trak);
  switch (request) {
    case 'unavailable':
      await handleRequestTrak(trak);
      break;
    case 'preview':
      await handleLikeTRAK({trak, protocol: 'trx:isrc'});
      break;
    default:
      break;
  }
};
