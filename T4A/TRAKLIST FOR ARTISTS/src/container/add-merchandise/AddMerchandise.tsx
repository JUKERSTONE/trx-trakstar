import React from 'react';
import {View, Text} from 'react-native';
import {AddMerchandiseElement} from '../../elements';
import {useAddMerchandise} from './useAddMerchandise';

export const AddMerchandiseContainer = ({navigation, route, ...props}: any) => {
  const {...useAddMerchandiseProps} = useAddMerchandise({navigation, route});
  return <AddMerchandiseElement {...useAddMerchandiseProps} {...props} />;
};
