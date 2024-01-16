import React from 'react';
import {View, Text} from 'react-native';
import {ProfileEditElement} from '../../elements';
import {useProfileEdit} from './useProfileEdit';

export const ProfileEditContainer = ({navigation, route, ...props}: any) => {
  const {...useProfileEditProps} = useProfileEdit({navigation, route});
  return <ProfileEditElement {...useProfileEditProps} {...props} />;
};
