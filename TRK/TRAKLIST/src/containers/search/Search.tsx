import React from 'react';
import {View, Text} from 'react-native';
import {useSearch} from './useSearch';
import {ExchangeElement} from '../../elements';

export const SearchContainer = ({navigation, ...props}: any) => {
  const {...useProps} = useSearch(navigation);
  return <ExchangeElement {...useProps} />;
};
