import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {OriginalsElement, TRXPictureInPictureElement} from '../../elements';
import {useTRXPictureInPicture} from './useTRXPictureInPicture';
import {AIMusicElement} from '../../elements/ai-music';

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
