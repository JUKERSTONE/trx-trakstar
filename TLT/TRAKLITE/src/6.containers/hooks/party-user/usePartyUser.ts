import React, {useEffect, useState, useContext} from 'react';
import {useProvider} from '../../../3.stores';
import axios from 'axios';
import {MAKE_DJ_REQUEST} from '../../../1.api';

export const usePartyUser = (props: any) => {
  const {state} = useContext(useProvider);

  const party = state.party || [];
  console.log(
    '🚀 ~ file: usePartyUser.ts ~ line 11 ~ usePartyUser ~ party',
    party,
  );
  const requests = state.party?.requests || [];
  const partyId = state.party?.id;

  const content = props.route?.params?.content;

  useEffect(() => {
    console.log(
      '🚀 ~ file: usePartyUser.ts ~ line 30 ~ Object.keys ~ requests',
      party.requests,
    );
  }, []);

  useEffect(() => {
    if (content) {
      axios
        .post(MAKE_DJ_REQUEST(partyId), content, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.traklist?.access_token,
          },
        })
        .then(response => {
          // setRequests([content, ...requests]);
          // all clear
        })
        .catch(err => {
          alert('err');
        });
    }
  }, [content]);

  const handleRequestTrack = () => {
    props.navigation.navigate('PartyContent', {
      type: 'track',
      mode: 'party',
    });
  };

  return {
    // assumedCapacity,
    // djId,
    // partyId,
    // requests,
    handleRequestTrack,
    requests,
  };
};
