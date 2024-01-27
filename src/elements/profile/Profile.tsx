import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
  Button,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {VHeader, Body, Caption} from '../typography';
import {handleUnLikeTRAK, useLITELISTState} from '../../app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import MarqueeText from 'react-native-marquee';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TRAKCard} from '../trak-card/TRAKCard';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppBrowser} from '../../containers';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {TrakstarSelect} from '../trakstar-select';

export const ProfileElement = ({
  item,
  isOwner,
  streaming,
  handleToggleProfileVisibility,
  handleToggleFollowUser,
  profile,
  favorites,
  playlists,
  handleNFTNavigation,
  handleNextTransaction,
  refreshing,
  handleRefresh,
  handleArtistNavigation,
  loadingArtist,
  handleTRAK,
  handlePlaylistNavigation,
  handleSendCrypto,
  TRXProfile,
  transactions,
  handleClipboard,
  handleNavigateSwipe,
  handleCatalogTRAK,
  list,
  handleSelectOriginal,
  handleShareProfile,
  handleUnlikeTRAK,
  handleDownload,
}: any) => {
  console.log('🚀 ~ file: Profile.tsx ~ line 51 ~ transactions', transactions);
  console.log('🚀 ~ file: Profile.tsx ~ line 48 ~ TRXProfile', TRXProfile);
  console.log('🚀 ~ file: Profile.tsx ~ line 31 ~ item', item);
  console.log(
    '🚀 ~ file: Profile.tsx ~ line 15 ~ ProfileElement ~ streaming',
    streaming,
    profile,
    favorites,
  );

  const profileObj = isOwner ? TRXProfile : item;
  console.log('🚀 ~ file: Profile.tsx ~ line 58 ~ profileObj', profileObj);

  const [index, setIndex] = React.useState(0);
  const [alphaLikes, setAlphaLikes] = useState<any[]>([]);

  const [routes] = React.useState([
    {key: 'fourth', title: 'TRX'},
    {key: 'third', title: 'PLAYLISTS'},
    {key: 'second', title: 'TOP ARTISTS'},
    {key: 'first', title: 'TOP TRACKS'},
  ]);

  const layout = useWindowDimensions();

  const isPrivate = useSelector((state: any) => state.profile.TRX.isPrivate);
  const profileTRX = useSelector((state: any) => state.profile.TRX);
  const {wallet} = useSelector((state: any) => state.crypto);
  const {downloadQueue, local} = useSelector((state: any) => state.downloads);
  console.log('🚀 ~ file: Profile.tsx ~ line 97 ~ wallet', wallet);
  console.log('🚀 ~ file: Profile.tsx ~ line 96 ~ profileTRX', profileTRX);

  useEffect(() => {
    const alphaLike = profileTRX.likes.map((like: any) => {
      let key;
      console.log('🚀 ~ file: Profile.tsx:120 ~ alphaLike ~ like:', like);

      if (like.trxUri) {
        key = like.trxUri;
      } else if (like.isrc) {
        key = `trx:isrc:${like.isrc}`;
      } else if (like.NFTFileName) {
        key = `trx:02:${like.NFTFileName}`;
      } else if (like.trx04) {
        key = like.trx04;
      }

      return {
        key,
        value: like.title,
        data: like,
      };
    });

    console.log(
      '🚀 ~ file: Profile.tsx:99 ~ alphaLike ~ alphaLike:',
      alphaLike,
    );
    setAlphaLikes(alphaLike);
  }, [profileTRX.likes]);

  if (!profile) {
    return <View />;
  }
  return (
    <View style={{flex: 1}}>
      <LinearGradient colors={['#1a1a1a', '#232323']} style={{flex: 1}}>
        <View
          style={{
            // alignItems: 'center',
            // backgroundColor: '#1B3926',
            flex: 2,
            // marginBottom: 6,
          }}>
          {/* top part */}
          <View style={{flex: 1}}>
            {/* bottom part */}

            <ParallaxScrollView
              backgroundColor="transparent"
              contentBackgroundColor={'transparent'}
              parallaxHeaderHeight={120}
              stickyHeaderHeight={100}
              renderForeground={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#1a1a1a',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    height: '100%',
                    margin: 10,
                    borderWidth: 2,
                    borderColor: '#333333',
                  }}>
                  <Image
                    source={{uri: profileObj.avatarURL}}
                    style={{
                      backgroundColor: '#1B4F26',
                      height: '100%',
                      width: 170,
                      alignSelf: 'center',
                      borderRadius: 7,
                      borderWidth: 2,
                      borderColor: '#232323',
                    }}
                  />
                  <View
                    style={{
                      paddingVertical: 15,
                      justifyContent: 'center',
                      flex: 1,
                      paddingTop: 30,
                      marginLeft: 15,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'row', marginRight: 8}}>
                        <View style={{justifyContent: 'center'}}>
                          {/* <Body
                        // numberOfLines={1}
                        type="two"
                        color={'#1a1a1a'}
                        text={item.userCategory + ' user'}
                      /> */}
                          {profileObj.userCategory === 'spotify' && (
                            <Fontisto
                              name="spotify"
                              size={18}
                              color={'#cecece'}
                            />
                          )}
                          {profileObj.userCategory === 'primary' && (
                            <View style={{flexDirection: 'row'}}>
                              <View style={{marginRight: 5}}>
                                <Fontisto
                                  name="spotify"
                                  size={18}
                                  color={'#cecece'}
                                />
                              </View>
                              <Fontisto
                                name="applemusic"
                                size={18}
                                color={'#cecece'}
                              />
                            </View>
                          )}
                          {profileObj.userCategory === 'apple_music' && (
                            <Fontisto
                              name="applemusic"
                              size={18}
                              color={'#cecece'}
                            />
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <VHeader
                          numberOfLines={1}
                          type="six"
                          color={'#cecece'}
                          text={profileObj.trak_name}
                        />
                        <Caption
                          numberOfLines={1}
                          type="two"
                          color={'#663355'}
                          text={'  [' + profileObj.trak_symbol + ']'}
                        />
                        <View style={{flexDirection: 'row', marginLeft: 3}}>
                          <Ionicons
                            name="ios-flame-sharp"
                            size={15}
                            color={'orange'}
                          />
                          <Text
                            style={{
                              fontSize: 8,
                              fontWeight: 'bold',
                              color: '#cecece',
                            }}>
                            {profileObj.streak}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 2,
                        paddingRight: 10,
                        width: '100%',
                        // backgroundColor: 'red',
                        justifyContent: 'space-between',
                      }}>
                      {/* <TouchableOpacity onPress={handleShareProfile}>
                        <View
                          style={{
                            backgroundColor: '#232323',
                            // borderWidth: 3,
                            borderColor: 'grey',
                            alignSelf: 'flex-start',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 5,
                            marginTop: 10,
                            flexDirection: 'row',
                          }}>
                          <MaterialIcons
                            name={'share'}
                            size={20}
                            color={'#ffff'}
                            style={{marginRight: 10}}
                          />
                          <VHeader
                            // numberOfLines={1}
                            type="five"
                            color={'#fff'}
                            text={'SHARE'}
                          />
                        </View>
                      </TouchableOpacity> */}
                      {!isOwner ? (
                        <TouchableOpacity onPress={handleToggleFollowUser}>
                          <View
                            style={{
                              backgroundColor: '#232323',
                              // borderWidth: 3,
                              borderColor: 'grey',
                              alignSelf: 'flex-start',
                              paddingHorizontal: 10,
                              paddingVertical: 3,
                              borderRadius: 5,
                              marginTop: 10,
                            }}>
                            <VHeader
                              // numberOfLines={1}
                              type="five"
                              color={'#fff'}
                              text={'FOLLOW'}
                            />
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={handleToggleProfileVisibility}>
                          <View
                            style={{
                              backgroundColor: '#232323',
                              // borderWidth: 3,
                              borderColor: 'grey',
                              alignSelf: 'flex-start',
                              paddingHorizontal: 15,
                              paddingVertical: 5.5,
                              borderRadius: 5,
                              marginTop: 10,
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                marginRight: 5,
                                // backgroundColor: 'white',
                                justifyContent: 'center',
                                borderRadius: 10,
                                padding: 0,
                              }}>
                              <VHeader
                                // numberOfLines={1}
                                type="six"
                                color={'#ffff'}
                                text={isPrivate ? 'GO PUBLIC' : 'GO PRIVATE'}
                              />
                            </View>
                            <MaterialIcons
                              name={
                                !isOwner
                                  ? 'follow-the-signs'
                                  : isPrivate
                                  ? 'public'
                                  : 'public-off'
                              }
                              size={20}
                              color={'#ffff'}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              )}>
              <View style={{height: Dimensions.get('screen').height * 10}}>
                <TabView
                  navigationState={{index, routes}}
                  style={
                    {
                      // backgroundColor: '#1a1a1a',
                      // borderTopRightRadius: 25,
                      // borderTopLeftRadius: 30,
                      // marginRight: 7,
                      // flex: 1,
                      // height: '100%',
                    }
                  }
                  renderScene={({route}) => {
                    const favoritesArray = isOwner
                      ? favorites
                      : JSON.parse(item.favorites);

                    switch (route.key) {
                      case 'first':
                        console.log(
                          '🚀 ~ file: Profile.tsx ~ line 810 ~ favorites',
                          favorites,
                        );

                        if (favoritesArray.length === 0) {
                          return (
                            <SafeAreaView
                              style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: '#1a1a1a',
                              }}>
                              <Text
                                style={{
                                  fontSize: 30,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: 'whitesmoke',
                                  padding: 30,
                                }}>
                                You don't have any Top Tracks at the moment
                              </Text>
                              <Text style={{color: 'white'}}>
                                Connect with Spotify or Apple Music for a better
                                experience
                              </Text>
                            </SafeAreaView>
                          );
                        }

                        return (
                          <FlatList
                            scrollEnabled={false}
                            // horizontal
                            data={
                              isOwner ? favorites : JSON.parse(item.favorites)
                            }
                            style={{
                              height: 200,
                              // backgroundColor: 'red',
                            }}
                            // numColumns={3}
                            renderItem={({item, index}: any) => {
                              console.log(
                                '🚀 ~ file: Profile.tsx ~ line 305 ~ item',
                                item,
                              );

                              const type = item.info;
                              switch (type) {
                                case 'topTracks':
                                  return (
                                    <TouchableOpacity
                                      onPress={() => handleTRAK(item)}>
                                      <TRAKCard
                                        rank={index + 1}
                                        artwork={item.album.images[0]?.url}
                                        title={item.artists[0].name}
                                        artist={item.name}
                                        status={'same'}
                                      />
                                    </TouchableOpacity>
                                  );
                                case 'heavyRotation':
                                  return (
                                    <TouchableOpacity
                                      onPress={() => handleTRAK(item)}>
                                      <TRAKCard
                                        rank={index + 1}
                                        artwork={item.artwork}
                                        title={item.attributes.artistName}
                                        artist={item.attributes.name}
                                        status={'same'}
                                      />
                                    </TouchableOpacity>
                                  );

                                default:
                                  return (
                                    <View
                                      style={{
                                        backgroundColor: '#ff7700',
                                        margin: 10,
                                        width: 150,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      {/* <Text>fe</Text> */}
                                    </View>
                                  );
                              }
                            }}
                            keyExtractor={(item, index) => '' + index}
                          />
                        );

                      case 'second':
                        if (favoritesArray.length === 0) {
                          return (
                            <SafeAreaView
                              style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: '#1a1a1a',
                              }}>
                              <Text
                                style={{
                                  fontSize: 30,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: 'whitesmoke',
                                  padding: 30,
                                }}>
                                You don't have any Top Artists at the moment
                              </Text>
                              <Text style={{color: 'white'}}>
                                Connect with Spotify or Apple Music for a better
                                experience
                              </Text>
                            </SafeAreaView>
                          );
                        }

                        return (
                          <FlatList
                            scrollEnabled={false}
                            data={
                              isOwner ? favorites : JSON.parse(item.favorites)
                            }
                            // style={{height: 200}}
                            // numColumns={3}
                            renderItem={({item, index}: any) => {
                              console.log(
                                '🚀 ~ file: Profile.tsx ~ line 251 ~ item',
                                item,
                              );
                              const type = item.info;
                              switch (type) {
                                case 'topArtists':
                                  if (loadingArtist === index) {
                                    return (
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleArtistNavigation(item, index)
                                        }>
                                        <TRAKCard
                                          // rank={index + 1}
                                          // status={'same'}
                                          artwork={item.images[0]?.url}
                                          title={''}
                                          artist={item.name}
                                        />
                                        <ActivityIndicator
                                          color="#fff"
                                          size="large"
                                          style={{
                                            position: 'absolute',
                                            top: 15,
                                            right: 10,
                                          }}
                                        />
                                      </TouchableOpacity>
                                    );
                                  }
                                  return (
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleArtistNavigation(item, index)
                                      }>
                                      <TRAKCard
                                        artwork={item.images[0]?.url}
                                        title={''}
                                        artist={item.name}
                                      />
                                    </TouchableOpacity>
                                  );

                                default:
                                  return (
                                    <View
                                      style={{
                                        backgroundColor: '#1a1a1a',
                                        // margin: 10,
                                        // width: 150,
                                        height: 1,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      {/* <Text>fe</Text> */}
                                    </View>
                                  );
                              }
                            }}
                            keyExtractor={(item, index) => '' + index}
                          />
                        );
                      case 'third':
                        const playlistsArray = isOwner
                          ? playlists
                          : JSON.parse(item.playlists);
                        if (playlistsArray.length === 0) {
                          return (
                            <SafeAreaView
                              style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: '#1a1a1a',
                              }}>
                              <Text
                                style={{
                                  fontSize: 30,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: 'whitesmoke',
                                  padding: 30,
                                }}>
                                You don't have any Playlists at the moment
                              </Text>
                              <Text style={{color: 'white'}}>
                                Connect with Spotify or Apple Music for a better
                                experience
                              </Text>
                            </SafeAreaView>
                          );
                        }
                        return (
                          <View style={{flex: 1}}>
                            <TouchableOpacity
                              onPress={() => alert('create traklist')}
                              style={{
                                borderBottomWidth: 0.2,
                                borderColor: '#cecece',
                                margin: 10,
                              }}>
                              <TRAKCard
                                // rank={'index + 1'}
                                artwork={
                                  'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/add-43.png'
                                }
                                title={'Or Stream your playlists'}
                                artist={'CREATE A TRAKLIST'}
                                height={65}
                                // status={'same'}
                              />
                            </TouchableOpacity>
                            <FlatList
                              scrollEnabled={false}
                              data={
                                isOwner ? playlists : JSON.parse(item.playlists)
                              }
                              style={{height: 200}}
                              // numColumns={3}
                              renderItem={({item, index}: any) => {
                                console.log(
                                  '🚀 ~ file: Profile.tsx ~ line 251 ~ item',
                                  item,
                                );
                                const type = item.info;
                                switch (type) {
                                  case 'playlists:spotify':
                                    return (
                                      <TouchableOpacity
                                        onPress={() =>
                                          handlePlaylistNavigation(item)
                                        }>
                                        <TRAKCard
                                          // rank={'index + 1'}
                                          artwork={item.images[0]?.url}
                                          title={item.owner.display_name}
                                          artist={item.name}
                                          // status={'same'}
                                        />
                                      </TouchableOpacity>
                                    );
                                  case 'playlists:apple_music':
                                    console.log(item, 'vrewhe');
                                    return (
                                      <TRAKCard
                                        // rank={index + 1}
                                        artwork={item.attributes.artwork?.url}
                                        title={item.attributes.name}
                                        artist={''}
                                        // status={'same'}
                                      />
                                    );
                                  default:
                                    return (
                                      <View
                                        style={{
                                          backgroundColor: '#ff7700',
                                          margin: 10,
                                          width: 150,
                                          borderRadius: 10,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        {/* <Text>fe</Text> */}
                                      </View>
                                    );
                                }
                              }}
                              keyExtractor={(item, index) => '' + index}
                            />
                          </View>
                        );
                      case 'fourth':
                        if (profile.likes.length === 0) {
                          return (
                            <SafeAreaView
                              style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: '#1a1a1a',
                              }}>
                              <Text
                                style={{
                                  fontSize: 30,
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  color: 'whitesmoke',
                                  padding: 30,
                                }}>
                                You don't have any TRAKSTAR ORIGINAL tracks at
                                the moment
                              </Text>
                              <Text style={{color: 'white'}}>
                                Save some tracks from the search screen
                              </Text>
                            </SafeAreaView>
                          );
                        }
                        return (
                          <AlphabetList
                            data={alphaLikes}
                            scrollEnabled={false}
                            indexLetterStyle={{
                              color: '#1db954',
                              fontSize: 10,
                            }}
                            renderCustomItem={item => {
                              console.log(
                                '🚀 ~ file: Profile.tsx:768 ~ item:',
                                item,
                              );
                              let type;
                              if (item.data.NFTFileName) {
                                type = 'original';
                              } else if (item.data.isPreview) {
                                type = 'preview';
                              } else type = 'trx';

                              // alert(item.key);
                              console.log(
                                '🚀 ~ file: Profile.tsx:753 ~ downloadQueue:',
                                downloadQueue,
                              );

                              const downloadIndex = downloadQueue.findIndex(
                                (i: any) =>
                                  item.key.split(':')[2] == i.uri.split(':')[2],
                              );
                              const localIndex = local.findIndex(
                                (i: any) =>
                                  item.key.split(':')[2] == i.uri.split(':')[2],
                              );

                              const download =
                                downloadIndex !== -1
                                  ? downloadQueue[downloadIndex]
                                  : null;
                              const localTrak =
                                localIndex !== -1 ? local[localIndex] : null;

                              return (
                                <TrakstarSelect
                                  isDownloaded={localTrak}
                                  isDownloading={download}
                                  hasDownload={type.toUpperCase() == 'TRX'}
                                  handleDownload={() =>
                                    handleDownload(item.data)
                                  }
                                  isTRX={type.toUpperCase() == 'PREVIEW'}
                                  // rank={index + 1}
                                  isProfile
                                  artwork={
                                    item.data.cover_art ?? item.data.thumbnail
                                  }
                                  title={item.data.title}
                                  artist={item.data.artist}
                                  // status={'rising'}
                                  height={70}
                                  likes
                                  isLiked
                                  handleLike={() =>
                                    handleUnlikeTRAK({trak: item.data})
                                  }
                                  onPress={() =>
                                    handleSelectOriginal({
                                      trak: item.data,
                                      localTrak,
                                    })
                                  }
                                />
                              );
                            }}
                            renderCustomSectionHeader={section => {
                              console.log(
                                '🚀 ~ file: Profile.tsx:773 ~ section:',
                                section,
                              );
                              return (
                                <View
                                  style={{
                                    marginTop: 10,
                                    marginHorizontal: 10,
                                    alignItems: 'flex-start',
                                  }}>
                                  <VHeader
                                    type="three"
                                    color={'#fff'}
                                    text={section.title}
                                  />
                                </View>
                              );
                            }}
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
                      style={{
                        backgroundColor: '#232323',
                        borderBottomWidth: 1,
                        borderBottomColor: '#232323',
                      }}
                      renderLabel={({route, focused, color}) => {
                        let icon;

                        switch (route.title) {
                          case 'WALLET':
                            return (
                              <MaterialCommunityIcons
                                name="bitcoin"
                                size={25}
                                color={'#fff'}
                              />
                            );
                          case 'TRX':
                            return (
                              <Image
                                source={{
                                  uri: focused
                                    ? 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media&token=9a2ecaeb-5024-4bb7-9dab-6052c3d1c98d'
                                    : 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/TRAKLIST.png?alt=media&token=c03fb331-bf09-4055-9729-271023fcc647',
                                }}
                                style={{
                                  height: 25,
                                  width: 25,
                                  backgroundColor: '#333333',
                                  paddingLeft: 0,
                                  borderRadius: 30,
                                  borderColor: '#cecece',
                                  marginHorizontal: 5,
                                }}
                              />
                            );
                          case 'TOP TRACKS':
                            return (
                              <MaterialCommunityIcons
                                name="chart-timeline-variant-shimmer"
                                size={22}
                                color={'#fff'}
                              />
                            );
                          case 'TOP ARTISTS':
                            return (
                              <MaterialIcons
                                name="face-retouching-natural"
                                size={22}
                                color={'#fff'}
                              />
                            );
                          case 'PLAYLISTS':
                            return (
                              <MaterialIcons
                                name="playlist-play"
                                size={28}
                                color={'#fff'}
                              />
                            );
                          default:
                            return (
                              <MaterialIcons
                                name="alternate-email"
                                size={15}
                                color={'#fff'}
                              />
                            );
                        }
                      }}
                      indicatorStyle={{
                        backgroundColor: colors.light.primary,
                      }}
                    />
                  )}
                />
              </View>
            </ParallaxScrollView>

            {/* hold */}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
