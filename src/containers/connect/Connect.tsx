import React from 'react';
import {View, Text} from 'react-native';
import {ConnectElement} from '../../elements';
import {useConnect} from './useConnect';

export const ConnectContainer = ({navigation, ...props}: any) => {
  const {...useConnectProps} = useConnect({navigation});
  return <ConnectElement {...useConnectProps} {...props} />;
};
