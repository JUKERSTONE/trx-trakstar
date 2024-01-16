import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import firestore from '@react-native-firebase/firestore';
import {useT4AState} from '../../useT4AState';

export const handleGetPortfolio = () => {
  const {handleGetState} = useT4AState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const trakName = TRXProfile.trak_name;
  console.log(
    '🚀 ~ file: getPortfolio.ts:19 ~ handleGetPortfolio ~ trakName:',
    trakName,
  );
  console.log(
    '🚀 ~ file: retrieveChat.ts ~ line 19 ~ handleRetrieveChat ~ userId',
    userId,
  );

  return firestore()
    .collection(`requests`)
    .where('artist', '==', trakName)
    .get()
    .then((data: any) => {
      let requests: any = [];
      data.forEach((doc: any) => {
        const request = doc.data();
        console.log(
          '🚀 ~ file: getPortfolio.ts:36 ~ data.forEach ~ request:',
          request,
        );
        requests.push(request);
      });

      return requests;
    })
    .then(async (requests: any) => {
      console.log(
        '🚀 ~ file: getPortfolio.ts:42 ~ .then ~ requests:',
        requests,
      );
      const originals = await firestore()
        .collection('originals')
        .where('artist', '==', trakName)
        .get()
        .then((data: any) => {
          let originals: any = [];
          data.forEach((doc: any) => {
            const original = doc.data();
            originals.push(original);
          });
          return originals;
        });

      return {
        requests,
        originals,
      };
    });

  // messaging where chatURI
  // reorder according to time
};
