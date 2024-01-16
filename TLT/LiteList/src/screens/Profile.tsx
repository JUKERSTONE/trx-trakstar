import React from 'react';
import {View, Text} from 'react-native';

import {ProfileContainer} from '../containers';

export const ProfileScreen = ({...props}) => {
  return <ProfileContainer isOwner {...props} />;
};
