import React, {FC} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {PartyJoin} from '../../../7.elements/party-join';
import {usePartyJoin} from './usePartyJoin';

export const PartyJoinView = ({...props}) => {
  const {...useProps} = usePartyJoin(props);
  return <PartyJoin {...useProps} />;
};
