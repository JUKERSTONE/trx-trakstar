import React from 'react';
import {View, Text} from 'react-native';
import {HomeElement} from '../../elements';
import {useHome} from './useHome';

export const HomeContainer = ({...props}: any) => {
  const {...useHomeProps} = useHome({...props});
  return <HomeElement {...useHomeProps} {...props} />;
};
