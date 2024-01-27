import React from 'react';
import {View, Text} from 'react-native';
import {RSSOfficialChartsElement} from '../../elements';
import {useRSSOfficialCharts} from './useRSSOfficialCharts';

export const RSSOfficialChartsContainer = ({...props}: any) => {
  const {...usRSSBillboardProps} = useRSSOfficialCharts({...props});
  return <RSSOfficialChartsElement {...usRSSBillboardProps} {...props} />;
};
