import React from 'react';
import {View, Dimensions} from 'react-native';
import {CaptionSetView} from '../../../6.containers';
import {TraklistApp} from '../../../6.containers/hooks/traklist-app/TraklistApp';

export const Caption: React.FC<any> = ({navigation, route}) => {
  return (
    <TraklistApp navigation={navigation} hasPlayer={false}>
      <CaptionSetView navigation={navigation} route={route} />
    </TraklistApp>
  );
};
