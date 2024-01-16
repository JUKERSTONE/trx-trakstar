import auth from '@react-native-firebase/auth';
import {
  store,
  setTUC,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useTRAKLISTState} from '../../useTRAKLISTState';

export const handleListenTUC = async () => {
  const {handleGetState} = useTRAKLISTState();
  const profile = handleGetState({index: 'profile'});
  const TRX = profile.TRX;
  const userId = TRX.id;

  const TUCFundamentalsDocument = firestore().doc(
    'fundamentals/TRAKLIST_UTILITY_COIN',
  );

  const TRAKLIST_UTILITY_COIN = await TUCFundamentalsDocument.get().then(
    doc => {
      return doc.data();
    },
  );

  const action = setTUC(TRAKLIST_UTILITY_COIN);
  store.dispatch(action);
};
