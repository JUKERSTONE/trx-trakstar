import React from 'react';
import {View, Text} from 'react-native';
import {TRXRequestsElement} from '../../elements';
import {useTRXRequests} from './useTRXRequests';

export const TRXRequestsContainer = ({navigation, route, ...props}: any) => {
  const {...useRecordsProps} = useTRXRequests({navigation, route});
  return <TRXRequestsElement {...useRecordsProps} {...props} />;
};
