import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {VHeader, Body} from '../../elements';

export const FindElement = ({
  provider,
  setText,
  text,
  results,
  handleSubmit,
  handleMatch,
}: any) => {
  console.log('🚀 ~ file: Find.tsx:22 ~ results:', results);

  return (
    <View>
      <View
        style={{
          height: '20%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            height: 40,
            width: '70%',
            backgroundColor: '#cecece',
            borderRadius: 5,
            marginRight: 10,
            padding: 10,
          }}
          onChangeText={text => setText(text)}
        />

        <TouchableOpacity onPress={handleSubmit}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 10,
              backgroundColor: '#1a1a1a',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: '80%', borderTopWidth: 1}}>
        <FlatList
          data={results?.results ?? []}
          style={{height: '80%'}}
          renderItem={({item}) => {
            console.log('🚀 ~ file: Find.tsx:59 ~ item:', item);
            return (
              <TouchableOpacity onPress={() => handleMatch(item)}>
                <View style={{flexDirection: 'row', margin: 10}}>
                  <Image
                    style={{height: 40, width: 40, borderRadius: 8}}
                    source={{uri: item.thumbnails}}
                  />
                  <View style={{justifyContent: 'center', marginLeft: 5}}>
                    <Text style={{fontSize: 10}}>{item.title}</Text>
                    <Text numberOfLines={1} style={{fontSize: 10}}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
