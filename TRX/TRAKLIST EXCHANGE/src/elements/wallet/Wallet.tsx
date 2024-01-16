import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
  SafeAreaView,
} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {NFTWalletTabElement} from '../nft-wallet-tab';
import {TRAKWalletTabElement} from '../trak-wallet-tab';
import {colors} from '../../core';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const WalletElement = ({
  nftWallet = [],
  trakWallet = [],
  nft,
  trak,
  handleNavigateTRAK,
  handleNavigateNFT,
  handleExchange,
  handleConnectWallet,
  hasForchain,
  profile,
  handleReload,
  refreshing,
  setRefreshing,
  handleRefresh,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'CRYPTO'},
    {key: 'second', title: 'NFTs'},
    {key: 'third', title: 'ACTIVITY'},
  ]);

  if (nft == null)
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
            ONE MOMENT PLEASE...
          </Text>
          <ActivityIndicator color="green" size="large" />
        </View>
        <View>
          <Text style={{color: 'white'}}>Taking too long?</Text>
          <Button title="reload" onPress={handleReload} />
        </View>
      </SafeAreaView>
    );
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            padding: 10,
            width: '100%',
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '100%',
              height: 250,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 5,
            }}>
            <VHeader numberOfLines={1} type="four" color={'#fff'} text={'1H'} />
            <VHeader numberOfLines={1} type="four" color={'#fff'} text={'1D'} />
            <VHeader numberOfLines={1} type="four" color={'#fff'} text={'1W'} />
            <VHeader numberOfLines={1} type="four" color={'#fff'} text={'1M'} />
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'ALL'}
            />
          </View>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        style={{backgroundColor: '#1a1a1a'}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return <View style={{backgroundColor: 'red', flex: 1}} />;
            case 'second':
              return (
                <NFTWalletTabElement // NFT Wallet
                  wallet={nftWallet}
                  items={nft}
                  handleNavigateTRAK={handleNavigateTRAK}
                  handleNavigateNFT={handleNavigateNFT}
                  handleExchange={handleExchange}
                  hasForchain={hasForchain}
                  handleConnectWallet={handleConnectWallet}
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  onRefresh={handleRefresh}
                />
              );

            case 'third':
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
                    COMING SOON...
                  </Text>
                </SafeAreaView>
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
            style={{backgroundColor: colors.dark.primary}}
            renderLabel={({route, focused, color}) => (
              <Text style={{color, fontSize: 15, fontWeight: 'bold'}}>
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
