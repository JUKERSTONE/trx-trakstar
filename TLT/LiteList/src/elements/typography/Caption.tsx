import React from 'react';
import {Typography, TypographyProps} from './Typography';
import {themes} from '../../core';
import {config} from './Typography.config';

const TYPOGRAPHY_OBJECT = themes.typography.caption;

export interface CaptionProps extends Omit<TypographyProps, 'style'> {
  type: keyof typeof TYPOGRAPHY_OBJECT;
}

export const Caption: React.FC<CaptionProps> = ({text, type, color, ...t}) => {
  const style = config(TYPOGRAPHY_OBJECT, type);
  return <Typography text={text} style={style.text} color={color} {...t} />;
};
