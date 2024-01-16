import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalView: {
    height: '90%',
    width: '95%',
    backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  header: {
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  body: {
    flex: 1,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 30,
    padding: 5,
    marginRight: 8,
    borderRadius: 5,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
