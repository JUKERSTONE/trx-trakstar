import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

export const useTRAKLISTradio = () => {
  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    const {mode, paused, muted, repeat, source, image, title, artist} =
      handleGetState({index: 'player'});
  }, []);

  return {
    // handleDeposit,
    // handleGoBack,
    // isLoggedIn,
    // handleAuthentication,
  };
};
