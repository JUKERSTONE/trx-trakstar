import {
  toggleExchangeView,
  store,
  setAuthentication,
  useAsyncStorage,
} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {useEffect} from 'react';

export const useGenius = ({navigation, route}: any) => {
  console.log('🚀 ~ file: useGenius.ts ~ line 13 ~ useGenius ~ route', route);
  const {handleGetState} = useLITELISTState();

  const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const {handleClear, handleStore} = useAsyncStorage();

  // useEffect(() => {
  const {
    params: {url},
  } = route;
  console.log('🚀 ~ file: useGenius.ts ~ line 24 ~ useEffect ~ url', url);
  // }, []);

  return {url};
};
