import React from 'react';
import {View, Text} from 'react-native';
import {RSSHypebeastElement} from '../../elements';
import {useRSSHypebeast} from './useRSSBilboard';

export const RSSHypebeastContainer = ({...props}: any) => {
  const {...usRSSHypebeastProps} = useRSSHypebeast({...props});
  return <RSSHypebeastElement {...usRSSHypebeastProps} {...props} />;
};
