import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';

export const TokencyPicker = ({selectedToken, setSelectedToken}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOKEN</Text>
      </View>
      <Picker
        selectedValue={selectedToken}
        onValueChange={(itemValue, itemIndex) => setSelectedToken(itemValue)}>
        <Picker.Item label="TRX" value="TRX" />
        <Picker.Item label="JKX" value="JKX" />
        <Picker.Item label="PTX" value="PTX" />
      </Picker>
    </View>
  );
};
