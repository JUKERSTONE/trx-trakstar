import React from 'react';
import {
  TextInput,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, TouchableOpacity} from 'react-native';
import {VHeader, Body, Caption, BHeader} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-toast-message';

export const ShopElement = ({collection, handleProduct}: any) => {
  console.log('🚀 ~ file: Shop.tsx:19 ~ ShopElement ~ collection:', collection);
  return (
    <View>
      <FlatList
        numColumns={2}
        data={collection}
        renderItem={({item, index}) => {
          console.log('🚀 ~ file: Shop.tsx:71 ~ ShopElement ~ item:', item);

          return (
            <TouchableOpacity onPress={() => handleProduct({item})}>
              <ImageBackground
                source={{uri: item.images[0]}}
                imageStyle={{borderRadius: 10}}
                style={{
                  height: 130,
                  width: 130,
                  margin: 10,
                  borderRadius: 10,
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
                    {item.product}
                  </Text>
                  <Text
                    style={{color: '#cecece', fontWeight: 'bold'}}
                    numberOfLines={1}>
                    {item.brand ?? item.artist}
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
