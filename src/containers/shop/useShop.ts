import {useEffect, useState} from 'react';

export const useShop = ({navigation, route}: any) => {
  const handleProduct = ({item}: any) => {
    navigation.navigate('Product', {
      item,
    });
  };

  return {
    handleProduct,
  };
};
