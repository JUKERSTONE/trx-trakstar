import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState, handleAcceptTRAK, handleSubmitProduct} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useRecordsShop = ({navigation, route}: any) => {
  const [detailAdder, setDetailAdder] = useState('');
  const [imageAdder, setImageAdder] = useState('');
  const [sizeAdder, setSizeAdder] = useState('');
  const [record, setRecord] = useState({
    category: 'record',
    artist: '',
    product: '',
    price: 0,
    images: [],
    format: [],
    trackListings: {},
    promoText: '',
    description: '',
  });

  return {
    record,
    setRecord,
    detailAdder,
    setDetailAdder,
    imageAdder,
    setImageAdder,
    sizeAdder,
    setSizeAdder,
    handleSubmitProduct,
  };
};
