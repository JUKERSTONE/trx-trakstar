import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  Button,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body, Caption, Paragraph} from '../typography';
import {colors} from '../../core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const NFTWalletTabElement = ({
  wallet = [],
  items,
  handleNavigateTRAK,
  isExchange,
  handleExchange,
  handleNavigateNFT,
  handleTRAKRedeem,
  hasForchain,
  handleConnectWallet,
  refreshing,
  setRefreshing,
  onRefresh,
  handleRefresh,
}: any) => {
  console.log('🚀 ~ file: WalletTab.tsx ~ line 11 ~ wallet', wallet);
  console.log('🚀 ~ file: NFTWalletTab.tsx ~ line 11 ~ wallet', wallet);

  if (!hasForchain) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
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
          FORCHAIN Wallet Not Connected
        </Text>
        <Button title="CONNECT" onPress={handleConnectWallet} />
      </SafeAreaView>
    );
  }
  if (wallet.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
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
          No NFTs
        </Text>
        <Button title="refresh" onPress={handleRefresh} />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      style={{flex: 1}}
      refreshControl={
        <RefreshControl
          tintColor="#fff"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <AlphabetList
        data={wallet}
        style={{flex: 1}}
        indexLetterStyle={{
          color: '#000',
        }}
        renderCustomItem={(item: any) => {
          const isNFT = 'NFT' === item.key.split(':')[0];
          const key = item.key;
          const trak = items.find((element: any) => {
            const keyId = item.key.split(':')[1];
            if (isNFT) {
              return element?.nftID === keyId;
            }
            return element?.trakID === keyId;
          });
          return (
            <View
              key={key}
              style={{
                justifyContent: 'center',
                marginHorizontal: 13,
                marginVertical: 10,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderRadius: 10,
                height: 180,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginRight: 20,
                  flex: 1,
                }}>
                <Image
                  source={{
                    uri: isNFT ? trak?.nft.trakIMAGE : trak?.cover_art,
                  }}
                  style={{
                    backgroundColor: '#1B4F26',
                    height: '100%',
                    width: '100%',
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  marginRight: 25,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  maxWidth: '60%',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    marginTop: 20,
                    opacity: 0.9,
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#1a1a1a'}
                    text={isNFT ? trak?.nft.trakTITLE : trak?.title}
                  />
                  <Body
                    numberOfLines={1}
                    type="one"
                    color={'#1a1a1a'}
                    text={isNFT ? trak?.nft.trakARTIST : trak?.artist}
                    textAlign="right"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 2,
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        color: '#1a1a1a',
                      }}>
                      {isNFT ? 'NFT' : trak?.label}
                    </Text>
                    <Caption
                      numberOfLines={1}
                      type="one"
                      color={'#1a1a1a'}
                      text={' • '}
                      textAlign="center"
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        color: '#1a1a1a',
                      }}>
                      {isNFT ? `${trak?.nft.trakIPO} TRX` : trak?.tier}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 2,
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}>
                    <Caption
                      numberOfLines={1}
                      type="one"
                      color={'#1a1a1a'}
                      text={trak.isMinted ? 'minted' : 'not minted'}
                      textAlign="center"
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {!isExchange && isNFT ? (
                    <Pressable
                      onPress={() => handleNavigateNFT({trak})}
                      style={{
                        backgroundColor: 'green',
                        margin: 5,
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        {/* swap-horizontal */}
                        <MaterialIcons
                          name={'redeem'}
                          size={20}
                          color={'#fff'}
                          style={{
                            opacity: 0.9,
                            paddingTop: 0,
                            marginRight: 5,
                          }}
                        />
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                          ACCESS
                        </Text>
                      </View>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => handleNavigateTRAK({trak})}
                      style={{
                        backgroundColor: '#fff',
                        margin: 5,
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        {/* swap-horizontal */}
                        <MaterialIcons
                          name={'redeem'}
                          size={20}
                          color={'green'}
                          style={{
                            opacity: 0.9,
                            paddingTop: 0,
                            marginRight: 5,
                          }}
                        />
                        <Text style={{color: 'green', fontWeight: 'bold'}}>
                          REDEEM
                        </Text>
                      </View>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() => alert('coming soon')}
                    style={{
                      backgroundColor: 'green',
                      padding: 5,
                      margin: 5,
                      borderRadius: 5,
                    }}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        name={'swap-horizontal'}
                        size={25}
                        color={'#fff'}
                        style={{
                          opacity: 0.9,
                          paddingTop: 0,
                          marginRight: 5,
                        }}
                      />
                      <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        LIST ON TRX
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
        renderCustomSectionHeader={section => {
          return (
            <View
              style={{
                backgroundColor: '#1a1a1a',
                padding: 10,
                // borderTopWidth: 2,
                borderBottomWidth: 2,
                borderTopColor: '#cecece',
                borderBottomColor: 'grey',
                shadowOffset: {
                  width: 10,
                  height: 5,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
                shadowColor: 'green',
              }}>
              <Text style={{fontSize: 25, color: '#fff'}}>{section.title}</Text>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};
