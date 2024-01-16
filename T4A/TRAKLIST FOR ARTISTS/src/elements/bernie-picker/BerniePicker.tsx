import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';

export const BerniePicker = ({selectedToken, setSelectedToken, items}: any) => {
  console.log(
    '🚀 ~ file: BerniePicker.tsx ~ line 7 ~ BerniePicker ~ items',
    items,
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TOKEN</Text>
      </View>
      <Picker
        selectedValue={selectedToken}
        onValueChange={(itemValue, itemIndex) => setSelectedToken(itemValue)}>
        <FlatList
          data={items}
          renderItem={(item: any) => {
            const {meta, trak} = item;
            console.log(
              '🚀 ~ file: BerniePicker.tsx ~ line 21 ~ BerniePicker ~ item',
              item,
            );
            return <Picker.Item label={item.label} value={item.value} />;
          }}
          keyExtractor={(item: any, index: any) => '' + index}
        />
      </Picker>
    </View>
  );
};
