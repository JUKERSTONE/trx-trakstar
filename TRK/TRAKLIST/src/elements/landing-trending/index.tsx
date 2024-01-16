import React from 'react';
import {View, Image, FlatList, Pressable, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, Body, BHeader, Paragraph, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import MasonryList from '@react-native-seoul/masonry-list';
import {content} from '../../core';

interface TLandingTrending {
  handleNavigateCollection: any;
}

export const LandingTrending: React.FC<TLandingTrending> = ({
  handleNavigateCollection,
}: any) => {
  return (
    <View style={{flex: 1}}>
      <MasonryList
        data={content}
        keyExtractor={(item): string => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: any) => {
          console.log('🚀 ~ file: index.tsx:26 ~ item:', item);
          return (
            <Pressable onPress={() => handleNavigateCollection(item)}>
              <View
                style={{
                  backgroundColor: '#232323',
                  opacity: 0.8,
                  margin: 10,
                  padding: 5,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name={item.icon}
                  size={30}
                  color={'#fff'}
                  style={{marginRight: 5}}
                />
                <VHeader
                  numberOfLines={1}
                  type="six"
                  color={'#cecece'}
                  text={item.name}
                />
              </View>
            </Pressable>
          );
        }}
        // refreshing={isLoadingNext}
        // onRefresh={() => refetch({first: ITEM_CNT})}
        onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)}
      />
    </View>
  );
};
