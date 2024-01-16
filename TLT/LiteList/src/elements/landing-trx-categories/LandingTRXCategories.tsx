import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body, Paragraph, Caption, BHeader} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {generateChatResponse} from '../../app/ChatGPTService';

export const LandingTRXCategoriesElement = ({data, style, ...props}: any) => {
  return (
    <FlatList
      horizontal
      // scrollEnabled={false}
      // listKey="TRAK98"
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: '#1a1a1a', marginTop: 11, ...style}}
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            item.title !== 'TRX-00'
              ? props.navigation.navigate(item.navigationPath)
              : async () => {
                  const prompt = 'traklist: Chill_Amapiano: [chill, vibrant]';
                  try {
                    const response = await generateChatResponse(prompt);
                    console.log('Generated response:', response);
                    // Use the response in your app
                  } catch (error) {
                    console.error('Error getting chat response:', error);
                  }
                }
          }>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              alignItems: 'center',
              backgroundColor: '#9D44B5',
              borderRadius: 8,
              // borderBottomRightRadius: 8,
              borderWidth: 1.5,
              borderColor: '#fff',
              height: 28,
              width: 155,
            }}>
            <Image
              source={{uri: item.image}}
              style={{
                height: 25,
                width: 30,
                marginRight: 5,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              }}
            />
            <Caption type="two" color={'#F5EFED'} text={'ChatGPT soon come'} />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
