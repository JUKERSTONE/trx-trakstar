import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TRAKTabElement} from '../../elements';
import {useTRAKTab} from './useTRAKTab';

export const TRAKTabContainer = ({
  query,
  navigation,
  modal,
  item,
  ...props
}: any) => {
  const {...useTRAKTabProps} = useTRAKTab({
    query: modal ? `${item.artist} - ${item.title}` : query,
    navigation,
  });
  return (
    <TRAKTabElement modal={modal} item={item} {...useTRAKTabProps} {...props} />
  );
};
