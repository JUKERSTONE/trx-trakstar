import React from 'react';
import {View, Text} from 'react-native';
import {SponsoredSearchElement} from '../../elements';
import {useSponsoredSearch} from './useSponsoredSearch';

export const SponsoredSearchContainer = ({...props}: any) => {
  const {...useSponsoredSearchProps} = useSponsoredSearch(props);
  return <SponsoredSearchElement {...useSponsoredSearchProps} {...props} />;
};
