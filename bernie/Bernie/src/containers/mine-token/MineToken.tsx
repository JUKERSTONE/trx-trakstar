import React from 'react';
import {View, Text} from 'react-native';
import {MineTokenElement} from '../../elements';
import {useMineToken} from './useMineToken';

export const MineTokenContainer = ({...props}) => {
  const {...useMineTokenProps} = useMineToken();
  return <MineTokenElement {...useMineTokenProps} {...props} />;
};
