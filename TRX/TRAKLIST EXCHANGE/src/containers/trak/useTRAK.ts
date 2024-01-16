import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';

export const useTRAK = ({navigation, route}: any) => {
  const [TRAK, setTRAK] = useState();
  const {useGET} = useAPI();
  useEffect(() => {
    const trak = route.params.trak;
    const trakID = trak.trakID;
    getTRAK(trakID);
  }, []);

  const getTRAK = async (trakID: string) => {
    const route = api.bernie({method: 'get_trak', payload: {trakID}});
    const response = await useGET({route});
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 17 ~ getTRAK ~ response',
      response,
    );
    const trak = response.data;
    console.log('🚀 ~ file: useTRAK.ts ~ line 18 ~ getTRAK ~ trak', trak);
    setTRAK(trak);
  };

  const handleSeeMoreMeta = (songRelationships: any) => {
    navigation.navigate('MODAL', {
      type: 'trak-relationships',
      exchange: {
        active: true,
        item: songRelationships,
      },
    });
  };

  return {
    TRAK,
    handleSeeMoreMeta,
  };
};
