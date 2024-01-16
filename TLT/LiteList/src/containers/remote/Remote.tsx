import React from 'react';
import {View, Text} from 'react-native';
import {useRemote} from './useRemote';
import {RemoteElement} from '../../elements';

export const RemoteContainer = ({
  navigation,
  route,
  chatURI,
  player,
  isMMS,
  ...props
}: any) => {
  const {...useRemoteProps} = useRemote({
    navigation,
    route,
    chatURI,
    player,
    isMMS,
  });
  return <RemoteElement {...useRemoteProps} {...props} isMMS={isMMS} />;
};
