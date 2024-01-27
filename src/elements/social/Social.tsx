import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  Alert,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {VHeader, Paragraph, BHeader} from '../typography';

// @ts-ignore
import StickyItemFlatList from '@gorhom/sticky-item';

export const SocialElement = ({
  data,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  STICKY_ITEM_WIDTH,
  STICKY_ITEM_HEIGHT,
  STICKY_ITEM_BACKGROUNDS,
  SEPARATOR_SIZE,
  BORDER_RADIUS,
  handleStoryOption,
  social,
}: any) => {
  console.log('🚀 ~ file: Social.tsx ~ line 29 ~ social', social);
  const handleStickyItemPress = () => Alert.alert('Sticky Item Pressed');

  const StickyItemView = ({
    x,
    threshold,
    itemWidth,
    itemHeight,
    stickyItemWidth,
    stickyItemHeight,
    separatorSize,
    isRTL,
  }: any) => {
    const amazingAnimation = {
      backgroundColor: '#1a1a1a',
      width: 80,
      height: 80,
      alignSelf: 'center',
      borderRadius: 10,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginLeft: 10,
      // here you add your custom interactive animation
      // based on the animated value `x`
    };

    if (social.length === 0) {
      return <View />;
    }

    return (
      <View>
        <View style={{marginLeft: 10, marginBottom: 5, alignItems: 'center'}}>
          <VHeader
            numberOfLines={1}
            type="five"
            color={'#fff'}
            text={'STORIES'}
          />
        </View>
        <TouchableOpacity onPress={handleStoryOption}>
          <Animated.View style={amazingAnimation}>
            {/* <Text>wfce</Text> */}
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}: any) => (
    <View
      style={{
        alignSelf: 'center',
      }}>
      <View
        key={`item-${index}`}
        style={{
          backgroundColor: '#cecece',
          width: ITEM_WIDTH,
          height: '50%',
          borderRadius: 10,
        }}>
        {/* <Text>ee</Text> */}
      </View>
      <View style={{margin: 5, alignItems: 'flex-end'}}>
        {/* <Text style={{textAlign: 'right'}}>USER</Text> */}
        <BHeader numberOfLines={1} type="five" color={'#fff'} text={'USER'} />
      </View>
    </View>
  );

  return (
    <ScrollView style={{backgroundColor: '#1a1a1a'}}>
      <SafeAreaView
        style={{
          flex: 1,
          height: 160,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#333333',
          borderBottomWidth: 0.8,
          borderBottomColor: 'whitesmoke',
        }}>
        <StickyItemFlatList
          itemWidth={ITEM_WIDTH}
          itemHeight={ITEM_HEIGHT}
          separatorSize={SEPARATOR_SIZE}
          borderRadius={BORDER_RADIUS}
          stickyItemWidth={STICKY_ITEM_WIDTH}
          stickyItemHeight={STICKY_ITEM_HEIGHT}
          stickyItemBackgroundColors={STICKY_ITEM_BACKGROUNDS}
          stickyItemContent={StickyItemView}
          onStickyItemPress={handleStickyItemPress}
          data={data}
          renderItem={renderItem}
        />
      </SafeAreaView>
      <View style={{height: 250}}>
        <View style={{marginLeft: 20, marginTop: 10}}>
          <VHeader
            numberOfLines={1}
            type="four"
            color={'#fff'}
            text={'SUBSCRIPTIONS'}
          />
        </View>
        <FlatList
          horizontal
          data={[0, 0, 0, 0]}
          renderItem={({item, index}: any) => {
            return (
              <View
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                  margin: 10,
                  width: 159,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Text>fe</Text> */}
              </View>
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
      <View style={{height: '100%'}}>
        <View style={{marginLeft: 20, marginTop: 5}}>
          <VHeader
            numberOfLines={1}
            type="four"
            color={'#fff'}
            text={'DISCOVER'}
          />
        </View>
        <FlatList
          // horizontal
          data={[0, 0, 0, 0, 0, 0, 0, 0]}
          numColumns={3}
          renderItem={({item, index}: any) => {
            return (
              <View
                style={{
                  backgroundColor: '#fff',
                  flex: 1,
                  margin: 10,
                  width: 100,
                  height: 160,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Text>fe</Text> */}
              </View>
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    </ScrollView>
  );
};
