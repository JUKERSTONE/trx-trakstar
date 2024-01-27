import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';

export const RSSPitchforkElement = ({handleSourceNavigation}: any) => {
  {
    const categories = [
      {
        source: 'pitchfork_news',
        feed: 'https://pitchfork.com/news/',
      },
      {
        source: 'pitchfork_albums',
        feed: 'https://pitchfork.com/reviews/albums/',
      },
    ];
    return (
      <View style={{flex: 1}}>
        <FlatList
          // numColumns={2}
          data={categories}
          style={{
            flex: 1,
          }}
          scrollEnabled
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
          // numColumns={3}
          renderItem={({item, index}: any) => {
            console.log('🚀 ~ file: Profile.tsx ~ line 251 ~ item', item);
            const type = item.info;
            return (
              <TouchableHighlight
                onPress={() => handleSourceNavigation({item})}>
                <View
                  style={{
                    height: 130,
                    width: 170,
                    backgroundColor: 'red',
                    margin: 10,
                  }}>
                  <Text>{item.source}</Text>
                </View>
              </TouchableHighlight>
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    );
  }
};
