import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {OriginalsElement} from '../../elements';
import {useOriginals} from './useOriginals';

export const OriginalsContainer = ({
  query = '',
  navigation,
  modal,
  item,
  ...props
}: any) => {
  const {...useOriginalsProps} = useOriginals({
    query: modal ? `${item.artist} - ${item.title}` : query,
    navigation,
  });
  return (
    <OriginalsElement
      modal={modal}
      item={item}
      {...useOriginalsProps}
      {...props}
    />
  );
};
