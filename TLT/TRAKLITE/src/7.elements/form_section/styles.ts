import {StyleSheet} from 'react-native';

interface StyleProps {
  width: number;
}

export const styles = StyleSheet.create({
  label: {
    color: '#292929',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 11,
    paddingBottom: 3,
    paddingLeft: 8,
  },
  input: {
    backgroundColor: '#C4C4C4',
    color: '#4F4F4F',
    borderColor: 'blue',
    fontWeight: '700',
    borderRadius: 5,
    fontSize: 10,
    padding: 5,
  },
});

export default styles;
