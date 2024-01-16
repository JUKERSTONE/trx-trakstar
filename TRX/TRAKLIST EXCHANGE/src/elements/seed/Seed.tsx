import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from 'react-native';

import {VHeader, Body} from '..';

export const SeedElement = ({
  handleSearchQuery,
  searchResult,
  onPress,
  handleNavigateNext,
}: any) => {
  console.log('🚀 ~ file: Seed.tsx ~ line 22 ~ searchResult', searchResult);
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View style={{height: height, backgroundColor: '#1a1a1a'}}>
      <View>
        <TextInput
          autoCorrect={false}
          placeholder="search for traks"
          style={{
            backgroundColor: '#fff',
            opacity: 0.8,
            padding: 25,
            borderBottomWidth: 3,
            borderBottomColor: 'green',
          }}
          onChangeText={handleSearchQuery}
        />
      </View>
      <View style={{flex: 2}}>
        <FlatList
          data={searchResult}
          // style={{height: '84%'}}
          renderItem={({item}) => {
            // console.log('🚀 ~ file: Seed.tsx ~ line 110 ~ item', item);

            return (
              <Pressable onPress={onPress}>
                <View
                  style={{
                    margin: 10,
                  }}>
                  <View
                    style={{
                      height: 80,
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        marginRight: 20,
                        // backgroundColor: 'blue',
                        flex: 1,
                      }}>
                      <Image
                        source={item.album.images}
                        style={{
                          backgroundColor: '#1B4F26',
                          height: '100%',
                          width: '100%',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <View
                      style={{
                        marginRight: 25,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        maxWidth: '60%',
                      }}>
                      <VHeader
                        numberOfLines={1}
                        type="four"
                        color={'green'}
                        text={item.name}
                      />
                      <Body
                        numberOfLines={1}
                        type="one"
                        color={'green'}
                        text={item.artists[0].name}
                        textAlign="right"
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{backgroundColor: '#fff', opacity: 0.8, flex: 1}}>
        <Button title="next" onPress={handleNavigateNext} />
      </View>
    </View>
  );
};
