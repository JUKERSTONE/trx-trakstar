import React, {useEffect, useState, useContext} from 'react';
// import Clipboard from '@react-native-clipboard/clipboard';
import {useLITELISTState} from '../../app';
import firestore from '@react-native-firebase/firestore';
import {useTRX} from '../../app/hooks/useTRX';

export const useAuction = ({navigation, route, user}: any) => {
  const [isStripeInit, setIsStripeInit] = useState<boolean>(false);

  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    setIsStripeInit(true);
  }, []);

  return {
    isStripeInit,
  };
};
