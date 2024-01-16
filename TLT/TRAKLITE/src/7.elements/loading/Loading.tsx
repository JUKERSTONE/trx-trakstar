import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export const Loading = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: 'transparent',
      }}>
      <ActivityIndicator size="large" color="#00ff00" />
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
};
