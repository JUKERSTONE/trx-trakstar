import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  Text,
  SafeAreaView,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TRAKCard} from '../trak-card/TRAKCard';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';

export const RegenElement = ({
  results,
  selected,
  handleSelect,
  handleRegenerate,
  query,
  setQuery,
}: any) => {
  console.log('🚀 ~ file: Regen.tsx:10 ~ RegenElement ~ results:', results);
  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <View
          style={{
            borderWidth: 4,
            borderColor: '#0000',
            borderRadius: 11,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <View
            style={{
              margin: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              flex: 1,
              borderRadius: 8,
              borderWidth: 1,
              // borderColor: props.borders.inner,
              backgroundColor: 'whitesmoke',
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  // color: props.labelColor,
                  // fontSize: 12,
                  // fontWeight: '500',
                  paddingLeft: 16,
                  // marginBottom: 8,
                  paddingTop: 15,
                  marginTop: 10,
                }}>
                <VHeader type="five" color={'#1a1a1a'} text={'search'} />
              </View>
              <TextInput
                style={{
                  // color: props.color,
                  fontSize: 14,
                  fontWeight: '500',
                  paddingLeft: 16,
                  paddingBottom: 20,
                }}
                onChangeText={setQuery}
                value={query}
              />
            </View>
          </View>
          {/* {isSearching && ( */}
          <TouchableOpacity
            onPress={handleRegenerate}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              padding: 6,
              borderRadius: 5,
              backgroundColor: 'green',
              marginRight: 10,
              borderWidth: 2,
              borderColor: '#cecece',
            }}>
            <VHeader type="six" color={'white'} text={'REGEN'} />
          </TouchableOpacity>
          {/* )} */}
        </View>
      </SafeAreaView>
      <View style={{alignItems: 'center', margin: 20}}>
        <VHeader
          textAlign="center"
          type="four"
          color={'#fff'}
          text={`Please search and select `}
        />
        <VHeader
          textAlign="center"
          type="six"
          color={'#fff'}
          text={`${4 - selected} more recommendation seeds...`}
        />
      </View>
      {results.length !== 0 ? (
        <FlatList
          style={{flex: 1}}
          data={results}
          renderItem={({item, index}: any) => {
            console.log('🚀 ~ file: Regen.tsx:28 ~ RegenElement ~ item:', item);
            return (
              <TouchableOpacity onPress={() => handleSelect({item})}>
                <TRAKCard
                  rank={++index}
                  artwork={item.album.images[0].url}
                  title={item.name}
                  artist={item.artists[0].name}
                  status={'falling'}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#1a1a1a',
          }}>
          <LottieView
            source={require('../../core/57276-astronaut-and-music.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
};
