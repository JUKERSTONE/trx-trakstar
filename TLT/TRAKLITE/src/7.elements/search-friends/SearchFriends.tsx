import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Input} from '../input';
import Card from '../cards/last-played';
import moment from 'moment';

export const SearchFriends = ({setQuery, users, handlePopModal}: any) => {
  return (
    <View
      style={{
        backgroundColor: '#1a1a1a',
        height: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 400,
      }}>
      <View style={{marginBottom: 15}}>
        <Input
          option="default"
          label="FIND FRIENDS..."
          inputHeight={50}
          onChangeText={(text: string) => setQuery(text)}
          backgroundColor="#fff"
          opacity={0.8}
        />
      </View>

      <FlatList
        style={{
          backgroundColor: 'transparent',
          width: '100%',
          minHeight: 600,
          paddingHorizontal: 40,
        }}
        data={users}
        renderItem={({item}: any) => (
          <View style={{marginBottom: 15}}>
            <Card
              type="profile"
              color={'#fff'}
              title={item.username}
              artist={moment(item.createdAt).fromNow()}
              artwork={item.image}
              handleView={() => handlePopModal(item)}
            />
          </View>
        )}
        // showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => '' + index}
        listKey="SearchFriends"
      />
    </View>
  );
};
