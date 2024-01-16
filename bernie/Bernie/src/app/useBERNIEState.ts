import React, {useEffect, useState, useContext} from 'react';
import {store} from '../stores';

export const useBERNIEState = () => {
  store.subscribe(() => {
    const state = store.getState();
    console.log('TRAKLIST APP STATE : ', state);
  });

  const handleGetState = ({index}: any) => {
    const state: any = store.getState();
    const element = state[index];
    return element;
  };

  return {
    handleGetState,
  };
};
