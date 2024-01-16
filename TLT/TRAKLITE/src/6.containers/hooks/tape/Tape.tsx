import React from 'react';
import {View, Text} from 'react-native';
import {Tape} from '../../../7.elements/tape/Tape';
import {useTape} from './useTape';

interface TTapeView {
  navigation: any;
  route: any;
}

export const TapeView: React.FC<TTapeView> = ({...props}) => {
  // const {handleTape} = useTape();

  const {tape} = props.route.params;
  return <Tape {...props} tape={tape} />;
};
