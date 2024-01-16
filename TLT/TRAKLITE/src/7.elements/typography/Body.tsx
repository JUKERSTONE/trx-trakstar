import React from 'react';
import {Typography, TypographyProps} from './Typography';
import {themes} from '../../8.core/themes';
import {config} from './Typography.config';

const TYPOGRAPHY_OBJECT = themes.typography.body;

export interface BodyProps extends Omit<TypographyProps, 'style'> {
  type: keyof typeof TYPOGRAPHY_OBJECT;
}

export const Body: React.FC<BodyProps> = ({text, type, color, ...t}) => {
  const style = config(TYPOGRAPHY_OBJECT, type);
  return <Typography text={text} style={style.text} color={color} {...t} />;
};
