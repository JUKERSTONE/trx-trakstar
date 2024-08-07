import React, {useEffect} from 'react';
import {
  View,
  Image,
  Button,
  useWindowDimensions,
  ScrollView,
  NativeModules,
} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '..';
import {TabView, TabBar} from 'react-native-tab-view';
import {
  SwipeContainer,
  FeedContainer,
  OriginalsShowcaseContainer,
  LandingNewReleaseView,
  LandingRecommendationsView,
  LandingFeaturesView,
  LandingHeaderView,
  LandingNewsView,
  TRAKTabContainer,
  USERSTabContainer,
  ForYouContainer,
  OriginalsContainer,
  DiscoverContainer,
} from '../../containers';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {store, setFeed, setChatPlayer, setSwipePlayer} from '../../stores';
import {useLITELISTState} from '../../app';
import {useFocusEffect} from '@react-navigation/native';
import {TRXScreen} from '../../screens/TRXScreen';

export const HomeElement = ({...props}) => {
  const layout = useWindowDimensions();

  const {handleGetState} = useLITELISTState();

  const authentication = handleGetState({index: 'authentication'});
  const isLoggedIn = authentication.isLoggedIn;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'swipe'},
    {key: 'second', title: 'forum'},
    {key: 'third', title: 'my-library-music'},
    // {key: 'fourth', title: 'youtube-searched-for'},
  ]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setIndex(0);
      };
    }, []),
  );

  useEffect(() => {
    if (index === 1 || index === 2) {
      const action = setFeed(true);
      store.dispatch(action);
      const action1 = setChatPlayer({});
      store.dispatch(action1);
    } else {
      const action = setFeed(false);
      store.dispatch(action);
      const action1 = setSwipePlayer({});
      store.dispatch(action1);
    }
  }, [index]);
  return <SwipeContainer {...props} />;
};
