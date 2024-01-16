import React from 'react';
import useCaptionSet from './useCaptionSet';
import SetCaption from '../../../7.elements/set-caption';
import {profile} from 'console';

interface CaptionSetProps {
  navigation: any;
  route: any;
}

export const CaptionSetView: React.FC<CaptionSetProps> = ({
  navigation,
  route,
}) => {
  const {...useProps} = useCaptionSet(navigation);
  const {...navProps} = route.params.content;
  const {username, profile_picture} = route.params.user;

  return (
    <SetCaption
      {...navProps}
      {...useProps}
      navigation={navigation}
      username={username}
      profile={profile_picture}
    />
  );
};
