import React, {useEffect, useState, useContext} from 'react';
import {
  store,
  toggleExchangeView,
  setAuthentication,
  useAsyncStorage,
} from '../../stores';
import auth from '@react-native-firebase/auth';
import {useLITELISTState} from '../../app';
import {Alert} from 'react-native';

export const useLandingHeader = ({navigation}: any) => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery]: any = useState('');

  const [option, setOption] = useState('track');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any>([]);
  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [searchType, setSearchType] = useState('spotify');
  const {handleGetState} = useLITELISTState();
  const {handleClear} = useAsyncStorage();

  const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;
  console.log(
    '🚀 ~ file: useLandingHeader.ts ~ line 20 ~ useLandingHeader ~ isLoggedIn',
    isLoggedIn,
  );

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
    } else setIsSearching(false);
  }, [query]);

  // const headerLeft = () => {
  //   alert(state.loggedIn);
  //   return state.loggedIn ? 'menu' : 'login';
  // };

  const handleDeposit = () => {
    navigation.navigate('MODAL', {
      type: 'deposit',
      exchange: {
        active: true,
      },
    });
  };

  const handleAuthentication = () => {
    switch (isLoggedIn) {
      case true:
        Alert.alert(
          'YOU WILL NEED YOUR SECRET KEY!',
          `${TRXProfile.stacks_keys.secret}`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Noted. Sign me out',
              onPress: async () => {
                return auth()
                  .signOut()
                  .then(async () => {
                    handleClear();
                    const authAction = setAuthentication(false);
                    store.dispatch(authAction);
                    console.log('User signed out!');
                  });
              },
            },
          ],
        );
        break;
      default:
        navigation.navigate('AUTHENTICATION');
    }
  };

  // const handleChangeText = (text : string) => {
  //   setQuery(text)
  // };

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
    isSearching,
    isLoggedIn,
    // headerLeft,
    handleDeposit,
    handleAuthentication,
    handleProfile,
    TRXProfile,
    // handleClearText,
    // query,
    // handleChangeText,
  };
};
