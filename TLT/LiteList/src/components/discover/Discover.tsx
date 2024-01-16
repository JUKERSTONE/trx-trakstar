import {View, Text, useWindowDimensions, Dimensions} from 'react-native';
import React from 'react';
import {
  LandingNewReleaseView,
  LandingRecommendationsView,
  LandingTrakListWeekView,
  LandingFeaturesView,
  LandingHeaderView,
  LandingNewsView,
  TRAKTabContainer,
  USERSTabContainer,
  ForYouContainer,
  OriginalsContainer,
  LandingTRX01Container,
  LandingTRXCategoriesContainer,
  RSSComplexContainer,
  LandingListenAgainContainer,
  LandingTrendingContainer,
  LandingPlaylistsContainer,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import {useLITELISTState} from '../../app';
import LinearGradient from 'react-native-linear-gradient';
import {LandingTRX02Container} from '../../containers';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TRXPictureInPictureContainer} from '../../containers/trx-picture-in-picture';
import {useSelector} from 'react-redux';

export const DiscoverComponent = ({isSearching, query, ...props}: any) => {
  const layout = useWindowDimensions();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  console.log(
    '🚀 ~ file: Discover.tsx:35 ~ DiscoverComponent ~ profile:',
    profile,
  );
  const userCategory = profile.TRX.userCategory;

  const authentication = handleGetState({index: 'authentication'});
  const isLoggedIn = authentication.isLoggedIn;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TRAK'},
    {key: 'second', title: 'FOR YOU'},
    // {key: 'third', title: 'ORIGINALS'},
    // {key: 'fourth', title: 'USERS'},
    // {key: 'fourth', title: 'TAPE'},
  ]);

  const {
    mode,
    paused,
    muted,
    players,
    repeat,
    source,
    image,
    cover_art,
    uri,
    title,
    artist,
    queue,
    // index,
    youtubeId,
    youtubeMinimize,
    isTraklist,
    traklistIndex,
    traklist,
    id,
    isrc,
    hidden,
    isPrimaryPlayer,
  } = useSelector((state: any) => state.player);

  console.log(
    '🚀 ~ file: Discover.tsx:79 ~ DiscoverComponent ~ userCategory:',
    userCategory,
  );
  switch (userCategory === undefined || isSearching) {
    case true:
      return (
        <TabView
          // swipeEnabled={false}
          navigationState={{index, routes}}
          style={{
            height: Dimensions.get('screen').height,
          }}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <TRAKTabContainer query={query} {...props} />;
              case 'second':
                return <ForYouContainer query={query} {...props} />;
              case 'third':
                return <OriginalsContainer query={query} {...props} />;
              case 'fourth':
              // return <USERSTabContainer query={query} {...props} />;
              default:
                return <View />;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{
                backgroundColor: '#232323',
                margin: 10,
                marginHorizontal: 20,
                borderRadius: 15,
              }}
              renderLabel={({route, focused, color}) => (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: !focused ? 'grey' : 'white',
                      fontSize: 13,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginRight: 5,
                    }}>
                    {route.title}
                  </Text>
                  <MaterialIcons
                    name="trending-up"
                    size={18}
                    color={'#1db954'}
                  />
                </View>
              )}
              indicatorStyle={{backgroundColor: 'transparent'}}
            />
          )}
        />
      );
    default:
      return (
        <ScrollView>
          <LinearGradient colors={['#1A1A1A', '#232323', '#1a1a1a']}>
            {/* <TRXPictureInPictureContainer isTraklist={isTraklist} /> */}
            <LandingListenAgainContainer navigation={props.navigation} />
            <LandingPlaylistsContainer navigation={props.navigation} />
            <LandingTrendingContainer navigation={props.navigation} />
            <LandingNewReleaseView navigation={props.navigation} />
            <LandingTrakListWeekView />
            <LandingFeaturesView {...props} />
            {isLoggedIn && (
              <LandingRecommendationsView navigation={props.navigation} />
            )}
            <LandingTRX01Container navigation={props.navigation} />
            {/* <LandingNewsView {...props} /> */}
            <LandingTRX02Container navigation={props.navigation} />
            <RSSComplexContainer {...props} />
          </LinearGradient>
        </ScrollView>
      );
  }
};
