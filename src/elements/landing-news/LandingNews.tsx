import React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import LinearGradient from 'react-native-linear-gradient';
import {NewsCard} from '../news-card';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TRAKCard} from '../trak-card/TRAKCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';

interface LandingNewsProps {
  news: any[];
  handleShareNews: any;
}

export const LandingNews: React.FC<LandingNewsProps> = ({
  news,
  handleShareNews,
  index,
  newsOveride,
}: any) => {
  const pitchfork = useSelector((state: any) => state.rss.pitchfork);

  console.log('🚀 ~ file: LandingNews.tsx ~ line 19 ~ news', news);
  const renderItem = ({item, index}: any) => {
    console.log(
      '🚀 ~ file: LandingNews.tsx ~ line 21 ~ renderItem ~ item',
      item,
    );
    return (
      <TouchableOpacity onPress={() => handleShareNews(item.id)}>
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
    <View>
      <TouchableOpacity onPress={() => alert('coming soon')}>
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
            <MaterialCommunityIcons name="music" size={18} color={'#fff'} />
          </View>
          <VHeader type="five" color="#fff" text={'MUSIC NEWS LATEST'} />
        </View>
      </TouchableOpacity>
      <Carousel
        data={pitchfork}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('screen').width}
        itemWidth={300}
        firstItem={2}
      />
    </View>
  );
};
