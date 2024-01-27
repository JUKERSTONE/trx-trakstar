import React, {useEffect, useState, useContext} from 'react';
import {store} from '../stores';

export const useLITELISTState = () => {
  const handleGetState = ({index}: any) => {
    const state: any = store.getState();
    const element = state[index];
    return element;
  };

  return {
    handleGetState,
  };
};
