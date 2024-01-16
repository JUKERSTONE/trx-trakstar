import React from 'react';
import {ProfileTabView} from '../../../7.elements/profile-tab';
import {useInvestment} from '../../../0.app';
import {useProfile} from './useProfile';

export const ProfileView = ({...props}) => {
  const {...useProps} = useProfile(props);
  const {...useInvestmentProps} = useInvestment(props);

  return <ProfileTabView {...useProps} {...useInvestmentProps} />;
};
