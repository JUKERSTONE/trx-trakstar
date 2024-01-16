import React from 'react';
import {ProfileHeader} from '../../../7.elements/profile-header';
import {useProfileHeader} from './useProfileHeader';

interface TProfileHeaderView {}

export const ProfileHeaderView: React.FC<TProfileHeaderView> = () => {
  const {...useProps} = useProfileHeader();
  return <ProfileHeader {...useProps} />;
};
