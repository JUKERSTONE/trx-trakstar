import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState, handleAcceptTRAK} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useOriginalsRanker = ({navigation, route}: any) => {
  return {
    //
    //
  };
};
