import React, {useEffect, useState, useContext} from 'react';
import {useAppBrowser} from '../app-browser';

export const useWalletSetup = ({...props}: any) => {
  const [secretKey, setSecretKey] = useState<any>(null);
  const [keys, setKeys] = useState(null);

  const {
    params: {profile},
  } = props.route;
  // console.log(
  //   '🚀 ~ file: useWalletSetup.ts ~ line 11 ~ useWalletSetup ~ profile',
  //   profile,
  // );
  // const mobileParams = {
  //   profile,
  // };
  const {handleLoadHTTPS} = useAppBrowser({...props});

  useEffect(() => {
    const route = 'https://tsb.media/wallet';
    const params = '/wallet';

    handleLoadHTTPS({route, params});

    setTimeout(() => {
      console.log(
        '🚀 ~ file: useWalletSetup.ts ~ line 16 ~ handleClaim ~ profile',
        route,
      );

      props.navigation.navigate('PAYWALL', {
        screen: 'SUBSCRIPTIONS',
        params: {
          profile: {
            ...profile,
            likes: [],
          },
        },
      });
    }, 5000);
  }, []);

  const handleClearKey = () => {
    setSecretKey(null);
  };

  // const handleClaim = () => {
  //   const {
  //     params: {profile},
  //   } = route;
  //   console.log(
  //     '🚀 ~ file: useWalletSetup.ts ~ line 16 ~ handleClaim ~ profile',
  //     route,
  //   );

  //   navigation.navigate('PAYWALL', {
  //     screen: 'SUBSCRIPTIONS',
  //     params: {
  //       profile: {
  //         ...profile,
  //         likes: [],
  //       },
  //     },
  //   });
  // };

  // const handleNewSecretKey = async () => {
  //   const {
  //     params: {profile},
  //   } = route;

  //   navigation.navigate('PAYWALL', {
  //     screen: 'SUBSCRIPTIONS',
  //     params: {
  //       profile: {
  //         ...profile,
  //         likes: [],
  //       },
  //     },
  //   });
  // };

  const handleCopyKey = () => {
    //  keychain
    // Clipboard.setString(secretKey);
  };

  return {
    // handleNewSecretKey,
    // handleClaim,
    handleClearKey,
    handleCopyKey,
    secretKey,
  };
};
