import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';
import {TextInput} from 'react-native-gesture-handler';
import {SponsoredTracksContainer} from '../container/sponsored-tracks/SponsoredTracks';

export const TracksScreen = (props: any) => {
  return <SponsoredTracksContainer {...props} />;
};
