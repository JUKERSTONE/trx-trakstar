import {Platform} from 'react-native';
import {themes} from '../../core';
import {styles} from './Typography.styles';

export const config = (
  fontObject: any,
  type:
    | keyof typeof themes.typography.bheader
    | keyof typeof themes.typography.vheader
    | keyof typeof themes.typography.body
    | keyof typeof themes.typography.caption
    | keyof typeof themes.typography.paragraph,
) => {
  const commonStyles = fontObject[type].common;
  const platformSpecificStyles =
    Platform.OS === 'ios' ? fontObject[type].ios : fontObject[type].android;

  return styles({
    ...commonStyles,
    ...platformSpecificStyles,
  });
};
