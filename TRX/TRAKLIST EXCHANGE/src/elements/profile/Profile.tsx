import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {VHeader, Body} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import MarqueeText from 'react-native-marquee';

export const ProfileElement = ({
  item,
  isOwner,
  streaming,
  handleToggleProfileVisibility,
  handleToggleFollowUser,
  profile,
  favorites,
  playlists,
}: any) => {
  console.log('🚀 ~ file: Profile.tsx ~ line 31 ~ item', item);
  console.log(
    '🚀 ~ file: Profile.tsx ~ line 15 ~ ProfileElement ~ streaming',
    streaming,
    profile,
    favorites,
  );

  const isPrivate = useSelector((state: any) => state.profile.TRX.isPrivate);

  if (!profile) {
    return <View />;
  }
  return (
    <ScrollView style={{backgroundColor: '#1a1a1a'}}>
      <View style={{alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            // padding: 5,
            // width: '100%',
            borderRadius: 15,
            borderBottomLeftRadius: 25,
            flexDirection: 'row',
            backgroundColor: '#333333',
            margin: 8,
            borderWidth: 3,
            borderColor: '#232323',
            // borderBottomWidth: 1,
            // borderBottomColor: '#fff',
          }}>
          <Image
            source={{uri: item.avatarURL}}
            style={{
              backgroundColor: '#1B4F26',
              height: 130,
              width: 130,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 100,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 15,
              marginRight: 10,
              // borderRadius: 15,
            }}
          />
          <View
            style={{
              paddingVertical: 15,
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginRight: 15,
                  // backgroundColor: 'white',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 3,
                }}>
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color={'#fff'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <VHeader
                  numberOfLines={1}
                  type="five"
                  color={'#fff'}
                  text={item.trak_name}
                />
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#fff'}
                  text={'  [' + item.trak_symbol + ']'}
                />
                <View style={{flexDirection: 'row', marginLeft: 3}}>
                  <Ionicons name="ios-flame-sharp" size={20} color={'orange'} />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: '#cecece',
                    }}>
                    {item.streak}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginRight: 15,
                  // backgroundColor: 'white',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 3,
                }}>
                <MaterialCommunityIcons
                  name="format-quote-close"
                  size={20}
                  color={'#fff'}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Body
                  // numberOfLines={1}
                  type="two"
                  color={'#fff'}
                  text={'"' + item.quotable + '"'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginRight: 15,
                  // backgroundColor: 'white',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 3,
                }}>
                <MaterialIcons
                  name={
                    !isOwner
                      ? 'follow-the-signs'
                      : isPrivate
                      ? 'public'
                      : 'public-off'
                  }
                  size={20}
                  color={'#fff'}
                />
              </View>
              <View>
                {!isOwner ? (
                  <Pressable onPress={handleToggleFollowUser}>
                    <View
                      style={{
                        backgroundColor: 'green',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 3,
                        marginTop: 5,
                      }}>
                      <VHeader
                        // numberOfLines={1}
                        type="five"
                        color={'#fff'}
                        text={'FOLLOW'}
                      />
                    </View>
                  </Pressable>
                ) : (
                  <Pressable onPress={handleToggleProfileVisibility}>
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        borderWidth: 3,
                        borderColor: '#232323',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 3,
                        marginTop: 5,
                      }}>
                      <VHeader
                        // numberOfLines={1}
                        type="six"
                        color={'#fff'}
                        text={isPrivate ? 'GO PUBLIC' : 'GO PRIVATE'}
                      />
                    </View>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={{width: '100%'}}>
          <View style={{marginRight: 15, marginTop: 20, alignSelf: 'flex-end'}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'FAVOURITES'}
            />
          </View>
          <FlatList
            horizontal
            data={isOwner ? favorites : JSON.parse(item.favorites)}
            style={{height: 200}}
            // numColumns={3}
            renderItem={({item, index}: any) => {
              const type = item.info;
              switch (type) {
                case 'topTracks':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1DB954',
                        margin: 5,
                        width: 170,
                        height: 170,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                      }}>
                      <ImageBackground
                        source={item.album.images}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        imageStyle={{borderRadius: 15}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            flex: 1,
                            paddingBottom: 3,
                            opacity: 0.65,
                            borderRadius: 15,
                            backgroundColor: 'whitesmoke',
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 3,
                              paddingHorizontal: 9,
                            }}>
                            <Fontisto name="spotify" size={20} color={'#000'} />
                          </View>
                          <View style={{width: '70%', alignSelf: 'flex-end'}}>
                            <MarqueeText
                              style={{fontSize: 24}}
                              speed={1}
                              marqueeOnStart={true}
                              loop={true}
                              delay={2000}>
                              <VHeader
                                // numberOfLines={2}
                                type="four"
                                color={'indigo'}
                                text={item.name}
                                textAlign="right"
                              />
                            </MarqueeText>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                  );
                case 'topArtists':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1DB954',
                        margin: 5,
                        width: 220,
                        height: 160,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                      }}>
                      <ImageBackground
                        source={item.images}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderRadius: 15,
                        }}
                        imageStyle={{borderRadius: 15}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            flex: 1,
                            opacity: 0.65,
                            borderRadius: 15,
                            backgroundColor: 'whitesmoke',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'flex-end',
                              justifyContent: 'flex-start',
                              flex: 1,
                              opacity: 0.4,
                              paddingLeft: 4,
                              // backgroundColor: 'violet',
                              borderBottomLeftRadius: 15,
                              borderBottomRightRadius: 15,
                              paddingVertical: 5,
                              // borderTopWidth: 2,
                              // borderTopColor: '#1a1a1a',
                            }}>
                            <View
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 3,
                                paddingHorizontal: 9,
                              }}>
                              <Fontisto
                                name="spotify"
                                size={20}
                                color={'#000'}
                              />
                            </View>
                            <VHeader
                              numberOfLines={2}
                              type="four"
                              color={'indigo'}
                              text={item.name}
                              textAlign="right"
                            />
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                  );
                case 'heavyRotation':
                  console.log('🚀 ~ file: Profile.tsx ~ line 207 ~ item', item);

                  return (
                    <View
                      style={{
                        backgroundColor: '#fc3c44',
                        margin: 5,
                        width: 170,
                        height: 170,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                      }}>
                      <ImageBackground
                        source={{uri: item.artwork}}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        imageStyle={{borderRadius: 15}}>
                        <View
                          style={{
                            backgroundColor: '#fc3c44',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            flex: 1,
                            opacity: 0.5,
                          }}>
                          <View
                            style={{
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end',
                              // backgroundColor: 'red',
                              flex: 1,
                            }}>
                            <VHeader
                              // numberOfLines={1}
                              type="four"
                              color={'#fff'}
                              text={item.attributes.name}
                            />
                          </View>
                          <View style={{padding: 3}}>
                            <Fontisto
                              name="applemusic"
                              size={20}
                              color={'#fff'}
                            />
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                  );
                default:
                  return (
                    <View
                      style={{
                        // backgroundColor: '#fff',
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
          <View style={{marginLeft: 20, marginTop: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'PLAYLISTS'}
            />
          </View>
          <FlatList
            horizontal
            data={isOwner ? playlists : JSON.parse(item.playlists)}
            style={{height: 200}}
            // numColumns={3}
            renderItem={({item, index}: any) => {
              const type = item.info;
              switch (type) {
                case 'playlists:spotify':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1DB954',
                        margin: 5,
                        width: 170,
                        height: 170,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                      }}>
                      <ImageBackground
                        source={item.images}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        imageStyle={{borderRadius: 15}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            flex: 1,
                            opacity: 0.65,
                            borderRadius: 15,
                            backgroundColor: 'whitesmoke',
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 3,
                              // paddingHorizontal: 9,
                            }}>
                            <Fontisto name="spotify" size={20} color={'#000'} />
                          </View>
                          <View style={{width: '70%', alignSelf: 'flex-end'}}>
                            <MarqueeText
                              style={{fontSize: 24}}
                              speed={1}
                              marqueeOnStart={true}
                              loop={true}
                              delay={2000}>
                              <VHeader
                                // numberOfLines={2}
                                type="four"
                                color={'indigo'}
                                text={item.name}
                                textAlign="right"
                              />
                            </MarqueeText>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                  );
                case 'playlists:apple_music':
                  console.log(item, 'vrewhe');
                  return (
                    <View
                      style={{
                        backgroundColor: '#fc3c44',
                        margin: 5,
                        width: 170,
                        height: 170,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 3,
                      }}>
                      <ImageBackground
                        source={{uri: item.attributes.artwork.url}}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        imageStyle={{borderRadius: 15}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            flex: 1,
                            opacity: 0.65,
                            borderRadius: 15,
                            backgroundColor: 'whitesmoke',
                            paddingBottom: 5,
                          }}>
                          <View style={{width: '70%', alignSelf: 'flex-end'}}>
                            <MarqueeText
                              style={{fontSize: 24}}
                              speed={1}
                              marqueeOnStart={true}
                              loop={true}
                              delay={2000}>
                              <VHeader
                                // numberOfLines={2}
                                type="four"
                                color={'indigo'}
                                text={item.attributes.name}
                                textAlign="right"
                              />
                            </MarqueeText>
                          </View>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 3,
                              paddingHorizontal: 9,
                            }}>
                            <Fontisto
                              name="applemusic"
                              size={20}
                              color={'#000'}
                            />
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
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

        <View style={{width: '100%'}}>
          <View style={{marginRight: 15, marginTop: 20, alignSelf: 'flex-end'}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'ACTIVITY'}
            />
          </View>
          <FlatList
            data={[0, 0, 0, 0, 0, 0, 0, 0]}
            style={{backgroundColor: '#1a1a1a', width: '100%'}}
            renderItem={({item, index}: any) => {
              return (
                <View
                  style={{
                    backgroundColor: 'grey',
                    flex: 1,
                    margin: 10,
                    height: 150,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>fe</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View>
      </View>
    </ScrollView>
  );
};
