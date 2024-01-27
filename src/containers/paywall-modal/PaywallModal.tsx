import React from 'react';
import {View, Text} from 'react-native';
import {PaywallModalElement} from '../../elements';
import {usePaywallModal} from './usePaywallModal';

export const PaywallModalContainer = ({navigation, route, ...props}: any) => {
  const {...usePaywallModalProps} = usePaywallModal({navigation, route});
  return <PaywallModalElement {...usePaywallModalProps} {...props} />;
};
