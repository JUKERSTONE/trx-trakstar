import React from 'react';
import {View, Text} from 'react-native';
import {SocialElement} from '../../elements';
import {useSocial} from './useSocial';

export const SocialContainer = ({navigation, route, ...props}: any) => {
  const {...useSocialProps} = useSocial({navigation, route});
  return <SocialElement {...useSocialProps} {...props} />;
};
