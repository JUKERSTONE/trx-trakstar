import {fonts} from './fonts';
import {scale} from './scaling';

const {bigShoulders, manrope} = fonts;
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
};
