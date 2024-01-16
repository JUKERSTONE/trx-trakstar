import React from 'react';
import {View} from 'react-native';
import {UserProfileTabView} from '../../../7.elements/user-profile-tab';
import {useUserProfile} from './useUserProfile';

export const UserProfileView = ({...props}) => {
  console.log(
    '🚀 ~ file: UserProfile.tsx ~ line 7 ~ UserProfileView ~ props',
    props.userProfile,
  );

  const {...useProps} = useUserProfile(props);
  return <UserProfileTabView {...useProps} {...props} />;
  // return <View />;
};
