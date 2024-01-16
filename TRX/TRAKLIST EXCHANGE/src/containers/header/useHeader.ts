import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useTRAKLISTState} from '../../app';
import auth from '@react-native-firebase/auth';
export const useHeader = ({navigation}: any) => {
  const {handleGetState} = useTRAKLISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;

  const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;

  const handleDeposit = () => {
    navigation.navigate('MODAL', {
      type: 'deposit',
      exchange: {
        active: true,
      },
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAuthentication = (isModal: any) => {
    // remove state when logging out
    switch (isLoggedIn) {
      case true:
        if (isModal) {
          navigation.goBack();
        }
        return auth()
          .signOut()
          .then(() => {
            const authAction = setAuthentication(false);
            store.dispatch(authAction);
            console.log('User signed out!');
          });
      default:
        navigation.navigate('AUTHENTICATION');
    }
  };

  const handleProfile = () => {
    navigation.navigate('MODAL', {
      type: 'profile',
      exchange: {
        active: true,
        item: TRXProfile,
      },
    });
  };

  return {
    handleDeposit,
    handleGoBack,
    isLoggedIn,
    handleAuthentication,
    handleProfile,
  };
};
