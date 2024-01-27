import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useOffline} from './useOffline';
import {ArtistTopTracks} from '../../elements';
import {useEffectAsync} from '../../app';
import {APIKeys, api, useAPI} from '../../api';
import {SafeAreaView} from 'react-native-safe-area-context';

export const OfflineContainer = ({
  navigation,
  route,
  topTracks,
  ...props
}: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Offline</Text>
    </SafeAreaView>
  );
};
