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

export const HorizontalSubCategoriesElement = ({
  subCategories,
  selectedCategory,
  setSelectedSubCategory,
}: any) => {
  return (
    <FlatList
      data={subCategories}
      horizontal={true}
      // keyExtractor={category => category.id}
      // onScrollToIndexFailed={onScrollToIndexFailed}
      showsHorizontalScrollIndicator={false}
      // ref={flatListRef}
      style={{backgroundColor: '#fff', height: 30, padding: 0}}
      renderItem={({item}) => (
        <Pressable onPress={() => setSelectedSubCategory(item)}>
          <View
            style={{
              marginHorizontal: 10,
              backgroundColor:
                selectedCategory === item ? '#1a1a1a' : 'transparent',
              padding: 5,
              borderRadius: 5,
            }}>
            <Caption
              type="two"
              color={selectedCategory === item ? '#fff' : '#1a1a1a'}
              text={item}
            />
          </View>
        </Pressable>
      )}
    />
  );
};
