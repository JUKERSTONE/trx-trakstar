import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const SCALE_BASE = height < width ? height : width;
const GUIDELINE_BASE =
  height < width ? guidelineBaseHeight : guidelineBaseWidth;
const FONT_SCALE_FACTOR = SCALE_BASE / GUIDELINE_BASE;
const DEFAULT_FONT_SIZE = 14 * FONT_SCALE_FACTOR;

const REM_REGEX = /[\d.]+rem/;
const PX_REGEX = /[\d.]+px/;
const NUM_REGEX = /[\d.]+/;

const getRegexNumber = (text: string) => {
  const regexRes = NUM_REGEX.exec(text);
  return regexRes ? Number(regexRes[0]) : undefined;
};

export const scale = (size: string | number | undefined) => {
  if (typeof size === 'string') {
    if (REM_REGEX.test(size)) {
      const num = getRegexNumber(size);
      return num ? DEFAULT_FONT_SIZE * num : undefined;
    }
    if (PX_REGEX.test(size)) {
      const num = getRegexNumber(size);
      return num ? DEFAULT_FONT_SIZE * (num / 14) : undefined;
    }
    throw new Error('Non supported format');
  } else if (typeof size === 'number') {
    return FONT_SCALE_FACTOR * size;
  }
  return undefined;
};

/**
 * https://github.com/nirsky/react-native-scaling-example
 */

/**
 *
 * For scaling widths
 *
 */
const scaleTemp = (size: number) => (width / guidelineBaseWidth) * size;

export const moderateScale = (size: number, factor = 0.25) =>
  size + (scaleTemp(size) - size) * factor;
