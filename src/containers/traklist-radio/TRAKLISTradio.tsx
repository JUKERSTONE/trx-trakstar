import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TRAKLISTradioElement} from '../../elements';
import {useTRAKLISTradio} from './useTRAKLISTradio';

export const TRAKLISTradioContainer = ({...props}: any) => {
  const {...useTRADIOProps} = useTRAKLISTradio();
  return <TRAKLISTradioElement {...useTRADIOProps} {...props} />;
};
