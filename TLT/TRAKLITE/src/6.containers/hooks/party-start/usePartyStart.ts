import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {START_PARTY} from '../../../1.api';
import {useProvider} from '../../../3.stores';
import moment from 'moment';

export const usePartyStart = ({navigation}: any) => {
  const {state} = useContext(useProvider);
  const [partyCapacity, setPartyCapacity] = useState('');
  const handleInputChange = (text: string) => {
    setPartyCapacity(text);
  };

  const handleSubmitPartyForm = () => {
    const startTimeStamp = moment(new Date());
    const expires = moment(startTimeStamp)
      .add(3, 'hours')
      .format('dddd, MMMM Do YYYY, h:mm:ss a');

    const body = {
      assumedCapacity: partyCapacity,
      expires,
    };

    axios
      .post(START_PARTY, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.traklist.access_token,
        },
      })
      .then(response => {
        console.log(
          '🚀 ~ file: usePartyStart.ts ~ line 24 ~ handleSubmitPartyForm ~ response',
          response.data,
        );

        const partyId = response.data.id;

        navigation.navigate('PartyAdmin', {partyId});

        // navigate WITH party id
      })
      .catch(err => {
        console.log('lemme knoiw');
      });
  };

  return {
    handleInputChange,
    handleSubmitPartyForm,
  };
};
