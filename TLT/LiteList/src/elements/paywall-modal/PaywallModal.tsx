import React from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {VHeader, Paragraph, Caption} from '../typography';

export const PaywallModalElement = ({
  data,
  handleSubscribe,
  packages,
  loading,
  handleNaviagetEULA,
  handleNaviagetPrivacyPolicy,
}: any) => {
  const {width, height} = useWindowDimensions();

  const _renderItem = ({item, index}: any) => {
    console.log(
      '🚀 ~ file: PayWall.tsx ~ line 16 ~ PayWallElement ~ item',
      item,
    );
    return (
      <ImageBackground
        key={index}
        source={{uri: item.imageURL}}
        resizeMode="cover"
        imageStyle={{
          borderRadius: 15,
        }}
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderRadius: 15,
          justifyContent: 'space-around',
          padding: 20,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            opacity: 0.85,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* header */}
          <VHeader
            numberOfLines={1}
            type="three"
            color={'#fff'}
            text={item.title}
          />
          <Paragraph
            numberOfLines={1}
            type={'one'}
            color={'#fff'}
            text={item.id.toUpperCase()}
          />
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: '#fff',
            marginVertical: 30,
            borderRadius: 15,
            opacity: 0.7,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.features.map((item: any) => (
            <View style={{marginBottom: 10}}>
              <VHeader type="five" color={'#000'} text={item} />
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: 'green',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            handleSubscribe({id: item.id, packageId: item.packageId})
          }>
          {!loading ? (
            <View>
              <VHeader
                numberOfLines={1}
                type="three"
                color={'#fff'}
                text={`SUBSCRIBE`}
              />
              <Paragraph
                numberOfLines={1}
                type="two"
                color={'#fff'}
                text={'£ ' + item.price + ' / per month'}
              />
            </View>
          ) : (
            <View>
              <ActivityIndicator color="blue" size="small" />
            </View>
          )}
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
      }}>
      <Carousel
        // layout={'stack'}
        layoutCardOffset={30}
        data={data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
      />
      <View style={{marginTop: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#fff', fontSize: 12}}>
            By subscribing, you agree to our{' '}
          </Text>
          <TouchableOpacity onPress={handleNaviagetEULA}>
            <Text
              style={{
                color: '#1db954',
                textDecorationLine: 'underline',
                fontSize: 12,
              }}>
              End User License Agreement.
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{color: '#fff', fontSize: 12}}>
          Subscriptions auto-renew until canceled, as described in the Terms.
          Cancel anytime.
        </Text>
        <View style={{flexDirection: 'row', marginTop: 3}}>
          <Text style={{color: '#fff', fontSize: 12}}>Check out our </Text>
          <TouchableOpacity onPress={handleNaviagetPrivacyPolicy}>
            <Text
              style={{
                color: '#1db954',
                textDecorationLine: 'underline',
                fontSize: 12,
              }}>
              Privacy Policy.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
