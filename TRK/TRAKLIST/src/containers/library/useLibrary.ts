import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useTRAKLISTState} from '../../app';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useLibrary = ({navigation}: any) => {
  const handlePlay = () => {
    //
    //
  };

  return {
    //
  };
};
