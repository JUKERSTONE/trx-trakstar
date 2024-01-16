import React from 'react';
import {View, Text} from 'react-native';
import {ListsElement} from '../../elements';
import {useLists} from './useLists';

export const ListsContainer = (props: any) => {
  const {...useListsProps} = useLists();
  return <ListsElement {...useListsProps} {...props} />;
};
