import React from 'react';
import {View, Text} from 'react-native';
import {SponsoredSettingsElement} from '../../elements';
import {useSponsoredSettings} from './useSponsoredSettings';

export const SponsoredSettingsContainer = ({...props}: any) => {
  const {...useSponsoredSettingsProps} = useSponsoredSettings(props);
  return <SponsoredSettingsElement {...useSponsoredSettingsProps} {...props} />;
};
