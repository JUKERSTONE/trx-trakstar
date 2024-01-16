import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../useLITELISTState';

export const handleTrakStarListenAgain = () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  console.log(
    '🚀 ~ file: retrieveChat.ts ~ line 19 ~ handleRetrieveChat ~ userId',
    userId,
  );

  return (
    firestore()
      .collection(`users/${userId}/playback`)
      // sorted by listedned aat
      .limit(20)
      .get()
      .then((data: any) => {
        let collection: any = [];

        data.forEach((doc: any) => {
          console.log(
            '🚀 ~ file: getTrakstarListenAgain.ts:27 ~ data.forEach ~ doc.data():',
            doc.data(),
          );
          // get trak
          const trak = {
            cover_art: doc.data().cover_art,
            title: doc.data().title,
            artist: doc.data().artist,
            nav: doc.data().uri,
          };
          collection.push(trak);
        });

        console.log(
          '🚀 ~ file: getTrakstarListenAgain.ts:23 ~ .then ~ collection:',
          collection,
        );

        return collection;
      })
  );
};
