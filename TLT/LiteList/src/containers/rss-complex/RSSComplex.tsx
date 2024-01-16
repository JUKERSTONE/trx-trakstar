import React from 'react';
import {View, Text} from 'react-native';
import {RSSComplexElement} from '../../elements';
import {useRSSComplex} from './useRSSComplex';

export const RSSComplexContainer = ({...props}: any) => {
  const {...usRSSComplexProps} = useRSSComplex({...props});
  return <RSSComplexElement {...usRSSComplexProps} {...props} />;
};
