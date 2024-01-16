import {View, Text} from 'react-native';
import React from 'react';
import {useProduct} from './useProduct';
import {ProductElement} from '../../elements';

export const ProductContainer = ({...props}: any) => {
  const {...useProductProps} = useProduct({...props});
  return <ProductElement {...useProductProps} {...props} />;
};
