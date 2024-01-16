import React from 'react';
import {View, Text} from 'react-native';
import {useProfile} from './useProfile';
import {ProfileElement} from '../../elements';

export const ProfileContainer = ({navigation, route, ...props}: any) => {
  const {...useProfileProps} = useProfile({navigation, route});
  return <ProfileElement {...useProfileProps} {...props} />;
};
