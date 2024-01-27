import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {VHeader, Body, Caption, Paragraph} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import {CreditsContainer} from '../../containers';
import moment from 'moment';
import {
  PlayerContext,
  handleQueueControlsAction,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';

export const TRAKElement = ({
  TRAK,
  handleNavigateBlankDisc,
  handleSeeMoreMeta,
  item,
  handleNFTNavigation,
  handleTRAKInteraction,
  handleYouTube,
  handleComment,
  handleSubmitComment,
  handleGenius,
  TRXProfile,
  handleSpotify,
  pressedLike,
  ...props
}: any) => {
  console.log('🚀 ~ file: TRAK.tsx:55 ~ handleGenius:', item);
  console.log('🚀 ~ file: TRAK.tsx ~ line 53 ~ TRXProfile', TRXProfile);
  console.log('🚀 ~ file: TRAK.tsx ~ line 28 ~ item', item);
  const {trak, meta} = item;
  console.log('🚀 ~ file: TRAK.tsx ~ line 33 ~ trak', trak);
  console.log('🚀 ~ file: TRAK.tsx ~ line 33 ~ meta', meta);

  const youtubeId = trak?.youtube?.url?.split('=');
  console.log('🚀 ~ file: TRAK.tsx ~ line 51 ~ youtubeId', youtubeId);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'fifth', title: 'CREDITS'},
    {key: 'first', title: 'REACT'},
    {key: 'second', title: 'TICKETS'},
    {key: 'third', title: 'MEDIA'},
    {key: 'fourth', title: 'MERCH'},
  ]);
  const layout = useWindowDimensions();

  const threadRef: any = useRef();

  const {
    userData: {swiperRef},
    setUserData,
  } = useContext(PlayerContext);

  const hasLiked = item.likes?.some((item: any) => {
    console.log('🚀 ~ file: TRAK.tsx ~ line 78 ~ test ~ item', item);
    return item.id == TRXProfile.trak_name;
  });

  console.log('🚀 ~ file: TRAK.tsx ~ line 81 ~ hasLiked ~ hasLiked', hasLiked);

  let talk = '';
  function traverseBody(node: any) {
    console.log('🚀 ~ file: TRAK.tsx ~ line 60 ~ traverseBody ~ node', node);

    if (node.tag === 'img') return '';

    if (node?.children?.length) {
      // Loop over every child node
      node.children.forEach((child: any) => {
        console.log(
          '🚀 ~ file: TRAK.tsx ~ line 68 ~ node.children.forEach ~ child',
          child,
        );
        // If it's a type 1, call the function recursively
        if (typeof child === 'string' || child instanceof String) {
          console.log(child, 'string');
          talk = talk + ' ' + child;
        } else {
          console.log(child, 'object');

          return traverseBody(child);
        }
      });
      console.log(
        '🚀 ~ file: TRAK.tsx ~ line 69 ~ node.children.forEach ~ talk',
        talk,
      );
      return talk;
    }
  }

  const description = traverseBody(meta.description.dom);
  console.log('🚀 ~ file: TRAK.tsx ~ line 84 ~ description', description);

  const handlePlay = () => {
    //
    //
  };

  if (item == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: layout.height,
        }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );

  return (
    <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <ParallaxScrollView
        backgroundColor="#cecece"
        contentBackgroundColor="#1a1a1a"
        parallaxHeaderHeight={500}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <ImageBackground
            source={{uri: trak.thumbnail}}
            style={{
              height: 580,
              opacity: 0.2,
              padding: 6,
              paddingBottom: 80,
              backgroundColor: '#1A1A1A',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}></ImageBackground>
        )}
        renderForeground={() => (
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              padding: 15,
              // backgroundColor: 'red',
              // alignItems: 'center',
            }}>
            <View
              style={{
                // height: 100,
                // backgroundColor: 'blue',
                flexDirection: 'row',
                // marginBottom: ,
              }}>
              <View
                style={{
                  flex: 3,
                }}>
                <Image
                  source={{uri: trak.thumbnail}}
                  style={{
                    backgroundColor: '#1B4F26',
                    height: 100,
                    width: '100%',
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  // backgroundColor: 'red',
                  justifyContent: 'center',
                  flex: 4,
                  paddingLeft: 15,
                }}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'#1a1a1a'}
                  text={trak.title}
                />
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#1a1a1a'}
                  text={trak.artist}
                />
              </View>
            </View>

            {description?.trim() !== '?' && (
              <View
                style={{
                  // backgroundColor: '#fff',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  marginTop: 10,
                  borderRadius: 5,
                  opacity: 0.7,
                  paddingBottom: 8,
                }}>
                <View style={{marginVertical: 0}}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      alignSelf: 'flex-end',
                      paddingVertical: 3,
                      paddingHorizontal: 7,
                      borderRadius: 5,
                      marginBottom: 3,
                    }}>
                    <Caption
                      type="one"
                      color={'#1a1a1a'}
                      text={`... PREVIEW`}
                      textAlign="right"
                    />
                  </View>
                </View>
                <Caption
                  type="one"
                  color={'#1a1a1a'}
                  text={description?.trim() === '?' ? '' : description!}
                  textAlign="right"
                  numberOfLines={4}
                />
              </View>
            )}

            <View style={{backgroundColor: 'transparent', padding: 5}}>
              <View style={{marginVertical: 5}}>
                {meta.release_date && (
                  <Paragraph
                    type="three"
                    color={'#232323'}
                    text={`RELEASED ${moment(meta.release_date).format(
                      'MMMM d, YYYY',
                    )}.`}
                    textAlign="right"
                  />
                )}
                {!meta.recording_location &&
                  meta.recording_location !== '' &&
                  meta.recording_location !== null && (
                    <Paragraph
                      type="three"
                      color={'#232323'}
                      text={`RECORDED at ${meta.recording_location}.`}
                      textAlign="right"
                      numberOfLines={1}
                    />
                  )}
              </View>
            </View>
            {meta.featured_artists.length !== 0 && (
              <View
                style={{
                  // borderBottomWidth: 2,
                  padding: 10,
                  backgroundColor: '#1a1a1a',
                  height: 170,
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    // borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    padding: 5,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 8,
                  }}>
                  <Body
                    numberOfLines={1}
                    type="one"
                    color={'#1a1a1a'}
                    text={'FEATURING'}
                  />
                </View>

                <FlatList
                  horizontal
                  listKey="TRAK3"
                  data={meta.featured_artists}
                  renderItem={({item, index}) => {
                    console.log('🚀 ~ file: TRAK.tsx ~ line 379 ~ item', item);

                    return (
                      <TouchableOpacity onPress={() => handleGenius(item)}>
                        <View
                          style={{
                            // paddingBottom: 10,
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{
                              height: 60,
                              width: 60,
                              borderRadius: 10,
                              margin: 10,
                            }}
                            source={{uri: item.image_url}}
                          />
                          <View
                            style={{
                              // borderBottomWidth: 1,
                              borderBottomColor: 'white',
                              padding: 3,
                              alignItems: 'center',
                              backgroundColor: '#fff',
                              borderRadius: 5,
                              marginVertical: 6,
                              paddingHorizontal: 8,
                            }}>
                            <Body
                              numberOfLines={1}
                              type="two"
                              color={'#1a1a1a'}
                              text={item.name}
                            />
                          </View>
                          {/* <Body type="two" color={'#fff'} text={item.name} /> */}
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => '' + index}
                />
              </View>
            )}

            <View
              style={{
                // flex: 0.5,
                justifyContent: 'space-around',
                flexDirection: 'row',
                // alignItems: 'center',
                width: '100%',
                alignSelf: 'center',
                // paddingBottom: 15,
                // backgroundColor: '#1db954',
                marginTop: 15,
              }}>
              {(trak?.spotify?.id || trak.apple_music?.id) && (
                <TouchableOpacity
                  disabled={pressedLike}
                  onPress={() =>
                    pressedLike
                      ? alert('already liked')
                      : handleTRAKInteraction({type: 'save', trak, item})
                  }>
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      backgroundColor: !pressedLike ? '#fff' : '#1db954',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Ionicons
                      name={!pressedLike ? 'ios-heart-outline' : 'heart'}
                      size={24}
                      color={!pressedLike ? '#1db954' : '#fff'}
                    />
                  </View>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  const action = handleMediaPlayerAction({
                    playbackState: 'repeat:force',
                  });
                  store.dispatch(action);

                  Alert.alert(
                    `Share or sendd 👻`,
                    `Share to social media or DMs?`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {
                          const action = handleMediaPlayerAction({
                            playbackState: 'repeat:force:off',
                          });
                          store.dispatch(action);
                          console.log('Cancel Pressed');
                        },
                        style: 'cancel',
                      },
                      {
                        text: 'SEND',
                        onPress: async () => {
                          handleTRAKInteraction({
                            type: 'send',
                            trak,
                          });
                        },
                      },
                      {
                        text: 'SHARE',
                        onPress: async () => {
                          const action = handleMediaPlayerAction({
                            playbackState: 'share',
                          });
                          store.dispatch(action);
                        },
                      },
                    ],
                  );
                }}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name={'send-to-mobile'}
                    size={23}
                    color={'#a2c'}
                  />
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => threadRef.current.focus()}> */}
              {trak.spotify && (
                <TouchableOpacity onPress={() => handleSpotify(trak)}>
                  <View
                    style={{
                      height: 45,
                      width: 45,
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="spotify"
                      size={25}
                      color={'#1db954'}
                    />
                  </View>
                </TouchableOpacity>
              )}

              {/* <TouchableOpacity onPress={() => swiperRef.current.swipeRight()}> */}

              <TouchableOpacity onPress={() => handleGenius(item)}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: '#ffff64',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2.5,
                    borderColor: '#f7931a',
                  }}>
                  <Image
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMd1w4uHyX5N9t2W3b_FV-94n1yTXbtH8wvoMWfaHTPyYnORP5XC7lD6_L-TIF7lnLdbg&usqp=CAU',
                    }}
                    style={{
                      borderRadius: 8,
                      height: 32,
                      width: 32,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('To staking pools')}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    backgroundColor: '#f7931a',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2.5,
                    borderColor: '#fff',
                  }}>
                  <MaterialCommunityIcons
                    name={'pool'}
                    size={26}
                    color={'#fff'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {description?.trim() === '?' && (
              <View style={{marginTop: 10}}>
                <View
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    padding: 5,
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={'Add description'}
                  />
                </View>
                <TextInput
                  // value={merchandise.brand}
                  style={{
                    height: 70,
                    marginBottom: 5,
                    backgroundColor: '#1a1a1ace',
                    flexDirection: 'row',
                    padding: 20,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    color: '#fff',
                  }}
                  multiline={true}
                  // onChangeText={text => setMerchandise({...merchandise, brand: text})}
                />

                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: '#1db94a',
                    borderRadius: 5,
                    alignSelf: 'flex-end',
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="six"
                    color={'#fff'}
                    text={'send'}
                  />
                </View>
              </View>
            )}
          </View>
        )}>
        <View style={{padding: 10}}>
          <View>
            {trak.youtube?.url && (
              <>
                <View
                  style={{
                    // borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    padding: 5,
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    marginBottom: 5,
                  }}>
                  <Body
                    numberOfLines={1}
                    type="two"
                    color={'#1A1A1A'}
                    text={'MEDIA'}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: 'transparent',
                    padding: 5,
                    paddingBottom: 10,
                  }}>
                  <YoutubePlayer
                    height={200}
                    play={false}
                    videoId={youtubeId[1]}
                    onChangeState={handleYouTube}
                  />
                </View>
              </>
            )}
          </View>
          <View style={{padding: 5}}>
            <Body
              type="one"
              color={'#fff'}
              text={description?.trim() === '?' ? '' : description!}
            />
          </View>
        </View>

        <View
          style={{borderTopWidth: 2, borderTopColor: '#fff', minHeight: 900}}>
          <TabView
            swipeEnabled={false}
            navigationState={{index, routes}}
            style={{backgroundColor: '#1a1a1a'}}
            renderScene={({route}) => {
              switch (route.key) {
                case 'first':
                  console.log(
                    '🚀 ~ file: TRAK.tsx ~ line 421 ~ description',
                    description,
                  );
                  return (
                    <View
                      style={{
                        minHeight: threadRef.current?.isFocused() ? 445 : 40,
                        // backgroundColor: 'red',
                        margin: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: TRXProfile.avatarURL}}
                        style={{
                          backgroundColor: '#1B4F26',
                          height: 50,
                          width: 50,
                          borderRadius: 10,
                          margin: 5,
                        }}
                      />
                      <TextInput
                        ref={threadRef}
                        style={{
                          backgroundColor: 'white',
                          height: 75,
                          borderRadius: 10,
                          padding: 10,
                          flex: 1,
                        }}
                        onChangeText={handleComment}
                        placeholder="Comment"
                        // value={details['password']}
                        // secureTextEntry={seePassword ? false : true}
                      />
                      {/* <TouchableOpacity onPress={() => handleSubmitComment(item)}> */}
                      <TouchableOpacity
                        onPress={() => alert('Comments coming soon...')}>
                        <Image
                          source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png',
                          }}
                          style={{
                            // backgroundColor: '#1B4F26',
                            height: 30,
                            width: 30,
                            borderRadius: 10,
                            margin: 10,
                          }}
                        />
                      </TouchableOpacity>
                      {/* <View>
                        <Button
                          title="send"
                          onPress={() => handleSubmitComment(item)}
                        />
                      </View> */}
                    </View>
                  );
                case 'second':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 50,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <FontAwesome5 name="lock" color={'#fff'} size={100} />
                      </View>

                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#fff'}
                        text={'BECOME A FAN!'}
                      />
                    </View>
                  );
                case 'third':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 50,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <FontAwesome5 name="lock" color={'#fff'} size={100} />
                      </View>
                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#fff'}
                        text={'BECOME A FAN!'}
                      />
                    </View>
                  );
                case 'fourth':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 50,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <FontAwesome5 name="lock" color={'#fff'} size={100} />
                      </View>
                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#fff'}
                        text={'BECOME A FAN!'}
                      />
                    </View>
                  );
                case 'fifth':
                  return (
                    <CreditsContainer
                      item={meta.song_relationships}
                      producer_artists={meta.producer_artists}
                      writer_artists={meta.writer_artists}
                      custom_performances={meta.custom_performances}
                      {...props}
                    />
                  );
                default:
                  return <View style={{backgroundColor: '#1a1a1a', flex: 1}} />;
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
                renderLabel={({route, focused, color}) => {
                  switch (route.title) {
                    case 'REACT':
                      return (
                        <FontAwesome5
                          name={'comments'}
                          size={24}
                          color={focused ? '#1db954' : '#cecece'}
                        />
                      );
                    case 'CREDITS':
                      return (
                        <MaterialCommunityIcons
                          name={'face-man-shimmer'}
                          size={24}
                          color={focused ? '#1db954' : '#cecece'}
                        />
                      );
                    case 'TICKETS':
                      return (
                        <FontAwesome5
                          name={'ticket-alt'}
                          size={24}
                          color={focused ? '#1db954' : '#cecece'}
                        />
                      );
                    case 'MEDIA':
                      return (
                        <MaterialIcons
                          name={'perm-media'}
                          size={24}
                          color={focused ? '#1db954' : '#cecece'}
                        />
                      );
                    case 'MERCH':
                      return (
                        <Ionicons
                          name={'ios-shirt'}
                          size={24}
                          color={focused ? '#1db954' : '#cecece'}
                        />
                      );
                    default:
                      return (
                        // LAND
                        // <Text
                        //   style={{
                        //     color: !focused ? 'grey' : 'white',
                        //     fontSize: 13,
                        //     fontWeight: 'bold',
                        //     textAlign: 'center',
                        //   }}>
                        //   {route.title}
                        // </Text>
                        <Ionicons
                          name={'heart'}
                          size={24}
                          color={focused ? '#1db954' : '#cecece'}
                        />
                      );
                      break;
                  }
                }}
                indicatorStyle={{backgroundColor: 'transparent'}}
              />
            )}
          />
        </View>
      </ParallaxScrollView>
    </View>
  );
};
