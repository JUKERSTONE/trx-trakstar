import React from 'react';
import {View, Text} from 'react-native';
import {TRXFillElement} from '../../elements';
import {useTRXFill} from './useTRXFill';

export const TRXFillContainer = ({...props}: any) => {
  const {...useTRXFillProps} = useTRXFill({...props});
  return <TRXFillElement {...useTRXFillProps} {...props} />;
};
