import React, {useEffect, useState, useContext} from 'react';
import {useFirebase} from '../../app';
import {
  store,
  storeKeysTRX,
  asyncStorageIndex,
  useAsyncStorage,
} from '../../stores';

export const useTRXDistribution = ({navigation}: any) => {
  const handleNavigateRedeem = () => {
    navigation.navigate('REDEEM');
  };

  const handleNavigateMint = () => {
    navigation.navigate('Sponsored', {
      screen: 'Settings',
    });
  };
  return {
    handleNavigateRedeem,
    handleNavigateMint,
  };
};
