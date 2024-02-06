import {
  asyncStorageIndex,
  setTRXProfile,
  store,
  useAsyncStorage,
  claimProfile,
} from '../../../stores';
import {handleAppendSubscription} from '../../firebase';
import {useLITELISTState} from '../../useLITELISTState';
import firestore from '@react-native-firebase/firestore';

export const handleRedeemNewProfile = async (user: any) => {
  const {handleGetState} = useLITELISTState();
  const {handleClear, handleStore} = useAsyncStorage();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.unclaimed?.profile;
  const purchase = profile.unclaimed?.purchase;
  const userPackage = profile.unclaimed?.userPackage;
  console.log('🚀 ~ handleRedeemNewProfile ~ purchase:', purchase);

  if (!TRXProfile || !profile.unclaimed) return;

  const id = user._user.uid;
  console.log('🚀 ~ handleRedeemNewProfile ~ id:', id);

  if (purchase) await handleAppendSubscription({purchase, userId: id}); // s4l

  console.log('🚀 ~ handleRedeemNewProfile ~ TRXProfile:', TRXProfile);

  const userDocument = firestore().doc(`users/${id}`);

  if (TRXProfile.spotifyRefreshToken) {
    const spotifyServicesDocument = firestore().doc(
      `users/${id}/services/spotify`,
    );

    spotifyServicesDocument.set({
      refresh_token: TRXProfile.spotifyRefreshToken,
    });
  }

  // alert(3);

  await userDocument
    .set({
      id,
      userCategory: TRXProfile.userCategory,
      fcm_token: TRXProfile.fcm_token,
      // email_address,
      isAuthenticatedSpotify: TRXProfile.isAuthenticatedSpotify,
      spotifyRefreshToken: TRXProfile.spotifyRefreshToken,
      spotifyAccessToken: TRXProfile.spotifyAccessToken,
      // location,
      //   password,
      phone_number: TRXProfile.phone_number,
      // quotable,
      subscription: TRXProfile.subscription,
      trak_name: TRXProfile.trak_name,
      // trak_symbol,
      last_logged_in: new Date().toString(),
      streak: 1,
      wallet: {
        trak: [],
        nft: [],
        tuc: 0,
        btc: 0,
        stx: 0,
        sol: 0,
        ada: 0,
        eth: 0,
        dai: 0,
      },
      avatarURL: TRXProfile.avatarURL,
      isPrivate: false,
      userPackage,
      user_subscribed_at: new Date().toString(),
      // tuc_public_keys,
    })
    .then(async () => {
      // alert(1);
      // const payload = {tuc_public_keys, ...TRXProfile};
      const payload = {...TRXProfile};

      const action = setTRXProfile(payload);
      store.dispatch(action);
      const key = asyncStorageIndex.profile;
      handleStore({key, value: payload});
    })
    .then(() => {
      // alert('success');
      const action = claimProfile();
      store.dispatch(action);
    })
    .catch(error =>
      console.log(
        '🚀 ~ file: register.ts:167 ~ handleRegister ~ error:',
        error,
      ),
    );

  return;
};
