import {PixelRatio} from 'react-native';

const ANDROID_BIGSHOULDERS_FONT_NAME = 'BigShouldersDisplay';
const ANDROID_BIGSHOULDERS_REGULAR = `${ANDROID_BIGSHOULDERS_FONT_NAME}-Regular`;
const ANDROID_BIGSHOULDERS_BOLD = `${ANDROID_BIGSHOULDERS_FONT_NAME}-Bold`;

const ANDROID_MANROPE_FONT_NAME = 'Manrope';
const ANDROID_MANROPE_REGULAR = `${ANDROID_MANROPE_FONT_NAME}-Regular`;
const ANDROID_MANROPE_BOLD = `${ANDROID_MANROPE_FONT_NAME}-Bold`;

const IOS_BIGSHOULDERS_FONT_NAME = 'Big Shoulders Display';
const IOS_MANROPE_FONT_NAME = 'Manrope';

export const fonts = {
  bigShoulders: {
    android: {
      generic: ANDROID_BIGSHOULDERS_FONT_NAME,
      200: `${ANDROID_BIGSHOULDERS_FONT_NAME}-ExtraLight`,
      300: `${ANDROID_BIGSHOULDERS_FONT_NAME}-Light`,
      400: ANDROID_BIGSHOULDERS_REGULAR,
      normal: ANDROID_BIGSHOULDERS_REGULAR,
      500: `${ANDROID_BIGSHOULDERS_FONT_NAME}-Medium`,
      600: `${ANDROID_BIGSHOULDERS_FONT_NAME}-SemiBold`,
      700: ANDROID_BIGSHOULDERS_BOLD,
      bold: ANDROID_BIGSHOULDERS_BOLD,
      800: `${ANDROID_BIGSHOULDERS_FONT_NAME}-ExtraBold`,
    },
    ios: {
      generic: IOS_BIGSHOULDERS_FONT_NAME,
    },
  },
  manrope: {
    android: {
      generic: ANDROID_MANROPE_FONT_NAME,
      200: `${ANDROID_MANROPE_FONT_NAME}-ExtraLight`,
      300: `${ANDROID_MANROPE_FONT_NAME}-Light`,
      400: ANDROID_MANROPE_REGULAR,
      normal: ANDROID_MANROPE_REGULAR,
      500: `${ANDROID_MANROPE_FONT_NAME}-Medium`,
      600: `${ANDROID_MANROPE_FONT_NAME}-SemiBold`,
      700: ANDROID_MANROPE_BOLD,
      bold: ANDROID_MANROPE_BOLD,
      800: `${ANDROID_MANROPE_FONT_NAME}-ExtraBold`,
    },
    ios: {
      generic: IOS_MANROPE_FONT_NAME,
    },
  },
};

export const scaleFontSize = (value: number) => {
  // TODO: improve this temporary scaling implementation
  return value * PixelRatio.getFontScale();
};
