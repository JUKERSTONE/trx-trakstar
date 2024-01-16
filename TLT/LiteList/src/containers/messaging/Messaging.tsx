import React from 'react';
import {View, Text} from 'react-native';
import {useMessaging} from './useMessaging';
import {MessagingElement} from '../../elements';

export const MessagingContainer = ({navigation, route, ...props}: any) => {
  const {...useMessagingProps} = useMessaging({navigation, route});
  return <MessagingElement {...useMessagingProps} {...props} />;
};
