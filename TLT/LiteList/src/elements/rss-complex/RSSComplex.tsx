import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {TRAKCard} from '../trak-card/TRAKCard';
import {VHeader} from '../typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';

export const RSSComplexElement = ({handleNavigateWebsite, route}: any) => {
  const complexRSS = useSelector((state: any) => state.rss.complex);
  console.log(
    '🚀 ~ file: RSSComplex.tsx:21 ~ RSSComplexElement ~ complexRSS:',
    complexRSS,
  );

  if (!complexRSS) return <View />;

  const renderItem = ({item}: any) => {
    console.log('🚀 ~ file: RSSComplex.tsx:30 ~ renderItem ~ item:', item);
    return (
      <TouchableOpacity onPress={() => handleNavigateWebsite(item.id)}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            width: 300,
          }}>
          <Image
            source={{uri: item.enclosures[0].url}}
            style={{
              height: 100,
              width: 100,
              borderRadius: 10,
              backgroundColor: '#cecece',
            }}
          />
          <View
            style={{
              marginTop: 5,
              paddingHorizontal: 7,
              flex: 1,
            }}>
            <VHeader
              numberOfLines={2}
              type="six"
              color={'#1db954'}
              text={item.title}
            />
            <VHeader
              numberOfLines={3}
              type="six"
              color={'#cecece'}
              text={item.description}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 10,
          // width: '50%',
          padding: 20,
          paddingVertical: 8,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            marginRight: 10,
            // backgroundColor: '#1db954',
            borderRadius: 20,
            padding: 4,
          }}>
          <MaterialCommunityIcons
            name="newspaper-variant-outline"
            size={18}
            color={'#fff'}
          />
        </View>
        <VHeader type="five" color="#fff" text={'COMPLEX LATEST'} />
      </View>
      <Carousel
        data={complexRSS}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={300}
        firstItem={3}
      />
    </>
  );
};
