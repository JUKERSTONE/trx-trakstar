import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {OriginalsElement} from '../../elements';
import {useAIMusic} from './useAIMusic';
import {AIMusicElement} from '../../elements/ai-music';

export const AIMusicContainer = ({
  query = '',
  navigation,
  modal,
  item,
  ...props
}: any) => {
  const {...useOriginalsProps} = useAIMusic({
    query: modal ? `${item.artist} - ${item.title}` : query,
    navigation,
  });
  return (
    <AIMusicElement
      modal={modal}
      item={item}
      {...useOriginalsProps}
      {...props}
    />
  );
};
