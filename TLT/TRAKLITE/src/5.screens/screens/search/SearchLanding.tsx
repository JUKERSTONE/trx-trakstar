import React from 'react';
import {View, Text, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SearchView} from '../../../6.containers';

export const SearchLanding = ({handleChange}: any) => {
  return (
    <View style={{flex: 1}}>
      <SearchView />
    </View>
  );
};
