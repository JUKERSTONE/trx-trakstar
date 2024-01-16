import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';

export const BernieText = ({name, type, handleChangeText}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={'Enter ' + name}
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};
