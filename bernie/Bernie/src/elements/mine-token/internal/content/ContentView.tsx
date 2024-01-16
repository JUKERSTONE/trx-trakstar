import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export const ContentView = ({TRAKCollection, handleSeed}: any) => {
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'space-around',
      }}>
      <FlatList
        listKey="TRAK"
        contentContainerStyle={{
          paddingBottom: 400,
          paddingTop: 5,
          alignItems: 'center',
          justifyContent: 'space-around',
          // backgroundColor: '#cecece',
          borderRadius: 20,
        }}
        numColumns={2}
        data={TRAKCollection}
        renderItem={({item, index}) => {
          const {meta, trak} = item;
          return (
            <TouchableOpacity onPress={() => handleSeed({item})}>
              <ImageBackground
                source={{uri: trak?.thumbnail}}
                imageStyle={{borderRadius: 10}}
                style={{
                  height: 150,
                  width: 150,
                  margin: 10,
                  borderRadius: 10,
                  backgroundColor: 'blue',
                  justifyContent: 'flex-end',
                }}>
                <View
                  style={{
                    height: '30%',
                    backgroundColor: '#1a1a1a',
                    opacity: 0.8,
                    borderRadius: 10,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Text style={{color: '#cecece'}} numberOfLines={1}>
                    {trak?.title}
                  </Text>
                  <Text
                    style={{color: '#cecece', fontWeight: 'bold'}}
                    numberOfLines={1}>
                    {trak?.artist}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
