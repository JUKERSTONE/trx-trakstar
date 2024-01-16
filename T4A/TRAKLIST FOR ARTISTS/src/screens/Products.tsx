import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';

export const ProductsScreen = () => {
  return (
    <SafeAreaView>
      <Text>Products</Text>
    </SafeAreaView>
  );
};
