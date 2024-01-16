import React from 'react';
import {View, Text, TextInput, TouchableHighlight} from 'react-native';
import {styles} from './styles';

export const TokencyAction = ({name, disabled, handleAction}: any) => {
  return (
    <TouchableHighlight
      onPress={handleAction}
      disabled={disabled}
      style={styles.container}>
      <Text style={{color: '#000', fontWeight: 'bold', fontSize: 15}}>
        {name}
      </Text>
    </TouchableHighlight>
  );
};
