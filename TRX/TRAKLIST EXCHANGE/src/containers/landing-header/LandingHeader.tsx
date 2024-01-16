import React from 'react';
import {View, Text} from 'react-native';
import {LandingHeader} from '../../elements';
import {useLandingHeader} from './useLandingHeader';

export const LandingHeaderView = ({
  navigation,
  handleSearchQuery,
  ...props
}: any) => {
  console.log(
    '🚀 ~ file: LandingHeader.tsx ~ line 11 ~ navigation',
    navigation,
  );
  const {...useHeaderProps} = useLandingHeader({navigation});
  return (
    <LandingHeader
      handleSearchQuery={handleSearchQuery}
      {...props}
      {...useHeaderProps}
    />
  );
};
