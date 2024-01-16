import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';
import {SponsoredStrategyContainer} from '../container/sponsored-strategy';

export const StrategyScreen = (props: any) => {
  console.log('🚀 ~ file: Strategy.tsx:7 ~ StrategyScreen ~ props:', props);
  return <SponsoredStrategyContainer {...props} />;
};
