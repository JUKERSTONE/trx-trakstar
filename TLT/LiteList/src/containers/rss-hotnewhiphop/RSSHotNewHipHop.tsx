import React from 'react';
import {View, Text} from 'react-native';
import {RSSHotNewHipHopElement} from '../../elements';
import {useRSSHotNewHipHop} from './useRSSHotNewHipHop';

export const RSSHotNewHipHopContainer = ({...props}: any) => {
  const {...usRSSHotNewHipHopProps} = useRSSHotNewHipHop({...props});
  return <RSSHotNewHipHopElement {...usRSSHotNewHipHopProps} {...props} />;
};
