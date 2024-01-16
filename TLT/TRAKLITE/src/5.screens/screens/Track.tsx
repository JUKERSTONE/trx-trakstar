import React from 'react';
import {View, Text} from 'react-native';
import {TrackView} from '../../6.containers';
import {TraklistApp} from '../../6.containers/hooks/traklist-app/TraklistApp';

interface TTrack {
  navigation: any;
  route: any;
}
export const Track: React.FC<TTrack> = ({navigation, route}) => {
  return (
    <TraklistApp
      navigation={navigation}
      hasPost={true}
      handlePost={() => navigation.navigate('Content', {query: 'test'})}>
      <TrackView navigation={navigation} route={route} />
    </TraklistApp>
  );
};
