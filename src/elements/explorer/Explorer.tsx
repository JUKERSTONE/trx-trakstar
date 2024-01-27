import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {Caption, VHeader} from '../typography';
import {HorizontalCategoriesElement} from '../horizontal-categories';
import {HorizontalSubCategoriesElement} from '../horizontal-sub-categories';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

export const ExplorerElement = ({
  categories,
  subCategories,
  products,
  productListRef,
  handleAddToBasket,
  handleNavigateProduct,
  handleDecreaseQuantity,
  ...props
}: any) => {
  const {basket} = useSelector((state: any) => state.checkout);
  console.log('🚀 ~ file: Explorer.tsx:31 ~ basket:', basket);
  return (
    <View style={{padding: 10}}>
      {categories && categories.length > 0 && (
        <HorizontalCategoriesElement categories={categories} {...props} />
      )}
      {subCategories && subCategories.length > 0 && (
        <HorizontalSubCategoriesElement
          subCategories={subCategories}
          {...props}
        />
      )}

      <FlatList
        ref={productListRef}
        contentContainerStyle={{
          // alignItems: 'center',
          paddingTop: 5,
        }}
        data={products}
        renderItem={({item, index}) => {
          switch (item.type) {
            case 'headline':
              return (
                <View style={{}}>
                  <VHeader
                    numberOfLines={1}
                    type="three"
                    color={'#1db954'}
                    text={item.subCategory}
                  />
                </View>
              );
            case 'row':
              console.log('🚀 ~ file: Explorer.tsx:142 ~ item:', item);
              return (
                <View style={{flexDirection: 'row'}}>
                  {item.products.map((product: any) => {
                    const productId = product?.id;

                    const productBasketIndex = basket.findIndex(
                      (item: any) => item.product.id == productId,
                    );
                    console.log(
                      '🚀 ~ file: Explorer.tsx:73 ~ {item.products.map ~ productBasketIndex:',
                      productBasketIndex,
                    );

                    let basketDetail = null;
                    if (productBasketIndex !== -1) {
                      // alert(productBasketIndex);
                      basketDetail = basket[productBasketIndex];
                    }

                    return (
                      <Pressable
                        onPress={() => handleNavigateProduct({product})}>
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
                                uri: product.variants[0].imageUrls[0],
                                priority: FastImage.priority.high,
                              }}
                            />
                            {!basketDetail ? (
                              <TouchableOpacity
                                onPress={() => handleAddToBasket({product})}>
                                <View
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: '#1db954',
                                    borderTopLeftRadius: 5,
                                  }}>
                                  <MaterialCommunityIcons
                                    name="plus"
                                    color={'#fff'}
                                    size={18}
                                  />
                                </View>
                              </TouchableOpacity>
                            ) : (
                              <View
                                style={{
                                  justifyContent: 'space-between',
                                  backgroundColor: '#1db954',
                                  borderRadius: 5,
                                  flexDirection: 'row',
                                  padding: 2,
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleDecreaseQuantity({product})
                                  }>
                                  <MaterialCommunityIcons
                                    name="minus"
                                    color={'#fff'}
                                    size={18}
                                  />
                                </TouchableOpacity>
                                <VHeader
                                  type="six"
                                  color={'#fff'}
                                  text={basketDetail.quantity}
                                />
                                <TouchableOpacity
                                  onPress={() => handleAddToBasket({product})}>
                                  <MaterialCommunityIcons
                                    name="plus"
                                    color={'#fff'}
                                    size={18}
                                  />
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                            }}>
                            <Caption
                              numberOfLines={1}
                              type="two"
                              color={'#fff'}
                              text={product.name}
                            />
                            <Caption
                              numberOfLines={1}
                              type="two"
                              color={'#fff'}
                              text={'£' + product.variants[0].amount + '.00'}
                            />
                          </View>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              );

            default:
              return null;
          }
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
