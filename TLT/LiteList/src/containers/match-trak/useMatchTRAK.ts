import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';

import {api, useAPI} from '../../api';
import {store, handleMediaPlayerAction} from '../../stores';

export const useMatchTRAK = ({navigation, route}: any) => {
  const [TRAK, setTRAK] = useState();
  const {useGET} = useAPI();

  useEffect(() => {
    //
  }, []);

  return {
    // handleNavigateTRAK,
  };
};
