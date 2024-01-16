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

// const {handleGetState} = useTRAKLISTState();

// const keys = handleGetState({index: 'keys'});
// const accessToken = keys.trx.accessToken;

export const handleStreakRewards = async (user: any, token: any) => {
  const {useGET} = useAPI();

  const userId = user._user.uid;
  console.log('🚀 ~ file: streak.ts ~ line 20 ~ handleStreak ~ userId', userId);

  return await firestore()
    .doc(`users/${userId}`)
    .get()
    .then(async doc => {
      doc.ref.update({last_logged_in: new Date().toString()});

      const profile: any = doc.data();

      const last_logged_in = profile.last_logged_in;
      const streak = profile.streak;
      const subscription = profile.subscription;
      console.log(
        '🚀 ~ file: streak.ts ~ line 36 ~ handleStreak ~ subscription',
        subscription,
      );

      const hasLoggedInToday = moment(last_logged_in).isSame(
        new Date().toString(),
        'd',
      );

      if (hasLoggedInToday) {
        return null;
      } else {
        doc.ref.update({streak: streak + 1});

        const route = api.bernie({
          method: 'raffle',
          payload: {subscription},
        });

        const raffleResponse = await useGET({
          route,
          token,
        });

        const newTRAK = raffleResponse.data;

        return newTRAK;
      }
    });
};
