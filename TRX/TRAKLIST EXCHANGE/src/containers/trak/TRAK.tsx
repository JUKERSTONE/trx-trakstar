import React from 'react';
import {View, Text} from 'react-native';
import {useTRAK} from './useTRAK';
import {TRAKElement} from '../../elements';

export const TRAKContainer = ({navigation, route, ...props}: any) => {
  const {...useTRAKProps} = useTRAK({navigation, route});
  return <TRAKElement {...useTRAKProps} {...props} />;
};
