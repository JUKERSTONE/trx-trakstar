import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState, handleSubmitProduct} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useMerchandiseShop = ({navigation, route}: any) => {
  const [detailAdder, setDetailAdder] = useState('');
  const [imageAdder, setImageAdder] = useState('');
  const [sizeAdder, setSizeAdder] = useState('');
  const [merchandise, setMerchandise] = useState({
    category: 'merchandise',
    brand: '',
    product: '',
    price: 0,
    images: [],
    sizes: [],
    details: {},
    promoText: '',
    description: '',
  });

  return {
    merchandise,
    setMerchandise,
    detailAdder,
    setDetailAdder,
    imageAdder,
    setImageAdder,
    sizeAdder,
    setSizeAdder,
    handleSubmitProduct,
  };
};
