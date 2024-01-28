import React, {FC} from 'react';
import {View, TouchableOpacity, FlatList, Button} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';

export const AdminElement = ({
  handleTestStream,
}: {
  handleTestStream: () => void;
}) => {
  return (
    <View>
      <Button title="Test Stream" onPress={handleTestStream} />
    </View>
  );
};
