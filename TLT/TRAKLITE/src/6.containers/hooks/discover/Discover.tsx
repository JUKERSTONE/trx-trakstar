import React from 'react';
import {View, Text} from 'react-native';
import {Discover} from '../../../7.elements/discover';
import {useDiscover} from './useDiscover';

export const DiscoverView = ({...props}) => {
  const {...discoverProps} = useDiscover();
  return <Discover {...props} {...discoverProps} />;
};
