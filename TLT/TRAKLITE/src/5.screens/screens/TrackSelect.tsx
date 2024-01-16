import React from 'react';
import {View, Text, Image, Dimensions, Button, TextInput} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {TrackSelectView} from '../../6.containers';
import {TraklistApp} from '../../6.containers/hooks/traklist-app/TraklistApp';

export const TrackSelect = ({navigation}: any) => {
  return (
    <TraklistApp navigation={navigation}>
      <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
        <TrackSelectView navigation={navigation} />
      </View>
    </TraklistApp>
  );
};
