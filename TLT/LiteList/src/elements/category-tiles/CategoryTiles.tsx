import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {Caption, VHeader} from '../typography';
import FastImage from 'react-native-fast-image';

export const CategoryTilesElement = ({
  categories,
  handleNavigateExplorer,
}: any) => {
  return (
    <View style={{padding: 10}}>
      <View style={{marginBottom: 10}}>
        <VHeader
          numberOfLines={1}
          type="four"
          color={'#fff'}
          text={"Shop TRAKSTAR's selction..."}
        />
      </View>
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        numColumns={3}
        data={categories}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                handleNavigateExplorer({selectedCategoryIndex: index})
              }>
              <View
                style={{
                  height: 100,
                  width: 100,
                  margin: 10,
                  borderRadius: 10,
                }}>
                <View style={{flex: 2}}>
                  <FastImage
                    style={{flex: 1, borderRadius: 10}}
                    source={{
                      uri: item.thumbnail,
                      priority: FastImage.priority.high,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 3,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  <Caption
                    numberOfLines={1}
                    type="two"
                    color={'#1db954'}
                    text={item.category.toUpperCase()}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
