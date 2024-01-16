import React, {FC} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {PartyStart} from '../../../7.elements/party-start';
import {usePartyStart} from './usePartyStart';

export const PartyStartView = ({...props}) => {
  const {...useProps} = usePartyStart(props);
  return <PartyStart {...useProps} />;
};
