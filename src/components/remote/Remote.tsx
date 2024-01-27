import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useLITELISTState} from '../../app';
import {RemoteContainer} from '../../containers';

export const RemoteComponent = ({...props}) => {
  return <RemoteContainer {...props} />;
};
