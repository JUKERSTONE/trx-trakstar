import {View, Text} from 'react-native';
import React from 'react';
import {TRXModalElement} from '../../elements';
import {useTRXModal} from './useTRXModal';

export const TRXModalContainer = ({route, ...props}: any) => {
  console.log(
    '🚀 ~ file: TRXModal.tsx ~ line 7 ~ TRXModalContainer ~ props',
    props,
  );
  const {...useTRXModalProps} = useTRXModal({route});
  return <TRXModalElement {...useTRXModalProps} {...props} />;
};
