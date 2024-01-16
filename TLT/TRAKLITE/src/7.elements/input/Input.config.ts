import {styles} from './Input.styles';
import {themes} from '../../8.core/themes';

/**
 * Config function
 * @param option the option of the config ('default' | 'active' | 'value' | 'disable' | 'error')
 * @param isDarkMode the mode of the config (boolean)
 * @returns
 */

export const config = (
  option: 'default' | 'active' | 'value' | 'disable' | 'error',
  isDarkMode?: boolean,
  inputHeight = 0,
  backgroundColor?: string,
  color?: string,
) => {
  const theme = isDarkMode
    ? themes.input.dark[option]
    : themes.input.light[option];
  return styles({
    ...theme,
    inputHeight,
    backgroundColor,
    color,
  });
};
