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
  TextInput,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';

export const PortfolioElement = ({portfolio, handleNavigateNFT}: any) => {
  console.log('🚀 ~ file: Portfolio.tsx ~ line 20 ~ portfolio', portfolio);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'REQUESTS'},
    {key: 'second', title: 'ORIGINALS'},
  ]);
  const layout = useWindowDimensions();

  if (
    portfolio.length === 0 ||
    (portfolio?.requests?.length === 0 && portfolio?.originals?.length === 0)
  ) {
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
          You don't have any items in your Portofilio
        </Text>
        <Text style={{color: 'white'}}>
          Make a request to bernie in the Distro tab
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <TabView
        swipeEnabled={false}
        navigationState={{index, routes}}
        style={{height: Dimensions.get('window').height * 2.5}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <FlatList
                  data={portfolio.requests}
                  // style={{height: '84%'}}
                  renderItem={({item}) => {
                    console.log(
                      '🚀 ~ file: Portfolio.tsx:72 ~ PortfolioElement ~ item:',
                      item,
                    );
                    const trak = item.serialized_trak
                      ? JSON.parse(item.serialized_trak)
                      : null;
                    console.log(
                      '🚀 ~ file: Portfolio.tsx:77 ~ PortfolioElement ~ trak:',
                      trak,
                    );
                    // console.log('🚀 ~ file: Seed.tsx ~ line 110 ~ item', item);

                    return (
                      <View
                        style={{
                          margin: 10,
                        }}>
                        <View
                          style={{
                            height: 80,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              justifyContent: 'flex-end',
                              marginRight: 20,
                              // backgroundColor: 'blue',
                              flex: 1,
                            }}>
                            <Image
                              source={{uri: trak.cover_art}}
                              style={{
                                backgroundColor: '#1B4F26',
                                height: '100%',
                                width: '100%',
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              marginRight: 25,
                              backgroundColor: 'transparent',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              maxWidth: '60%',
                            }}>
                            <VHeader
                              numberOfLines={1}
                              type="four"
                              color={'#fff'}
                              text={trak.title}
                            />
                            <Body
                              numberOfLines={1}
                              type="one"
                              color={'#fff'}
                              text={trak.artist}
                              textAlign="right"
                            />
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={item => item.id}
                />
              );
            case 'second':
              return (
                <FlatList
                  data={portfolio.originals}
                  // style={{height: '84%'}}
                  renderItem={({item}) => {
                    // console.log('🚀 ~ file: Seed.tsx ~ line 110 ~ item', item);
                    const trak = item.serialized_trak
                      ? JSON.parse(item.serialized_trak)
                      : null;
                    return (
                      <View
                        style={{
                          margin: 10,
                        }}>
                        <View
                          style={{
                            height: 80,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              justifyContent: 'flex-end',
                              marginRight: 20,
                              // backgroundColor: 'blue',
                              flex: 1,
                            }}>
                            <Image
                              source={{uri: trak.cover_art}}
                              style={{
                                backgroundColor: '#1B4F26',
                                height: '100%',
                                width: '100%',
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <View
                            style={{
                              marginRight: 25,
                              backgroundColor: 'transparent',
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                              maxWidth: '60%',
                            }}>
                            <VHeader
                              numberOfLines={1}
                              type="four"
                              color={'#fff'}
                              text={trak.title}
                            />
                            <Body
                              numberOfLines={1}
                              type="one"
                              color={'#fff'}
                              text={trak.artist}
                              textAlign="right"
                            />
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={item => item.id}
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
            renderLabel={({route, focused, color}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: focused ? '#fff' : 'grey',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    {route.title}
                  </Text>
                </View>
              );
            }}
            indicatorStyle={{backgroundColor: '#1a1a1a'}}
          />
        )}
      />
    </SafeAreaView>
  );
};
