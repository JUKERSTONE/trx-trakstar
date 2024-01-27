import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {USERSTabElement} from '../../elements';
import {useUSERSTab} from './useUSERSTab';

export const USERSTabContainer = ({query, navigation, ...props}: any) => {
  const {...useUSERSTabProps} = useUSERSTab({query, navigation});
  return <USERSTabElement {...useUSERSTabProps} {...props} />;
};
