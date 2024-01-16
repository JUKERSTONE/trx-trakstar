import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {GeniusElement} from '../../elements';
import {useGenius} from './useGenius';

export const GeniusContainer = ({...props}: any) => {
  const {...useGeniusProps} = useGenius({...props});
  return <GeniusElement {...useGeniusProps} {...props} />;
};
