import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  search: {
    marginTop: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    // minheight: 45,
    borderRadius: 5,
  },
  iconContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  inputContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 5,
  },
  input: {
    paddingTop: 10,
    backgroundColor: 'transparent',
    fontWeight: '600',
    width: '100%',
    height: 40,
    color: 'grey',
  },
});

export default styles;
