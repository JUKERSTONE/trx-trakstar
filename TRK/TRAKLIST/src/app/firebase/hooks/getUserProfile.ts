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

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const handleGetUserProfile = async (user: any) => {
  const {useGET} = useAPI();
  const idToken = await auth()
    .currentUser?.getIdToken(true)
    .then((token: any) => token);
  const email = user._user.email;
  let profile = await firestore()
    .collection('users')
    .where('email_address', '==', email)
    .get()
    .then((data: any) => {
      let user: any[] = [];
      data.forEach((doc: any) => {
        user.push(doc.data());
      });
      return user[0];
    });

  const route = api.bernie({
    method: 'get_user_wallet',
  });
  const userWalletResponse = await useGET({
    route,
    token: idToken,
  });
  const userWallet = userWalletResponse.data;

  profile.wallet = userWallet;

  const action_3 = setTRXProfile(profile);
  store.dispatch(action_3);

  const payload = user._user;
  const FBaction = setFirebaseProfile(payload);
  store.dispatch(FBaction);

  const action = storeKeysTRX(idToken);
  store.dispatch(action);
};
