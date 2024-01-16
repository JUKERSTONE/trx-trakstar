import {View, Text} from 'react-native';
import React from 'react';
import {BernieModalElement} from '../../elements';
import {useTRXModal} from './useBernieModal';

export const BernieModalContainer = ({...props}) => {
  const {...useTRXModalProps} = useTRXModal();
  return <BernieModalElement {...useTRXModalProps} {...props} />;
};
