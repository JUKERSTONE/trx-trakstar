import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';

export const UploadsScreen = (props: any) => {
  const handleNavigateNext = () => {
    props.navigation.navigate('Sponsored_Form_5');
  };

  return (
    <SafeAreaView>
      <Text>Uploads</Text>
      <Button onPress={handleNavigateNext} title="Next" />
    </SafeAreaView>
  );
};
