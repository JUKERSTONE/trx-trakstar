import {useState} from 'react';
import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useT4AState} from '../../app';
import auth from '@react-native-firebase/auth';

export const useHeader = ({navigation}: any) => {
  const {handleGetState} = useT4AState();
  const isLoggedInState = handleGetState({index: 'authentication'}).isLoggedIn;
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInState);

  store.subscribe(() => {
    const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;
    console.log(
      '🚀 ~ file: useHeader.ts ~ line 12 ~ store.subscribe ~ isLoggedIn',
      isLoggedIn,
    );
    setIsLoggedIn(isLoggedIn);
  });

  const handleDeposit = () => {
    const modal = {
      type: 'deposit',
      exchange: {
        active: true,
      },
    };
    const action = toggleExchangeView(modal);
    store.dispatch(action);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAuthentication = () => {
    console.log(
      '🚀 ~ file: useHeader.ts ~ line 36 ~ handleAuthentication ~ isLoggedIn',
      isLoggedIn,
    );
    switch (isLoggedIn) {
      case true:
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

  return {
    handleDeposit,
    handleGoBack,
    handleAuthentication,
    isLoggedIn,
  };
};
