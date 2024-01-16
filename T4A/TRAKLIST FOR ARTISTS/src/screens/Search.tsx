import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';
import {SponsoredSearchContainer} from '../container';

export const SearchScreen = (props: any) => {
  const handleNavigateNext = () => {
    props.navigation.navigate('Sponsored_Form_4');
  };

  return <SponsoredSearchContainer {...props} />;
};

// <SafeAreaView>
//   <Text>Search</Text>
//   <Button onPress={handleNavigateNext} title="Next" />
// </SafeAreaView>
