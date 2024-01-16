import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {GET_PARTY} from '../../../1.api';
import {useProvider} from '../../../3.stores';
import {useCloudFunctions} from '../../../0.app/firebase';
import {PStore} from '../../../3.stores';
export const usePartyJoin = ({navigation}: any) => {
  const {handlePartyListener} = useCloudFunctions();
  const {state} = useContext(useProvider);
  const [partyId, setPartyId] = useState('VNcREqpfHi4g2yKMKpfZ');
  const handleInputChange = (text: string) => {
    setPartyId(text);
  };

  const handleJoinParty = () => {
    try {
      handlePartyListener({navigation, partyId});

      console.log(
        '🚀 ~ file: usePartyJoin.ts ~ line 20 ~ handleJoinParty ~ state',
        state,
      );
      // console.log(
      //   '🚀 ~ file: usePartyJoin.ts ~ line 54 ~ handleJoinParty ~ partyData',
      //   partyData,
      // );
      // console.log(
      //   '🚀 ~ file: usePartyJoin.ts ~ line 24 ~ handleJoinParty ~ PStore.party',
      //   PStore.party,
      // );
      navigation.navigate('PartyUser');
    } catch (err) {
      //
    }
  };

  return {
    handleInputChange,
    handleJoinParty,
  };
};
