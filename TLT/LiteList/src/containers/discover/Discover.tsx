import React from 'react';
import {View, Text} from 'react-native';
import {useDiscover} from './useDiscover';
import {DiscoverElement} from '../../elements';

export const DiscoverContainer = ({...props}: any) => {
  const {...useDiscoverProps} = useDiscover({...props});
  return <DiscoverElement {...useDiscoverProps} {...props} />;
};
