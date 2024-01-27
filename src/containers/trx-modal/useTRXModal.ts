import React, {useEffect, useState, useContext} from 'react';
import {
  store,
  toggleExchangeView,
  toggleTRAKRelationshipsView,
} from '../../stores';

export const useTRXModal = ({route}: any) => {
  console.log(
    '🚀 ~ file: useTRXModal.ts ~ line 9 ~ useTRXModal ~ route',
    route,
  );
  const {
    params: {
      exchange: {active, mode, item},
      type,
    },
  } = route;
  console.log(
    '🚀 ~ file: useTRXModal.ts ~ line 14 ~ useTRXModal ~ active',
    active,
    type,
  );
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
    if (type === 'exchange') {
      modal = {
        type: '',
        exchange: {
          active: false,
        },
      };
      const action = toggleExchangeView(modal);
      store.dispatch(action);
    } else if (type === 'wallet-exchange') {
      modal = {
        type: '',
        exchange: {
          active: false,
        },
      };
      const action = toggleExchangeView(modal);
      store.dispatch(action);
    } else if (type === 'deposit') {
      modal = {
        type: '',
        exchange: {
          active: false,
        },
      };
      const action = toggleExchangeView(modal);
      store.dispatch(action);
    } else if (type === 'trak-relationships') {
      modal = {
        type: '',
        trakRelationships: {
          active: false,
        },
      };
      const action = toggleTRAKRelationshipsView(modal);
      store.dispatch(action);
    }
  };

  return {
    modalVisible: type === '' || type === undefined ? false : true,
    setModalVisible,
    type: type,
    handleRequestClose,
    mode,
    item,
  };
};
