import React, {FC, useState} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {Caption, Paragraph, VHeader} from '../typography';

export const HorizontalCategoriesElement = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: any) => {
  return (
    <FlatList
      data={categories}
      horizontal={true}
      // keyExtractor={category => category.id}
      // onScrollToIndexFailed={onScrollToIndexFailed}
      showsHorizontalScrollIndicator={false}
      // ref={flatListRef}
      style={{
        backgroundColor: '#cecece',
        padding: 0,
        height: 35,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      }}
      renderItem={({item, index}) => (
        <Pressable onPress={() => setSelectedCategory({category: item, index})}>
          <View
            style={{
              marginRight: 10,
              backgroundColor: 'transparent',
              // padding: 5,
              borderRadius: 10,
              // height: 35,
              justifyContent: 'center',
            }}>
            <Paragraph
              type="three"
              color={selectedCategory.category === item ? '#1db954' : '#1a1a1a'}
              text={item}
            />
          </View>
        </Pressable>
      )}
    />
  );
};
