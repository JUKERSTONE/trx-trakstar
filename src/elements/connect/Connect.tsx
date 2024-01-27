import React from 'react';
import {View, Image, Button, Dimensions, TouchableOpacity} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ConnectElement = ({
  authorizeSpotify,
  authorizeGoogle,
  isAuthenticatedSpotify,
  handleNavigateNext,
  handleNavigateSignIn,
  handleAuthorizeSpotify,
  handleAuthorizeAppleMusic,
  isAuthenticatedAppleMusic,
  handleSkipConnect,
  navigation,
}: any) => {
  return (
    <ParallaxScrollView
      backgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={200}
      stickyHeaderHeight={150}
      renderBackground={() => (
        <LinearGradient colors={['#1a1a1a', '#000']}>
          <View
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomWidth: 1.8,
              // borderColor: '#fff',
            }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                marginTop: 3,
                borderRadius: 8,
              }}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
              }}
            />

            {/*  */}
          </View>
        </LinearGradient>
      )}>
      <View
        style={{
          backgroundColor: '#1a1a1a',
          height: '100%',
          padding: 10,
        }}>
        <View style={{padding: 4}}>
          <VHeader type="three" color="#cecece" text={'WELCOME TO TRAKSTAR.'} />
          <Caption
            type="one"
            color="#cecece"
            text={'Begin registration by connecting to services.'}
          />
        </View>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <View style={{justifyContent: 'center'}}>
              {!isAuthenticatedAppleMusic && (
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={handleAuthorizeSpotify}>
                    <View
                      style={{
                        backgroundColor: '#1ed760',
                        margin: 5,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{
                          height: 60,
                          width: '100%',
                          borderRadius: 8,
                        }}
                        source={{
                          uri: 'https://www.scdn.co/i/_global/open-graph-default.png',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                onPress={() => handleAuthorizeAppleMusic(false)}>
                <View
                  style={{
                    backgroundColor: '#000',
                    margin: 5,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 60,
                      width: '100%',
                      borderRadius: 8,
                    }}
                    source={{
                      uri: 'https://img.olhardigital.com.br/wp-content/uploads/2019/02/20190222045717.jpg',
                    }}
                  />
                </View>
              </TouchableOpacity>

              {(isAuthenticatedSpotify || isAuthenticatedAppleMusic) && (
                <Button title="NEXT" onPress={handleNavigateNext} />
              )}
            </View>
            <TouchableOpacity onPress={handleNavigateSignIn}>
              <View
                style={{
                  backgroundColor: '#fff',
                  margin: 5,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 15,
                }}>
                <Caption
                  type="one"
                  color="#1a1a1a"
                  text={'SIGN IN'}
                  textAlign="right"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkipConnect}>
              <View
                style={{
                  // backgroundColor: '#9D44B5',
                  margin: 5,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 15,
                }}>
                <MaterialIcons
                  name="control-point-duplicate"
                  size={20}
                  color={'#cecece'}
                  style={{marginRight: 10}}
                />
                <Caption
                  type="two"
                  color="whitesmoke"
                  text={'CONTINUE WITHOUT CONNECTING'}
                  textAlign="right"
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 180,
                alignItems: 'center',
                justifyContent: 'space-around',
                // borderColor: '#fff',
              }}>
              <Image
                style={{
                  height: 150,
                  width: '100%',
                  marginTop: 3,
                  borderRadius: 8,
                }}
                resizeMode="cover"
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/fun.png?alt=media&token=95ce849d-d464-425c-a383-51bd1467bbd4',
                }}
              />

              {/*  */}
            </View>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
};
