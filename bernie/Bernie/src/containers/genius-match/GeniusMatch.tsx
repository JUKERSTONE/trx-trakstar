import React from 'react';
import {View, Text} from 'react-native';
import {GeniusMatchElement} from '../../elements';
import {useGeniusMatch} from './useGeniusMatch';

export const GeniusMatchContainer = ({navigation, route, ...props}: any) => {
  const {...useGeniusMatchProps} = useGeniusMatch({navigation, route});
  return (
    <GeniusMatchElement
      navigation={navigation}
      {...useGeniusMatchProps}
      {...props}
    />
  );
};
