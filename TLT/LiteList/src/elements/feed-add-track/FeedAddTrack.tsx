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
  useWindowDimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TRAKCard} from '../trak-card/TRAKCard';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {TabView, TabBar} from 'react-native-tab-view';

export const FeedAddTrackElement = ({
  results,
  selected,
  handleSelect,
  handleRegenerate,
  query,
  setQuery,
  handleSelectTrack,
}: any) => {
  console.log('🚀 ~ file: Regen.tsx:10 ~ RegenElement ~ results:', results);
  const {userCategory} = useSelector((state: any) => state.profile.TRX);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'FIND A SONG'},
    // {key: 'second', title: 'GENIUS'},
    // {key: 'third', title: 'SOUNDCLOUD'},
  ]);

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
          text={`Search and select `}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <FlatList
                  listKey="TRAK"
                  contentContainerStyle={{
                    paddingBottom: 400,
                    paddingTop: 5,
                    borderRadius: 20,
                  }}
                  data={results.spotify}
                  renderItem={({item, index}) => {
                    console.log(
                      '🚀 ~ file: FeedAddTrack.tsx:193 ~ item:',
                      item,
                    );

                    return (
                      <TouchableOpacity
                        onPress={() =>
                          handleSelectTrack({
                            preview: item.preview_url,
                            image: item.album.images[0].url,
                            artist: item.artists[0].name,
                            title: item.name,
                            platform: userCategory,
                          })
                        }>
                        <TRAKCard
                          rank={++index}
                          artwork={item.album.images[0].url}
                          title={item.artists[0].name}
                          artist={item.name}
                          height={'100%'}
                          status={'rising'}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => '' + index}
                />
              );
            case 'second':
              return (
                <FlatList
                  listKey="TRAK"
                  contentContainerStyle={{
                    paddingBottom: 400,
                    paddingTop: 5,
                    borderRadius: 20,
                  }}
                  data={results.genius}
                  renderItem={({item, index}) => {
                    console.log(
                      '🚀 ~ file: FeedAddTrack.tsx:213 ~ item:',
                      item,
                    );

                    return (
                      <TouchableOpacity
                        onPress={() =>
                          handleSelectTrack({
                            preview: null,
                            image: item.result.song_art_image_thumbnail_url,
                            artist: item.result.artist_names,
                            title: item.result.title,
                            platform: 'genius',
                          })
                        }>
                        <TRAKCard
                          rank={++index}
                          artwork={item.result.song_art_image_thumbnail_url}
                          title={item.result.artist_names}
                          artist={item.result.title}
                          status={'rising'}
                          height={'100%'}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => '' + index}
                />
              );
            case 'third':
              return (
                <FlatList
                  listKey="TRAK"
                  contentContainerStyle={{
                    paddingBottom: 400,
                    paddingTop: 5,
                    borderRadius: 20,
                  }}
                  data={results.soundcloud}
                  renderItem={({item, index}) => {
                    console.log(
                      '🚀 ~ file: FeedAddTrack.tsx:215 ~ item:',
                      item,
                    );
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          handleSelectTrack({
                            preview: null,
                            image: item.artwork_url,
                            artist: item.user.username,
                            title: item.title,
                            platform: 'soundcloud',
                          })
                        }>
                        <TRAKCard
                          rank={++index}
                          artwork={item.artwork_url}
                          title={item.user.username}
                          artist={item.title}
                          status={'rising'}
                          height={'100%'}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => '' + index}
                />
              );
            default:
              return <View />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: '#1a1a1a'}}
            renderLabel={({route, focused, color}) => (
              <Text
                style={{
                  color: !focused ? 'grey' : 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: '#fff'}}
          />
        )}
      />
    </View>
  );
};
