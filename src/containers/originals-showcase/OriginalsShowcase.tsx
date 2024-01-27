import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {OriginalsElement} from '../../elements';
import {useOriginalsShowcase} from './useOriginalsShowcase';

export const OriginalsShowcaseContainer = ({
  query,
  navigation,
  modal,
  item,
  ...props
}: any) => {
  const {...useOriginalsProps} = useOriginalsShowcase({
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
