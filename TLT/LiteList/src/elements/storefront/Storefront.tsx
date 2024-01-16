import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {DiscoverComponent} from '../../components';
import {
  LandingNewReleaseView,
  LandingRecommendationsView,
  LandingTrendingView,
  LandingFeaturesView,
  LandingHeaderView,
  LandingNewsView,
  OriginalsShowcaseContainer,
  RSSFeedComtainer,
  RSSComplexContainer,
  ShopContainer,
  BasketContainer,
  CollectionsContainer,
  CategoryTilesContainer,
  TRAKTabContainer,
  ForYouContainer,
  OriginalsContainer,
  DiscoverContainer,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Paragraph, Caption} from '../typography';
import LottieView from 'lottie-react-native';
import {useStorefront} from '../../containers/storefront/useStorefront';
import {PlayerContext} from '../../stores';

export const StorefrontElement = ({
  handleChangeText,
  isSearching,
  results,
  query,
  handleClearText,
  recordsShop,
  ticketsShop,
  merchandiseShop,
  route,
  ...props
}: any) => {
  const {userData, setUserData} = useContext(PlayerContext);

  console.log('🚀 ~ file: Storefront.tsx:46 ~ route:', route);
  console.log(
    '🚀 ~ file: Storefront.tsx:44 ~ merchandiseShop:',
    merchandiseShop,
  );
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    if (index === 0) {
      setUserData({...userData, isStorefront: false});
    } else setUserData({...userData, isStorefront: true});
  }, [index]);

  const [routes] = React.useState([
    {key: 'first', title: 'Discover', icon: 'play-arrow'},
    {key: 'second', title: 'Shop', icon: 'shop'},
  ]);

  const layout = useWindowDimensions();

  console.log('🚀 ~ file: Lists.tsx ~ line 22 ~ results', results);
  return (
    <>
      <ScrollView
        style={{
          height: Dimensions.get('window').height,
          backgroundColor: '#1a1a1a',
          // paddingBottom: 200,
        }}>
        <Image
          style={{
            width: '100%',
            height: 100,
          }}
          source={require('../../core/poster_mark_green.png')}
        />
        {/* <CollectionsContainer
          data={[]}
          headerText="TRX00"
          height={120}
          {...props}
        /> */}
        <CategoryTilesContainer {...props} />
      </ScrollView>
    </>
  );
};
