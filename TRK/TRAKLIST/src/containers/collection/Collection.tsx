import React from 'react';
import {View, Text} from 'react-native';
import {CollectionElement} from '../../elements';
import {useCollection} from './useCollection';
// import {useInvestment} from '../../../0.app';

export const CollectionContainer = (props: any) => {
  const {...useProps} = useCollection(props);
  return <CollectionElement {...props} {...useProps} />;
};
