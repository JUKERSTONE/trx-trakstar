import React, {useEffect, useState, useContext} from 'react';
// import Clipboard from '@react-native-clipboard/clipboard';
import {useLITELISTState} from '../../app';
import firestore from '@react-native-firebase/firestore';

export const useWalletConnect = ({
  navigation,
  route,
  handleClaimSecretKey,
  user,
}: any) => {
  const [secretKey, setSecretKey] = useState<any>(null);

  const {handleGetState} = useLITELISTState();

  const handleClearKey = () => {
    setSecretKey(null);
  };

  // const handleClaim = () => {
  //   if (isCryptoWall) {
  //     handleClaimSecretKey(keys);
  //   } else {
  //     const {
  //       params: {profile},
  //     } = route;
  //     navigation.navigate('ONBOARD', {
  //       screen: 'SEED',
  //       params: {
  //         profile: {
  //           ...profile,
  //           stacks_keys: keys,
  //         },
  //       },
  //     });
  //   }
  // };

  const handleRestoreProfile = async (event: any) => {
    const keyData = JSON.parse(event.nativeEvent.data);
    console.log(
      '🚀 ~ file: useWalletConnect.ts ~ line 38 ~ handleRestoreProfile ~ keyData',
      keyData,
    );
    const publicKey = keyData.public;

    const userId = user._user.uid;

    const profile = await firestore()
      .doc(`users/${userId}`)
      .get()
      .then(async doc => {
        doc.ref.update({last_logged_in: new Date().toString()});

        const profile: any = doc.data();

        return profile;
      });
    console.log(
      '🚀 ~ file: useWalletConnect.ts ~ line 50 ~ handleRestoreProfile ~ profile',
      profile,
    );

    const stacks_public_key = profile.stacks_public_key;
    console.log(
      '🚀 ~ file: useWalletConnect.ts ~ line 61 ~ handleRestoreProfile ~ stacks_public_key',
      stacks_public_key,
    );

    if (publicKey === stacks_public_key) {
      handleClaimSecretKey(keyData);
    } else alert('invalid wallet');
    // check if backend has the same publicKey
  };

  const handleCopyKey = () => {
    //  keychain
    // Clipboard.setString(secretKey);
  };

  return {
    handleRestoreProfile,
    handleClearKey,
    handleCopyKey,
    secretKey,
  };
};
