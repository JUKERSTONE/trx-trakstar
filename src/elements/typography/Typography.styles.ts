import {StyleSheet} from 'react-native';

export const styles = (props: any) =>
  StyleSheet.create({
    text: {
      fontWeight: props.fontWeight,
      fontSize: props.fontSize,
      fontFamily: props.fontFamily,
      letterSpacing: props.letterSpacing,
    },
  });
