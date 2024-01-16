import React from 'react';
import {View, Text, Image, SafeAreaView, Button} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const LibraryElement = ({handlePlay}: any) => {
  return (
    <SafeAreaView>
      <Button title="test spotify SDK" onPress={handlePlay} />
    </SafeAreaView>
  );
};
