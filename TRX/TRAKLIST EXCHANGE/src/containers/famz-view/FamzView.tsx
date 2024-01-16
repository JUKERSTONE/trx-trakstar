import React from 'react';
import {View, Text} from 'react-native';
import {FamzViewElement} from '../../elements';
import {useFamzView} from './useFamzView';

export const FamzViewContainer = ({navigation, ...props}: any) => {
  const {...useFamzViewProps} = useFamzView({navigation});
  return <FamzViewElement {...useFamzViewProps} {...props} />;
};
