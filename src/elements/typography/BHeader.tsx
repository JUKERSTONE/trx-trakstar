import React from 'react';
import {Typography, TypographyProps} from './Typography';
import {themes} from '../../core';
import {config} from './Typography.config';

const TYPOGRAPHY_OBJECT = themes.typography.bheader;

export interface BHeaderProps extends Omit<TypographyProps, 'style'> {
  type: keyof typeof TYPOGRAPHY_OBJECT;
}

export const BHeader: React.FC<BHeaderProps> = ({text, type, color, ...t}) => {
  const style = config(TYPOGRAPHY_OBJECT, type);
  return <Typography text={text} style={style.text} color={color} {...t} />;
};
