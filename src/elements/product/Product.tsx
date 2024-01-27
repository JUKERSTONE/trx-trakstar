import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {VHeader, Body, Caption, Paragraph} from '../typography';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProgressBar, Colors, ActivityIndicator} from 'react-native-paper';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Fontisto from 'react-native-vector-icons/Fontisto';

export const ProductElement = ({
  product,
  handlePurchaseProduct,
  handleNavigateBakset,
  handleUpdateBasket,
  activeVariant,
  handleVariant,
  handleAddToBasket,
}: any) => {
  console.log('🚀 ~ file: Product.tsx:11 ~ ProductElement ~ item:', product);
  const [imagesInit, setImagesInit] = useState(false);
  // const [selectedSize, setSelectedSize] = useState(
  //   item?.sizes ? item?.sizes[0] : item?.format[0],
  // );

  useEffect(() => {
    setTimeout(() => {
      setImagesInit(true);
    }, 1000);
  });

  return (
    <ParallaxScrollView
      backgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={150}
      renderForeground={() => (
        <View>
          {imagesInit ? (
            <Carousel
              // layout={'stack'}
              // layoutCardOffset={30}
              data={activeVariant.imageUrls}
              renderItem={({item}: any) => {
                console.log('🚀 ~ file: Product.tsx:55 ~ item:', item);

                return (
                  <Image
                    style={{
                      height: 250,
                      width: '100%',
                      marginTop: 3,
                      borderRadius: 8,
                    }}
                    source={{
                      uri: item,
                    }}
                  />
                );
              }}
              sliderWidth={Dimensions.get('screen').width}
              itemWidth={Dimensions.get('screen').width * 0.75}
            />
          ) : (
            <View
              style={{
                height: 250,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="primary" />
            </View>
          )}
        </View>
      )}>
      <View style={{margin: 15}}>
        <View style={{marginBottom: 10}}>
          <VHeader type="three" color="#232323" text={product.name} />
          <Caption type="one" color="#cecece" text={product.brand} />
        </View>

        <View>
          {product.variants.map((variant: any) => (
            <Pressable onPress={() => handleVariant({name: variant.name})}>
              <View
                style={{
                  padding: 10,
                  backgroundColor:
                    activeVariant.id == variant.id ? '#1db954' : '#1a1a1a',
                  alignSelf: 'flex-start',
                  borderRadius: 5,
                }}>
                <Caption type="one" color="#fff" text={variant.name} />
              </View>
            </Pressable>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <VHeader
            type="four"
            color="#1a1a1a"
            text={activeVariant.amount + ' GBP'}
          />
          <Pressable onPress={() => handleAddToBasket({product})}>
            <View
              style={{
                marginRight: 5,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#cecece',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 5,
              }}>
              <VHeader type="four" color="#1a1a1a" text={'ADD'} />
              <VHeader type="three" color="#1a1a1a" text={'+'} />
            </View>
          </Pressable>
        </View>

        <Paragraph type="three" color="#1a1a1a" text={product.description} />

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={{
              height: 60,
              // width: '100%',
              flex: 1,
              backgroundColor: 'green',
              margin: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
            }}
            onPress={handlePurchaseProduct}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Entypo name="shopping-basket" size={35} color={'#fff'} />
            </View>
            <View style={{flex: 2, paddingLeft: 15}}>
              <VHeader type="four" color="#fff" text={'Purchase now!'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 60,
              flex: 1,
              backgroundColor: 'green',
              margin: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
            }}
            onPress={handleNavigateBakset}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Entypo name="shopping-basket" size={35} color={'#fff'} />
            </View>
            <View style={{flex: 2, paddingLeft: 15}}>
              <VHeader type="four" color="#fff" text={'Go to Checkout!'} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={product.details}
            renderItem={({item}: any) => {
              return (
                <View style={{padding: 5}}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#1a1a1a',
                      padding: 8,
                      borderRadius: 7,
                    }}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      {Object.keys(item)[0]}
                    </Text>
                  </View>
                  <View style={{flex: 2, marginTop: 10}}>
                    <Text
                      style={{
                        color: '#232323',
                        textAlign: 'right',
                        fontWeight: 'bold',
                      }}>
                      {item[Object.keys(item)[0]]}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
};
