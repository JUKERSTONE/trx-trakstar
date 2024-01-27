import React, {useEffect, useState, useContext} from 'react';
import {store, toggleExchangeView} from '../../stores';

export const useTRXModal = () => {
  const [modalState, setModalState] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  store.subscribe(() => {
    const state = store.getState();
    const modalState = state.modal;
    setModalState(modalState);
    // console.log('TRAKLIST APP STATE : ', state);
  });

  const handleRequestClose = () => {
    let modal;
    if (modalState?.type === 'exchange') {
      modal = {
        type: '',
        exchange: {
          active: false,
        },
      };
    } else if (modalState?.type === 'wallet-exchange') {
      modal = {
        type: '',
        exchange: {
          active: false,
        },
      };
    } else if (modalState?.type === 'deposit') {
      modal = {
        type: '',
        exchange: {
          active: false,
        },
      };
    }
    const action = toggleExchangeView(modal);
    store.dispatch(action);
  };
  return {
    modalVisible: modalState?.exchange?.active,
    setModalVisible,
    state: modalState,
    type: modalState?.type,
    handleRequestClose,
  };
};
