import React from 'react';
import {View, Text} from 'react-native';
import {PartyAdmin} from '../../../7.elements';
import {usePartyAdmin} from './usePartyAdmin';

export const PartyAdminView = ({...props}) => {
  console.log(props, 'rwiyuogweryg');
  const {...partyAdminProps} = usePartyAdmin(props);
  return <PartyAdmin {...partyAdminProps} />;
};
