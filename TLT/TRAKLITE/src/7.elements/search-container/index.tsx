import React from 'react';
import {View, TextInput, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ContainerProps {
  handleChange: any;
}

export const SearchContainer: React.FC<ContainerProps> = ({handleChange}) => {
  return (
    <View
      style={{
        backgroundColor: '#cecece',
        height: '35%',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable style={{flex: 1, alignItems: 'center'}}>
        <MaterialIcons name="search" color="#fff" size={25} />
      </Pressable>
      <View style={{flex: 6, padding: 5}}>
        <TextInput onChangeText={handleChange} />
      </View>
    </View>
  );
};

export default SearchContainer;
