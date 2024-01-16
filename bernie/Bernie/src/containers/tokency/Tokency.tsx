import React from 'react';
import {View, Text} from 'react-native';
import {TokencyElement} from '../../elements';
import {useTokency} from './useTokency';

export const TokencyContainer = ({...props}) => {
  const {...useTokencyProps} = useTokency();
  return <TokencyElement {...useTokencyProps} {...props} />;
};
