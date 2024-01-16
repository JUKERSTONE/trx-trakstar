import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body} from '../typography';

export const AddMerchandiseElement = ({
  item,
  handleAddMerchandise,
  handleUploadImage,
  handleMerchandiseValueInput,
  handleMerchandiseCopiesInput,
  handleMerchandiseTitleInput,
}: any) => {
  console.log(
    '🚀 ~ file: NFTDashboard.tsx ~ line 20 ~ NFTDashboardElement ~ item',
    item,
  );
  return (
    <SafeAreaView style={{backgroundColor: '#cecece', flex: 1}}>
      {/*  */}
      <Text>Add Merchandise</Text>
      <TextInput
        placeholder="Merchandise Title"
        onChangeText={handleMerchandiseTitleInput}
      />
      <Button title="upload image" onPress={handleUploadImage} />
      <TextInput
        placeholder="Merchandise Value"
        onChangeText={handleMerchandiseValueInput}
      />
      <TextInput
        placeholder="Number of Merchandise Copies "
        onChangeText={handleMerchandiseCopiesInput}
      />
      <Button title="add" onPress={handleAddMerchandise} />
    </SafeAreaView>
  );
};
