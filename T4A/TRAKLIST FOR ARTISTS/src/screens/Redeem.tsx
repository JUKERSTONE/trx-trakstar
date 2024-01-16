import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';
import {RedeemContainer} from '../container';

export const RedeemScreen = ({...props}) => {
  return <RedeemContainer {...props} />;
};
