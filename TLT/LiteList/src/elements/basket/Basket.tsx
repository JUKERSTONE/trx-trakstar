import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {VHeader, Body, Caption} from '../typography';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProgressBar, Colors, ActivityIndicator} from 'react-native-paper';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TRAKCard} from '../trak-card/TRAKCard';
import LottieView from 'lottie-react-native';

export const BasketElement = ({
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}: any) => {
  const {basket} = useSelector((state: any) => state.checkout);
  console.log('🚀 ~ file: Basket.tsx:25 ~ BasketElement ~ basket:', basket);

  if (basket.length === 0)
    return (
      <LottieView
        source={require('../../core/106964-shake-a-empty-box.json')}
        autoPlay
        loop
      />
    );

  return (
    <FlatList
      listKey="TRAK"
      data={basket}
      style={{flex: 1}}
      renderItem={({item, index}) => {
        console.log('🚀 ~ file: Basket.tsx:88 ~ BasketElement ~ item:', item);

        return (
          <View style={{flexDirection: 'row', paddingLeft: 5}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#232323',
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}
                onPress={() => handleDecreaseQuantity({basketLine: item})}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>-</Text>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#cecece',
                  width: 23,
                  height: 23,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{item.quantity}</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#232323',
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={() => handleIncreaseQuantity({basketLine: item})}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 5}}>
              <TRAKCard
                artwork={item.variant.imageUrls[0]}
                artist={item.product.name}
                isDynamic
                colors={{background: '#fff'}}
                title={item.product.brand}
                detail1={item.variant.name}
                detail2={item.variant.amount + 'GBP'}
              />
            </View>
          </View>
        );
      }}
      keyExtractor={(item, index) => '' + index}
    />
  );
};
