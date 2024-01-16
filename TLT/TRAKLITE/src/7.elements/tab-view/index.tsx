import React from 'react';
import {View, Text, Pressable} from 'react-native';

export default function TabView({tabs, handleTabChange}: any) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'blue',
        padding: 10,
      }}>
      {tabs.map((tab: any, key: any) => (
        <Pressable
          onPress={() => handleTabChange('tracks')}
          style={{
            backgroundColor: tab.name === 'tracks' ? 'red' : 'transparent',
          }}>
          <Text>Tracks</Text>
        </Pressable>
      ))}
    </View>
  );
}
