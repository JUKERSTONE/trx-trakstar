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
import {useTRAKLISTState} from '../../useTRAKLISTState';

export const handleStoreValue = async ({value, tokency}: any) => {
  const {handleGetState} = useTRAKLISTState();

  const profile = handleGetState({index: 'profile'});
  const fundamentals = handleGetState({index: 'traklist_utility_coin'});
  const TRXProfile = profile.TRX;

  const userId = TRXProfile.id;

  const userDocument = firestore().doc(`users/${userId}`);

  userDocument.get().then((doc: any) => {
    const data = doc.data();

    const walletState = data.wallet;

    switch (tokency) {
      case 'tuc':
        return userDocument
          .update({
            'wallet.tuc': +walletState[tokency] + +value,
          })
          .then(() => {
            const TUCFundamentalsDocument = firestore().doc(
              'fundamentals/TRAKLIST_UTILITY_COIN',
            );

            const tucInGBP = value * fundamentals.price['µTUC'];

            const newMarketCap = +fundamentals.market_cap + +tucInGBP;
            const µTUC = 3333333 / newMarketCap;
            const TUC = µTUC * Math.pow(10, 6);
            const tukoshi = TUC * Math.pow(10, -2);

            TUCFundamentalsDocument.update({
              market_cap: newMarketCap,
              price: {
                TUC,
                µTUC,
                tukoshi,
              },
            });
          });
      case 'stx':
        return userDocument.update({
          'wallet.stx': value,
        });
      case 'nft':
        return userDocument.update({
          'wallet.nft': value,
        });
      case 'trak':
        return userDocument.update({
          'wallet.trak': value,
        });
      default:
        alert('e');
    }
  });
};
