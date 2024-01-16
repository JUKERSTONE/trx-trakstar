import React from 'react';
import {View, Text} from 'react-native';
import {PartyUser} from '../../../7.elements/party-user';
import {usePartyUser} from './usePartyUser';

export const PartyUserView = ({...props}) => {
  const {...partyUserProps} = usePartyUser(props);
  return <PartyUser {...partyUserProps} />;
};
