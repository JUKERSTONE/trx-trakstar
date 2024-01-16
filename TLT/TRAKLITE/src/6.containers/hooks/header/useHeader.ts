import React, {useEffect, useState, useContext} from 'react';
import {useProvider} from '../../../3.stores';

export const useHeader = () => {
  const {state} = useContext(useProvider);
  const [modalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState('');
  return {
    state,
    modalVisible,
    setModalVisible,
    type,
    setType,
  };
};
