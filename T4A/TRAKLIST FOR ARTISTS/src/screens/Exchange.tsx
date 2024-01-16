import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';
import {ExchangeContainer} from '../container';

export const ExchangeScreen = ({...props}) => {
  return <ExchangeContainer {...props} />;
};
