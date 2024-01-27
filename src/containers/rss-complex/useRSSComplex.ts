import React, {useEffect, useState, useContext} from 'react';
import {
  PlayerContext,
  useAsyncStorage,
  handleUpdateBalances,
  store,
  handlePublicKeys,
} from '../../stores';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import * as Keychain from 'react-native-keychain';
import {handleFirestorePublicKeys} from '../../app';

export const useRSSComplex = ({navigation, route, ...props}: any) => {
  const handleNavigateWebsite = (item: any) => {
    console.log(
      '🚀 ~ file: useRSSComplex.ts:16 ~ handleNavigateWebsite ~ item:',
      item,
    );
    navigation.navigate('GENIUS', {
      url: item,
    });
  };

  return {
    handleNavigateWebsite,
    // handleHTTPSResponse,
    // tuc_public_keys: profileTRX.tuc_public_keys,
  };
};
