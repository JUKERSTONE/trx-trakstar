import React from 'react';
import {
  View,
  FlatList,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {VHeader, Caption, Paragraph} from '../typography';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';

interface TLandingRecommendations {
  recommendations: any;
  handleReload: () => void;
  handleTRAKNavigation: any;
}

export const LandingRecommendations: React.FC<TLandingRecommendations> = ({
  // recommendations,
  handleReload,
  handleTRAKNavigation,
}) => {
  const player = useSelector((state: any) => state.player);
  const recommendations = player.queue;

  console.log(
    '🚀 ~ file: LandingRecommendations.tsx ~ line 27 ~ recommendations',
    recommendations,
  );
  dayjs.extend(relativeTime);

  const renderItem = ({item}: any) => {
    console.log(
      '🚀 ~ file: LandingRecommendations.tsx ~ line 34 ~ renderItem ~ item',
      item,
    );

    return (
      <TouchableOpacity onPress={() => handleTRAKNavigation(item)}>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 10,
          }}>
          <Image
            source={{uri: item?.cover_art}}
            style={{
              height: 100,
              width: '100%',
              borderRadius: 10,
              backgroundColor: '#cecece',
            }}
          />
          <View
            style={{
              marginTop: 5,
              paddingHorizontal: 7,
            }}>
            <VHeader
              numberOfLines={1}
              type="six"
              color={'#fff'}
              text={item.title}
            />
            <VHeader
              numberOfLines={1}
              type="six"
              color={'#fff'}
              text={item.artist}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    // Within your render function
    // <LinearGradient colors={['#1B3926', '#1A1A1A', '#1B3926', '#1A1A1A']}>
    <View style={{marginLeft: 0}}>
      <View
        style={{
          marginTop: 5,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 10,
            // width: '50%',
            paddingVertical: 8,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            flexDirection: 'row',
            marginLeft: 20,
          }}>
          <View
            style={{
              marginRight: 10,
              // backgroundColor: '#1db954',
              borderRadius: 20,
              padding: 4,
            }}>
            <MaterialIcons name="preview" size={18} color={'#fff'} />
          </View>
          <VHeader type="five" color="#fff" text={'TRY THESE'} />
        </View>
        {recommendations ? (
          <Carousel
            layout="default"
            // layoutCardOffset={10}
            data={recommendations}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('screen').width}
            itemWidth={270}
            enableSnap
            firstItem={2}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
            <Button title="reload" onPress={handleReload} />
          </View>
        )}
      </View>
    </View>
    // </LinearGradient>
  );
};
