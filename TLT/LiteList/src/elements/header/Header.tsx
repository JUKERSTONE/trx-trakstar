import {
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import React, {useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {VHeader, Caption} from '../typography';
import {useSelector} from 'react-redux';
import {ProgressBar, Colors} from 'react-native-paper';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';
import {
  PlayerContext,
  handleQueueControlsAction,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useAppBrowser} from '../../containers';

export const HeaderElement = ({
  handleDeposit,
  hasBackButton = false,
  handleGoBack,
  handleAuthentication,
  isLoggedIn,
  isModal,
  handleProfile,
  handleCloseModal,
  navigation,
  TRXProfile,
  backgroundColor = '#1a1a1a',
  hasTRAKLIST,
  handleResumeOnTRAKLIST,
  handleSkipOnTRAKLIST,
  hasShazam,
  handlePlayOnTRAKLIST,
  handleTestBeReal,
  handleNavigateSearch,
  hasSearch,
  handleNavigateSwipe,
  handleNavigateBasket,
  handleNavigateShop,
  handleNavigatePaywall,
  hasBasket,
  handleShazam,
  handleClearCache,
  hasChat,

  handleNavigateConnect,
}: any) => {
  const player = useSelector((state: any) => state.player);
  const profile = useSelector((state: any) => state.profile);
  const {basket} = useSelector((state: any) => state.checkout);
  const nowPlaying = player.players.spotify;
  const players = player.players;
  const userCategory = TRXProfile.userCategory;

  const {userData, setUserData} = useContext(PlayerContext);

  return (
    <SafeAreaView
      style={{
        backgroundColor,
        // height: isModal ? (userCategory !== 'apple_music' ? 100 : 100) : null,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          padding: 5,
        }}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: isLoggedIn ? 'silver' : 'green',
              minWidth: 80,
              paddingRight: 8,
              borderRadius: 10,
              borderColor: isLoggedIn ? '#fff' : 'transparent',
              justifyContent: 'center',
            }}>
            {hasBackButton ? (
              <TouchableOpacity
                onPress={handleGoBack}
                style={{flexDirection: 'row'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    marginRight: 7,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="five"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={'BACK'}
                  />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialCommunityIcons
                    name={'backspace'}
                    size={23}
                    color={'#fff'}
                    style={{opacity: 0.9, paddingTop: 0}}
                  />
                </View>
              </TouchableOpacity>
            ) : hasBasket ? (
              <TouchableOpacity
                onPress={handleNavigateBasket}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 8,
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name={'basket'}
                    size={20}
                    color={'#1db954'}
                    style={{opacity: 0.9, paddingRight: 5}}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                  }}>
                  <VHeader
                    type="six"
                    color={'#1db954'}
                    text={basket.length === 0 ? 'BASKET' : 'CHECKOUT'}
                  />
                </View>
              </TouchableOpacity>
            ) : !hasShazam ? (
              <TouchableOpacity
                onPress={handleProfile}
                style={{flexDirection: 'row'}}>
                {hasChat ? (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <MaterialCommunityIcons
                      name={'android-messages'}
                      size={28}
                      color={'#fff'}
                      style={{opacity: 0.9, paddingRight: 5, paddingTop: 2}}
                    />
                  </View>
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <MaterialCommunityIcons
                      name={'access-point'}
                      size={28}
                      color={'#fff'}
                      style={{opacity: 0.9, paddingRight: 5, paddingTop: 2}}
                    />
                  </View>
                )}
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="six"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={TRXProfile.trak_name}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleShazam}
                style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Fontisto
                    name={'shazam'}
                    size={22}
                    color={'#fff'}
                    style={{opacity: 0.9, paddingRight: 5, paddingTop: 2}}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="five"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={'SHAZAM'}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() =>
              isLoggedIn &&
              Alert.alert(`Menu`, `What would you like to do?`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Chat',
                  onPress: handleProfile,
                },
                {
                  text: 'Shop',
                  onPress: handleNavigateShop,
                },
                {
                  text: 'Upgrade',
                  onPress: handleNavigatePaywall,
                },
                {
                  text: 'Clear Cache',
                  onPress: handleClearCache,
                },
                {
                  text: 'Sign Out',
                  onPress: async () => handleAuthentication(isModal),
                },
                {
                  text: 'Delete Account',
                  onPress: async () => handleAuthentication(isModal, 'delete'),
                },
              ])
            }>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%20169.png?alt=media&token=bcc5f8df-4e6a-4a66-b51a-0049d45576ec',
              }}
              style={{
                flex: 1,
                backgroundColor: '#333333',
                paddingLeft: 0,
                borderRadius: 9,
                borderWidth: 2,
                borderColor: '#cecece',
                marginHorizontal: 5,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleAuthentication(isModal)}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: isLoggedIn ? 'transparent' : 'transparent',
                paddingVertical: 2,
                paddingLeft: 5,
                // borderRadius: 10,
                marginRight: 5,
                borderColor: 'whitesmoke',
                // borderLeftWidth: 1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 2,
                  // marginRight: 1,
                }}>
                {profile.TRX.userCategory ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <VHeader
                      type="six"
                      color={isLoggedIn ? '#fff' : '#fff'}
                      text={isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
                    />
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        // borderWidth: 2.5,
                        borderColor: '#fff',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <FontAwesome
                        name={isLoggedIn ? 'sign-out' : 'sign-in'}
                        size={23}
                        color={isLoggedIn ? '#FFF' : '#fff'}
                        style={{opacity: 0.9, paddingTop: 0}}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    {3 - profile.trakland.trx?.length > -1 ? (
                      <Text style={{color: '#fff', fontSize: 12}}>
                        {4 - profile.trakland.trx.length}
                      </Text>
                    ) : (
                      <Button title="GO" onPress={handleNavigateConnect} />
                    )}
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
