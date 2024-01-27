import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ForYouElement} from '../../elements';
import {useForYou} from './useForYou';
import {ScrollView} from 'react-native-gesture-handler';

export const ForYouContainer = ({query = '', modal, item, ...props}: any) => {
  const {...useForYouProps} = useForYou(props);
  return (
    <ForYouElement modal={modal} item={item} {...useForYouProps} {...props} />
  );
};
