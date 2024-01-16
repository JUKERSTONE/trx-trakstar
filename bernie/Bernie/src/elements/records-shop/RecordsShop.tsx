import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';

export const RecordsShopElement = ({
  record,
  setRecord,
  detailAdder,
  setDetailAdder,
  imageAdder,
  setImageAdder,
  sizeAdder,
  setSizeAdder,
  handleSubmitProduct,
  ...props
}: any) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Artist :</Text>
          <TextInput
            value={record.artist}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              width: '80%',
              borderRadius: 10,
            }}
            onChangeText={text => setRecord({...record, artist: text})}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Product :</Text>
          <TextInput
            value={record.product}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              width: '80%',
              borderRadius: 10,
            }}
            onChangeText={text => setRecord({...record, product: text})}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Price :</Text>
          <TextInput
            keyboardType="number-pad"
            value={record.price}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 10,
              margin: 5,
              flex: 1,
            }}
            onChangeText={text => setRecord({...record, price: +text})}
          />
        </View>
        <View style={{margin: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{margin: 5}}>Image(s) :</Text>
            <Button
              title="add promo image"
              onPress={() =>
                setRecord({
                  ...record,
                  images: [...record.images, imageAdder],
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
            {record.images.map((image: any) => (
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
            <Text style={{margin: 5}}>Format :</Text>
            <Button
              title="add format"
              onPress={() =>
                setRecord({
                  ...record,
                  format: [...record.format, sizeAdder],
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
            {record.format.map((format: any) => (
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
                <Text>{format}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{margin: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{margin: 5}}>Track Listings :</Text>
            <Button
              title="add row"
              onPress={() =>
                setRecord({
                  ...record,
                  trackListings: {
                    ...record.trackListings,
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
            {Object.keys(record.trackListings).map((detail: any) => {
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
                    value={record.trackListings[detail]}
                    style={{
                      backgroundColor: 'grey',
                      padding: 10,
                      flex: 1,
                      margin: 5,
                      borderRadius: 10,
                    }}
                    onChangeText={text =>
                      setRecord({
                        ...record,
                        trackListings: {
                          ...record.trackListings,
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
            value={record.promoText}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 10,
            }}
            onChangeText={text => setRecord({...record, promoText: text})}
          />
        </View>
        <View style={{margin: 5}}>
          <Text style={{margin: 5}}>Description :</Text>
          <TextInput
            value={record.description}
            style={{
              backgroundColor: 'grey',
              padding: 10,
              borderRadius: 10,
              height: 80,
            }}
            multiline={true}
            onChangeText={text => setRecord({...record, description: text})}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Button title="submit" onPress={() => handleSubmitProduct(record)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
