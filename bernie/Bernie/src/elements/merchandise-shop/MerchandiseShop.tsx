import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';

export const MerchandiseShopElement = ({
  merchandise,
  setMerchandise,
  detailAdder,
  setDetailAdder,
  imageAdder,
  setImageAdder,
  sizeAdder,
  setSizeAdder,
  handleSubmitProduct,
  ...props
}: any) => {
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Brand :</Text>
          <TextInput
            value={merchandise.brand}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              width: '80%',
              borderRadius: 10,
            }}
            onChangeText={text => setMerchandise({...merchandise, brand: text})}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Product :</Text>
          <TextInput
            value={merchandise.product}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              width: '80%',
              borderRadius: 10,
            }}
            onChangeText={text =>
              setMerchandise({...merchandise, product: text})
            }
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Price :</Text>
          <TextInput
            keyboardType="number-pad"
            value={merchandise.price}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 10,
              margin: 5,
              flex: 1,
            }}
            onChangeText={text =>
              setMerchandise({...merchandise, price: +text})
            }
          />
        </View>
        <View style={{margin: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{margin: 5}}>Image(s) :</Text>
            <Button
              title="add promo image"
              onPress={() =>
                setMerchandise({
                  ...merchandise,
                  images: [...merchandise.images, imageAdder],
                })
              }
            />
            <TextInput
              value={imageAdder}
              style={{
                backgroundColor: '#cecece',
                padding: 10,
                flex: 1,
                borderRadius: 5,
                margin: 5,
              }}
              onChangeText={text => setImageAdder(text)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            {merchandise.images.map((image: any) => (
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  backgroundColor: '#2323cc',
                  marginRight: 5,
                }}
                source={{uri: image}}
              />
            ))}
          </View>
        </View>
        <View style={{margin: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{margin: 5}}>Size(s) :</Text>
            <Button
              title="add size"
              onPress={() =>
                setMerchandise({
                  ...merchandise,
                  sizes: [...merchandise.sizes, sizeAdder],
                })
              }
            />
            <TextInput
              value={sizeAdder}
              style={{
                backgroundColor: '#cecece',
                padding: 10,
                flex: 1,
                borderRadius: 5,
                margin: 5,
              }}
              onChangeText={text => setSizeAdder(text)}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            {merchandise.sizes.map((size: any) => (
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 10,
                  backgroundColor: '#cecece',
                  marginRight: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{size}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{margin: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{margin: 5}}>Product Details :</Text>
            <Button
              title="add row"
              onPress={() =>
                setMerchandise({
                  ...merchandise,
                  details: {
                    ...merchandise.details,
                    [detailAdder]: '',
                  },
                })
              }
            />
            <TextInput
              value={detailAdder}
              style={{
                backgroundColor: '#cecece',
                padding: 10,
                flex: 1,
                borderRadius: 5,
                margin: 5,
              }}
              onChangeText={text => setDetailAdder(text)}
            />
          </View>
          <View>
            {Object.keys(merchandise.details).map((detail: any) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    value={detail}
                    style={{
                      backgroundColor: 'grey',
                      padding: 10,
                      flex: 1,
                      borderRadius: 10,
                      margin: 5,
                    }}
                    // onChangeText={text => setVerifyData({...verifyData, artist: text})}
                  />
                  <TextInput
                    value={merchandise.details[detail]}
                    style={{
                      backgroundColor: 'grey',
                      padding: 10,
                      flex: 1,
                      margin: 5,
                      borderRadius: 10,
                    }}
                    onChangeText={text =>
                      setMerchandise({
                        ...merchandise,
                        details: {
                          ...merchandise.details,
                          [detail]: text,
                        },
                      })
                    }
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Promo text :</Text>
          <TextInput
            value={merchandise.promoText}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 10,
            }}
            onChangeText={text =>
              setMerchandise({...merchandise, promoText: text})
            }
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Description :</Text>
          <TextInput
            value={merchandise.description}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 10,
              height: 80,
            }}
            onChangeText={text =>
              setMerchandise({...merchandise, description: text})
            }
          />
        </View>
        <View style={{marginTop: 10}}>
          <Button
            title="submit"
            onPress={() => handleSubmitProduct(merchandise)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
