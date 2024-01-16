import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {OriginalsElement, TRXM3DIAElement} from '../../elements';
import {useTRXM3DIA} from './useTRXM3DIA';
import {AIMusicElement} from '../../elements/ai-music';

export const TRXM3DIAContainer = ({
  query = '',
  navigation,
  modal,
  item,
  isTraklist,
  ...props
}: any) => {
  const {...useTRXProps} = useTRXM3DIA({isTraklist});
  return <TRXM3DIAElement {...useTRXProps} />;
};
