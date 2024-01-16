import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TRXPictureInPictureElement} from '../../elements';
import {useTRXPictureInPicture} from './useTRXPictureInPicture';

export const TRXPictureInPictureContainer = ({
  query = '',
  navigation,
  modal,
  item,
  isTraklist,
  ...props
}: any) => {
  const {...useTRXProps} = useTRXPictureInPicture({isTraklist});
  return <TRXPictureInPictureElement {...useTRXProps} />;
};
