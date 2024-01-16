import React from 'react';
import {View, Text} from 'react-native';
import {StorefrontElement} from '../../elements';
import {useStorefront} from './useStorefront';

export const StorefrontContainer = ({...props}: any) => {
  const {...useStorefrontProps} = useStorefront();
  return <StorefrontElement {...useStorefrontProps} {...props} />;
};
