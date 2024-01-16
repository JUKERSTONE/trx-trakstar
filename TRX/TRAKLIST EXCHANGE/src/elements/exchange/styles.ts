import {StyleSheet} from 'react-native';
import {colors} from '../../core';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
    padding: 20,
    borderBottomRightRadius: 15,
    borderBottomColor: '#fff',
    backgroundColor: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#cecece',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 15,
    borderBottomColor: '#cecece',
    borderBottomWidth: 1,
  },
  title: {
    color: '#232323',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputWrapper: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: 'whitesmoke',
    padding: 15,
    borderRadius: 6,
  },
});
