import React from 'react';
import {View, Text} from 'react-native';
import {Search} from '../../../7.elements/search-screen';
import {useSearch} from './useSearch';

export const SearchView = () => {
  const {...useProps} = useSearch();
  return <Search {...useProps} />;
};
