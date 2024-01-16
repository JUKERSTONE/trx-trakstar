import React, {useEffect, useState, useContext} from 'react';
// import Clipboard from '@react-native-clipboard/clipboard';

export const useWalletSetup = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useWalletSetup.ts ~ line 5 ~ useWalletSetup ~ navigation',
    navigation,
  );
  console.log(
    '🚀 ~ file: useWalletSetup.ts ~ line 5 ~ useWalletSetup ~ route',
    route,
  );
  const [secretKey, setSecretKey] = useState<any>(null);
  const [keys, setKeys] = useState(null);

  const handleClearKey = () => {
    setSecretKey(null);
  };

  const handleClaim = () => {
    const {
      params: {profile},
    } = route;
    console.log(
      '🚀 ~ file: useWalletSetup.ts ~ line 16 ~ handleClaim ~ profile',
      route,
    );
    navigation.navigate('ONBOARD', {
      screen: 'SEED',
      params: {
        profile: {
          ...profile,
          stacks_keys: keys,
        },
      },
    });
  };

  const handleNewSecretKey = (event: any) => {
    const keyData = JSON.parse(event.nativeEvent.data);
    console.log(
      '🚀 ~ file: useNewSecretKey.ts ~ line 6 ~ handleNewSecretKey ~ keyPair',
      keyData,
    );

    setSecretKey(keyData.secret);
    setKeys(keyData);
  };

  const handleCopyKey = () => {
    //  keychain
    // Clipboard.setString(secretKey);
  };

  return {
    handleNewSecretKey,
    handleClaim,
    handleClearKey,
    handleCopyKey,
    secretKey,
  };
};
