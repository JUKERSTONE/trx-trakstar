import React from 'react';
import {View, Text} from 'react-native';
import {RSSPitchforkElement} from '../../elements';
import {useRSSPitchfork} from './useRSSPitchfork';

export const RSSPitchforkContainer = ({...props}: any) => {
  const {...usRSSPitchforkProps} = useRSSPitchfork({...props});
  return <RSSPitchforkElement {...usRSSPitchforkProps} {...props} />;
};
