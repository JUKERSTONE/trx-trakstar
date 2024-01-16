import React, {useEffect, useState, useContext} from 'react';
import {useProvider} from '../../../3.stores';
import {useCloudFunctions} from '../../../0.app';

export const usePartyAdmin = ({navigation, partyId, ...props}: any) => {
  const {state} = useContext(useProvider);
  const requests = state.party?.requests || [];
  const {handlePartyListener} = useCloudFunctions();
  useEffect(() => {
    try {
      handlePartyListener({navigation, partyId});
    } catch (err) {
      //
      //
    }
  });

  return {
    requests,
  };
};
