import {fonts} from './fonts';
import {scale} from './scaling';
import {colors} from './colors';

const {bigShoulders, manrope} = fonts;
const {primary, grey} = colors;
/**
 * Button Theme
 * This function returns either the red or grey shades based on the variant parameter.
 * @param {string} variant - The variant of the Button (either 'primary' or 'secondary').
 * @returns
 */

export const themes = {
  typography: {
    vheader: {
      one: {
        common: {
          fontSize: scale('56px'),
          lineHeight: scale('56px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: bigShoulders.android.bold,
        },
        ios: {
          fontFamily: bigShoulders.ios.generic,
          fontWeight: 'bold',
        },
      },
      two: {
        common: {
          fontSize: scale('2.857rem'),
          lineHeight: scale('40px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: bigShoulders.android.bold,
        },
        ios: {
          fontFamily: bigShoulders.ios.generic,
          fontWeight: 'bold',
        },
      },
      three: {
        common: {
          fontSize: scale('2rem'),
          lineHeight: scale('28px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: bigShoulders.android.bold,
        },
        ios: {
          fontFamily: bigShoulders.ios.generic,
          fontWeight: 'bold',
        },
      },
      four: {
        common: {
          fontSize: scale('1.429rem'),
          lineHeight: scale('20px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: bigShoulders.android['800'],
        },
        ios: {
          fontFamily: bigShoulders.ios.generic,
          fontWeight: '800',
        },
      },
      five: {
        common: {
          fontSize: scale('1rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: bigShoulders.android['800'],
        },
        ios: {
          fontFamily: bigShoulders.ios.generic,
          fontWeight: '800',
        },
      },
      six: {
        common: {
          fontSize: scale('0.8571rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: bigShoulders.android['800'],
        },
        ios: {
          fontFamily: bigShoulders.ios.generic,
          fontWeight: '800',
        },
      },
    },
    bheader: {
      three: {
        common: {
          fontSize: scale('1.714rem'),
          lineHeight: scale('32px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android.bold,
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: 'bold',
        },
      },
      four: {
        common: {
          fontSize: scale('1.429rem'),
          lineHeight: scale('24px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android.bold,
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: 'bold',
        },
      },
      five: {
        common: {
          fontSize: scale('1.143rem'),
          lineHeight: scale('24px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android.bold,
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: 'bold',
        },
      },
    },
    body: {
      one: {
        common: {
          fontSize: scale('1rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android.bold,
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: 'bold',
        },
      },
      two: {
        common: {
          fontSize: scale('0.8571rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android.bold,
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: 'bold',
        },
      },
    },
    paragraph: {
      one: {
        common: {
          fontSize: scale('1rem'),
          lineHeight: scale('24px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android['500'],
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: '500',
        },
      },
      oneB: {
        common: {
          fontSize: scale('1rem'),
          lineHeight: scale('20px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android['500'],
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: '500',
        },
      },
      two: {
        common: {
          fontSize: scale('0.8571rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android['500'],
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: '500',
        },
      },
      three: {
        common: {
          fontSize: scale('0.7857rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0,
        },
        android: {
          fontFamily: manrope.android['500'],
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: '500',
        },
      },
    },
    caption: {
      one: {
        common: {
          fontSize: scale('0.8571rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0.05,
        },
        android: {
          fontFamily: manrope.android.bold,
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: 'bold',
        },
      },
      two: {
        common: {
          fontSize: scale('0.7143rem'),
          lineHeight: scale('16px'),
          letterSpacing: 0.05,
        },
        android: {
          fontFamily: manrope.android.bold,
        },
        ios: {
          fontFamily: manrope.ios.generic,
          fontWeight: 'bold',
        },
      },
    },
  },
  input: {
    dark: {
      default: {
        backgroundColor: grey['700'],
        color: grey['200'],
        labelColor: grey['200'],
        borders: {
          inner: grey['600'],
          outer: null,
        },
      },
      active: {
        backgroundColor: grey['700'],
        color: primary.white,
        labelColor: grey['200'],
        borders: {
          inner: grey['500'],
          outer: grey['650'],
        },
      },
      value: {
        backgroundColor: grey['700'],
        color: primary.white,
        labelColor: grey['200'],
        borders: {
          inner: grey['600'],
          outer: null,
        },
      },
      disable: {
        backgroundColor: grey['700'],
        color: grey['500'],
        labelColor: grey['500'],
        borders: {
          inner: grey['650'],
          outer: null,
        },
      },
      error: {
        backgroundColor: grey['700'],
        color: primary.white,
        labelColor: grey['200'],
        borders: {
          inner: primary.red,
          outer: primary.darker_red,
        },
      },
    },
    light: {
      default: {
        backgroundColor: primary.white,
        color: grey['400'],
        labelColor: grey['400'],
        borders: {
          inner: grey['200'],
          outer: null,
        },
      },
      active: {
        backgroundColor: primary.white,
        color: grey['800'],
        labelColor: grey['400'],
        borders: {
          inner: grey['300'],
          outer: grey['000'],
        },
      },
      value: {
        backgroundColor: primary.white,
        color: grey['800'],
        labelColor: grey[400],
        borders: {
          inner: grey[200],
          outer: null,
        },
      },
      disable: {
        backgroundColor: grey['000'],
        color: grey['300'],
        labelColor: grey['300'],
        borders: {
          inner: grey['200'],
          outer: null,
        },
      },
      error: {
        backgroundColor: primary.white,
        color: grey['800'],
        labelColor: grey['400'],
        borders: {
          inner: primary.red,
          outer: primary.light_red,
        },
      },
    },
    shared: {
      validationErrorColor: primary.red,
    },
  },
};
