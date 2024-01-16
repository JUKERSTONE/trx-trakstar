import React from 'react';
import {Text, TextStyle} from 'react-native';

export interface TypographyProps {
  text: string;
  style: any;
  numberOfLines?: number;
  color?: TextStyle['color'];
  textAlign?: TextStyle['textAlign'];
  textDecorationLine?: TextStyle['textDecorationLine'];
}

export const Typography: React.FC<TypographyProps> = ({
  text,
  style,
  color,
  textAlign,
  textDecorationLine,
  numberOfLines = 0,
}) => {
  return (
    <Text
      selectable
      style={[style, {color, textAlign, textDecorationLine}]}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};
