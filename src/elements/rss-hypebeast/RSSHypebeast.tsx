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
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

export const RSSHypebeastElement = ({handleSourceNavigation}: any) => {
  {
    const categories = [
      {
        source: 'hypebeast_fashion',
        feed: 'https://hypebeast.com/fashion',
      },
      {
        source: 'hypebeast_footwear',
        feed: 'https://hypebeast.com/footwear',
      },
      {
        source: 'hypebeast_tech',
        feed: 'https://hypebeast.com/tech',
      },
      {
        source: 'hypebeast_arts',
        feed: 'https://hypebeast.com/arts',
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
