import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  useWindowDimensions,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body, Caption} from '../typography';
import {colors} from '../../core';
import {TabView, TabBar} from 'react-native-tab-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ExchangeElement = ({
  trak,
  nft,
  handleExchange,
  handleTextInputChange,
  handleReload,
  isModal,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    !isModal
      ? [
          {key: 'first', title: 'TRAK'},
          {key: 'second', title: 'NFT'},
        ]
      : [{key: 'first', title: 'TRAK'}],
  );

  if (trak == null)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <View style={{padding: 30}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'whitesmoke',
              paddingBottom: 10,
            }}>
            LOADING EXCHANGE...
          </Text>
          <ActivityIndicator color="white" size="large" />
        </View>

        <View>
          <Text style={{color: 'white'}}>Taking too long?</Text>
          <Button title="reload" onPress={() => handleReload()} />
        </View>
      </SafeAreaView>
    );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={handleTextInputChange}
            style={{
              color: '#1a1a1a',
              fontWeight: 'bold',
              fontSize: 13,
            }}
            placeholder={'search'}
          />
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        style={{
          backgroundColor: '#1a1a1a',
          borderTopRightRadius: 25,
          // borderTopLeftRadius: 30,
          marginRight: 7,
        }}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <FlatList
                  data={trak}
                  style={{backgroundColor: '#1a1a1a', marginTop: 3}}
                  renderItem={({item}) => {
                    const isNFT = item.isNFT;
                    let title: any, artist: any, cover_art, uri: any, id: any;
                    switch (isNFT) {
                      case true:
                        title = item.nft.trakTITLE;
                        artist = item.nft.trakARTIST;
                        cover_art = item.nft.trakIMAGE;
                        uri = item.nftURI;
                        id = item.nftID;
                        break;
                      case false:
                        title = item.title;
                        artist = item.artist;
                        cover_art = item.cover_art;
                        uri = item.trakURI;
                        id = item.trakID;
                        break;
                    }

                    return (
                      <Pressable onPress={() => handleExchange({item})}>
                        <View
                          style={{
                            backgroundColor: '#1a1a1a',
                            // paddingVertical: 5,
                            paddingRight: 13,
                            borderBottomColor: '#cecece',
                            borderRadius: 10,
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              height: 100,
                              flexDirection: 'row',
                              borderRadius: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'flex-end',
                                marginRight: 20,
                                flex: 1,
                                borderTopRightRadius: 7,
                                borderBottomRightRadius: 7,
                                borderBottomWidth: 2,
                                borderTopWidth: 2,
                                borderRightWidth: 2,
                                borderColor: '#cecece',
                              }}>
                              <Image
                                source={{uri: cover_art}}
                                style={{
                                  backgroundColor: '#1B4F26',
                                  height: '100%',
                                  width: '100%',
                                  borderTopRightRadius: 5,
                                  borderBottomRightRadius: 5,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                maxWidth: '60%',
                              }}>
                              <VHeader
                                numberOfLines={1}
                                type="four"
                                color={'#fff'}
                                text={title}
                              />
                              <Body
                                numberOfLines={1}
                                type="one"
                                color={'#fff'}
                                text={artist}
                                textAlign="right"
                              />
                              <View
                                style={{flexDirection: 'row', marginTop: 3}}>
                                {!isModal && (
                                  <View
                                    style={{
                                      backgroundColor: 'green',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingHorizontal: 6,
                                      paddingVertical: 3,
                                      borderRadius: 3,
                                      marginRight: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={'#fff'}
                                      text={'BUY'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}

                                {!isNFT && (
                                  <View
                                    style={{
                                      backgroundColor: !isNFT
                                        ? '#fff'
                                        : '#1a1a1a',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      paddingHorizontal: 6,
                                      paddingVertical: 3,
                                      borderRadius: 3,
                                      marginRight: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={!isNFT ? 'green' : '#fff'}
                                      text={'SWAP'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    );
                  }}
                  keyExtractor={item => {
                    switch (item.isNFT) {
                      case true:
                        return item.nftURI;
                      case false:
                        return item.trakURI;
                    }
                  }}
                />
              );
            case 'second':
              return (
                <FlatList
                  data={nft}
                  style={{backgroundColor: '#1a1a1a', marginTop: 10}}
                  renderItem={({item}) => {
                    console.log(
                      '🚀 ~ file: Exchange.tsx ~ line 257 ~ item',
                      item,
                    );
                    const isNFT = item.isNFT;
                    let title: any,
                      artist: any,
                      cover_art,
                      uri: any,
                      id: any,
                      price: any,
                      hasMerchandise: any,
                      hasMedia: any,
                      hasTickets: any,
                      hasBTC: any,
                      hasSTX: any,
                      hasADA: any,
                      hasSOL: any,
                      isSoldOut: any;
                    switch (isNFT) {
                      case true:
                        title = item.nft.trakTITLE;
                        artist = item.nft.trakARTIST;
                        cover_art = item.nft.trakIMAGE;
                        price = item.nft.trakPRICE.toFixed(2);
                        uri = item.nftURI;
                        id = item.nftID;
                        hasMerchandise = item.nft.trakPRODUCTS.some(
                          (product: any) => product.type === 'merchandise',
                        );
                        hasMedia = item.nft.trakPRODUCTS.some(
                          (product: any) => product.type === 'media',
                        );
                        hasTickets = item.nft.trakPRODUCTS.some(
                          (product: any) => product.type === 'tickets',
                        );
                        console.log(
                          '🚀 ~ file: Exchange.tsx ~ line 294 ~ item.nft.trakCOPIE',
                          item.nft.trakCOPIES,
                        );
                        hasBTC = item.nft.trakCOPIES?.btc !== 0;
                        hasSTX = item.nft.trakCOPIES?.stx !== 0;
                        hasADA = item.nft.trakCOPIES?.ada !== 0;
                        hasSOL = item.nft.trakCOPIES?.sol !== 0;
                        isSoldOut =
                          item.nft.trakCOPIES?.btc === 0 &&
                          item.nft.trakCOPIES?.stx === 0 &&
                          item.nft.trakCOPIES?.ada === 0 &&
                          item.nft.trakCOPIES?.sol === 0;
                        break;
                      case false:
                        title = item.title;
                        artist = item.artist;
                        cover_art = item.cover_art;
                        uri = item.trakURI;
                        id = item.trakID;
                        break;
                    }

                    return (
                      <Pressable onPress={() => handleExchange({item})}>
                        <View
                          style={{
                            backgroundColor: '#1a1a1a',
                            borderBottomColor: '#cecece',
                            borderRadius: 10,
                            marginBottom: 10,
                            paddingRight: 13,
                          }}>
                          <View
                            style={{
                              height: 100,
                              flexDirection: 'row',
                              borderRadius: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'flex-end',
                                marginRight: 20,
                                flex: 1,
                                borderTopRightRadius: 7,
                                borderBottomRightRadius: 7,
                                borderBottomWidth: 2,
                                borderTopWidth: 2,
                                borderRightWidth: 2,
                                borderColor: '#cecece',
                              }}>
                              <ImageBackground
                                source={{uri: cover_art}}
                                style={{
                                  backgroundColor: '#1B4F26',
                                  height: '100%',
                                  width: '100%',
                                  borderTopRightRadius: 5,
                                  borderBottomRightRadius: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    backgroundColor: '#1a1a1a',
                                    width: '100%',
                                    position: 'absolute',
                                    padding: 4,
                                    bottom: 0,
                                    opacity: 0.7,
                                    justifyContent: 'center',
                                    borderBottomRightRadius: 5,
                                  }}>
                                  {hasMedia && (
                                    <FontAwesome5
                                      name="record-vinyl"
                                      color={'whitesmoke'}
                                      size={21}
                                      style={{marginRight: 5}}
                                    />
                                  )}
                                  {hasTickets && (
                                    <FontAwesome5
                                      name="ticket-alt"
                                      color={'whitesmoke'}
                                      size={22}
                                      style={{marginRight: 5}}
                                    />
                                  )}
                                  {hasMerchandise && (
                                    <FontAwesome5
                                      name="tshirt"
                                      color={'whitesmoke'}
                                      size={20}
                                    />
                                  )}
                                </View>
                              </ImageBackground>
                            </View>
                            <View
                              style={{
                                backgroundColor: 'transparent',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                maxWidth: '60%',
                              }}>
                              <VHeader
                                numberOfLines={1}
                                type="four"
                                color={'#fff'}
                                text={title}
                              />
                              <Body
                                numberOfLines={1}
                                type="one"
                                color={'#fff'}
                                text={artist}
                                textAlign="right"
                              />

                              <View
                                style={{flexDirection: 'row', marginTop: 3}}>
                                <View
                                  style={{
                                    backgroundColor: 'green',
                                    paddingVertical: 3,
                                    paddingHorizontal: 8,
                                    borderRadius: 3,
                                    marginRight: 5,
                                  }}>
                                  <Caption
                                    numberOfLines={1}
                                    type="two"
                                    color={'#fff'}
                                    text={`${price} TRX`}
                                    textAlign="right"
                                  />
                                </View>
                                <View
                                  style={{
                                    backgroundColor: '#fff',
                                    paddingVertical: 3,
                                    paddingHorizontal: 8,
                                    borderRadius: 3,
                                  }}>
                                  <Caption
                                    numberOfLines={1}
                                    type="two"
                                    color={'green'}
                                    text="PRIMARY"
                                    textAlign="right"
                                  />
                                </View>

                                {!isNFT && (
                                  <View
                                    style={{
                                      backgroundColor: !isNFT
                                        ? '#fff'
                                        : '#1a1a1a',
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginLeft: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={!isNFT ? 'green' : '#fff'}
                                      text={'SWAP'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                              </View>
                              <View style={{flexDirection: 'row'}}>
                                {hasBTC && (
                                  <View
                                    style={{
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginLeft: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={'#f2a900'}
                                      text={'BTC'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                                {hasSTX && (
                                  <View
                                    style={{
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginLeft: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={'#595CF2'}
                                      text={'STX'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                                {hasADA && (
                                  <View
                                    style={{
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginLeft: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={'#2a71d0'}
                                      text={'ADA'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                                {hasSOL && (
                                  <View
                                    style={{
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginLeft: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={'#00FFA3'}
                                      text={'SOL'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                                {isSoldOut && (
                                  <View
                                    style={{
                                      backgroundColor: 'green',
                                      marginTop: 4,
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginRight: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="two"
                                      color={'#fff'}
                                      text={'SOLD OUT'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    );
                  }}
                  keyExtractor={item => {
                    switch (item.isNFT) {
                      case true:
                        return item.nftURI;
                      case false:
                        return item.trakURI;
                    }
                  }}
                />
              );
            case 'third':
              return <View style={{backgroundColor: 'red', flex: 1}} />;
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
                  color: !focused ? '#fff' : colors.light.primary,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: colors.light.primary}}
          />
        )}
      />
    </>
  );
};
