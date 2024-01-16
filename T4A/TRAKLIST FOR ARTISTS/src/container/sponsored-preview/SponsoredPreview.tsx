import React from 'react';
import {View, Text} from 'react-native';
import {SponsoredPreviewElement} from '../../elements';
import {useSponsoredPreview} from './useSponsoredPreview';

export const SponsoredPreviewContainer = ({...props}: any) => {
  const {...useSponsoredPreviewProps} = useSponsoredPreview(props);
  return <SponsoredPreviewElement {...useSponsoredPreviewProps} {...props} />;
};
