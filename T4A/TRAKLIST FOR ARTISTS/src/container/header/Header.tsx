import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {HeaderElement} from '../../elements';
import {useHeader} from './useHeader';

export const HeaderContainer = ({navigation, ...props}: any) => {
  const {...useHeaderProps} = useHeader({navigation});
  return <HeaderElement {...useHeaderProps} {...props} />;
};
