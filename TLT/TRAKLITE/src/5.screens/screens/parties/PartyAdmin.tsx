import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {PartyAdminView} from '../../../6.containers';

export const PartyAdmin = ({...props}) => {
  const partyId = props.route.params.partyId;
  console.log(
    '🚀 ~ file: PartyAdmin.tsx ~ line 6 ~ PartyAdmin ~ props.route',
    props.route,
  );
  return (
    // <SafeAreaView>
    //   <Text>id : {partyId}</Text>
    //   <Text>Party Admin</Text>
    // </SafeAreaView>
    <PartyAdminView partyId={partyId} />
  );
};
