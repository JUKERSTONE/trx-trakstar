import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body} from '../typography';

export const NFTDashboardElement = ({
  item,
  handleNavigateMerchandise,
  handleNavigateInsights,
}: any) => {
  console.log(
    '🚀 ~ file: NFTDashboard.tsx ~ line 20 ~ NFTDashboardElement ~ item',
    item,
  );
  return (
    <SafeAreaView style={{backgroundColor: '#cecece', flex: 1}}>
      {/*  */}
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: 13,
          marginVertical: 10,
          backgroundColor: '#1a1a1a',
          borderRadius: 10,
          height: 200,
          flexDirection: 'row',
          borderBottomWidth: 3,
        }}>
        <View
          style={{
            justifyContent: 'flex-end',
            marginRight: 20,
            flex: 1,
          }}>
          <Image
            source={{
              uri: item.nft.trakIMAGE,
            }}
            style={{
              backgroundColor: '#1B4F26',
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            marginRight: 25,
            backgroundColor: '#1a1a1a',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '60%',
            paddingVertical: 10,
          }}>
          <View
            style={{
              marginTop: 20,
              backgroundColor: '#1a1a1a',
              opacity: 0.9,
            }}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={item.nft.trakTITLE}
            />
            <Body
              numberOfLines={1}
              type="one"
              color={'#cecece'}
              text={item.nft.trakARTIST}
              textAlign="right"
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 2,
                width: '100%',
                justifyContent: 'flex-end',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {'NFT'}
              </Text>
              <Text>•</Text>
              <Text
                numberOfLines={1}
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {`${item.nft.trakIPO} TRX`}
              </Text>
              {/*  */}
              {/*  */}
            </View>
          </View>
        </View>
      </View>
      {/*  */}
      <Button onPress={handleNavigateMerchandise} title="Merchandise" />
      <Button onPress={handleNavigateInsights} title="Insights" />
    </SafeAreaView>
  );
};
