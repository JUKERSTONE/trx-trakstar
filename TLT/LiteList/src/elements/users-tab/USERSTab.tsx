import React from 'react';
import {Button, SafeAreaView, ImageBackground, FlatList} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const USERSTabElement = ({
  users,
  handleUserNavigation,
  usersHits,
  ...props
}: any) => {
  console.log('🚀 ~ file: USERSTab.tsx:15 ~ usersHits:', usersHits);
  console.log(
    '🚀 ~ file: TRAKTab.tsx ~ line 14 ~ TRAKTabElement ~ trak',
    users,
  );

  if (users.length === 0) {
    return <View />;
  }

  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <FlatList
        data={usersHits}
        style={{height: '100%'}}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 3e7 ~ TRAKTabElement ~ item',
            item,
          );
          // const result = item.result;
          return (
            <TouchableOpacity onPress={() => handleUserNavigation(item)}>
              <View style={{flex: 3, flexDirection: 'column', margin: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      margin: 15,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      maxWidth: '70%',
                    }}>
                    <VHeader
                      type="five"
                      color="white"
                      text={item.user_name}
                      textAlign="right"
                    />
                    <Body
                      type="two"
                      color="#cecece"
                      text={item.trak_symbol}
                      textAlign="right"
                    />
                  </View>
                  <Image
                    style={{
                      height: 80,
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }}
                    source={{
                      uri: item.avatarURL,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
