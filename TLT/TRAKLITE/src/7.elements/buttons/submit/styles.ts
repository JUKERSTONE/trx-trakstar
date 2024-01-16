import {StyleSheet} from 'react-native';

export const styles = ({backgroundColor = '#fff'}: any) =>
  StyleSheet.create({
    button: {
      backgroundColor,
      padding: 8,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 8,
    },
    text: {
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default styles;
