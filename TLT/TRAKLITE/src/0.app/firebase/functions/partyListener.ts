import {useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useProvider, PStore, store} from '../../../3.stores';
import * as actions from '../../../3.stores';

export const useCloudFunctions = () => {
  const handlePartyListener = ({partyId}: any) => {
    return firestore()
      .collection('parties')
      .doc(partyId)
      .onSnapshot(snap => {
        const party = {
          id: partyId,
          ...snap.data(),
        };
        console.log(
          '🚀 ~ file: partyListener.ts ~ line 15 ~ handlePartyListener ~ snap.data()',
          snap.data(),
        );

        const requests = snap.data()!?.requests;
        console.log(
          '🚀 ~ file: partyListener.ts ~ line 22 ~ handlePartyListener ~ data',
          requests,
        );

        // requests.map((user: any) => {
        //   Object.keys(user).map(user => {
        //     console.log(
        //       '🚀 ~ file: partyListener.ts ~ line 29 ~ Object.keys ~ user',
        //       user,
        //     );
        //     // setRequestList([...party[user]]);
        //   });
        // });

        store.dispatch(actions.SET_PARTY('user persisted.', party));
        // PStore.party = party;
        // console.log(
        //   '🚀 ~ file: partyListener.ts ~ line 17 ~ handlePartyListener ~ PStore',
        //   PStore,
        // );
      });
  };

  return {handlePartyListener};
};
