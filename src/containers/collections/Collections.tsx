import {View, Text} from 'react-native';
import React from 'react';
import {useCollections} from './useCollections';
import {CollectionsElement} from '../../elements';

export const CollectionsContainer = ({...props}: any) => {
  const {...useCollectionsProps} = useCollections({...props});
  return <CollectionsElement {...useCollectionsProps} {...props} />;
};
