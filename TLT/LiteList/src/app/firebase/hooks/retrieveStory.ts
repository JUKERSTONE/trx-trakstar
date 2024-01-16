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

export const handleRetrieveStory = () => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveStory.ts ~ line 18 ~ handleRetrieveStory ~ userId',
    userId,
  );

  return firestore()
    .collection('users/' + userId + '/stories')
    .get()
    .then((data: any) => {
      let stories: any = [];

      data.forEach((doc: any) => {
        stories.push(doc.data());
      });

      return stories;
    });
};
