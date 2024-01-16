import React from 'react';
import {View, Text} from 'react-native';

export default function index() {
  return (
    <>
      <View style={{flex: 2, backgroundColor: 'blue', padding: 10}}>
        <Text>Trending Searches</Text>
      </View>
      <View style={{flex: 3, backgroundColor: 'yellow', padding: 10}}>
        <Text>Search History</Text>
      </View>
    </>
  );
}
