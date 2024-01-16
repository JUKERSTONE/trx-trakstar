import React from 'react';
import {ProfileHeader} from '../../../7.elements/profile-header';
import {useProfileHeader} from './useUserProfileHeader';

interface TProfileHeaderView {
  userProfile?: any;
}

export const UserProfileHeaderView: React.FC<TProfileHeaderView> = ({
  ...props
}) => {
  const {...useProps} = useProfileHeader(props);
  return <ProfileHeader {...useProps} {...props} />;
};
