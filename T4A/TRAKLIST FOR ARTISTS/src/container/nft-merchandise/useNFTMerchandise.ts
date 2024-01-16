import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';

export const useNFTMerchandise = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useNFTMerchandise.ts ~ line 7 ~ useNFTMerchandise ~ route',
    route,
  );
  const item = route.params;
  console.log(
    '🚀 ~ file: useNFTMerchandise.ts ~ line 8 ~ useNFTMerchandise ~ item',
    item,
  );

  const handleNavigateAddMerchandise = () => {
    navigation.navigate('ADD_MERCHANDISE', item);
  };

  return {
    item,
    handleNavigateAddMerchandise,
  };
};
