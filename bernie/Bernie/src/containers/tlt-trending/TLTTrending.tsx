import {View, Text} from 'react-native';
import React from 'react';

import {TLTTrendingElement} from '../../elements';
import {useTLTTrending} from './useTLTTrending';

export const TLTTrendingContainer = ({...props}) => {
  const {...useTLTTrendingProps} = useTLTTrending({...props});
  return <TLTTrendingElement {...useTLTTrendingProps} {...props} />;
};
