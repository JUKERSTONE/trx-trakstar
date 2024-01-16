import React from 'react';
import {View, Text} from 'react-native';
import {DetailsElement} from '../../elements';
import {useDetails} from './useDetails';

export const DetailsContainer = ({navigation, route, ...props}: any) => {
  const {...useDetailsProps} = useDetails({navigation, route});
  return <DetailsElement {...useDetailsProps} {...props} />;
};
