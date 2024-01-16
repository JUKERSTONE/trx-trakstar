import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LottieView from 'lottie-react-native';
import {VHeader, Body, LandingHeader} from '..';

export const MMSChatElement = ({
  item,
  handleUserNavigation,
  users,
  handleAddUser,
  handleCreateChat,
  chat,
  loading,
}: any) => {
  console.log('🚀 ~ file: NewChat.tsx ~ line 25 ~ users', users);
  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <View
        style={{
          borderWidth: 3,
          borderColor: 'transparent',
          borderRadius: 11,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            width: 327,
            borderRadius: 8,
            borderWidth: 1,
            // borderColor: props.borders.inner,
            backgroundColor: 'whitesmoke',
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                // color: props.labelColor,
                paddingLeft: 16,
                // marginBottom: 8,
                paddingTop: 15,
                marginTop: 10,
              }}>
              <VHeader type="five" color={'grey'} text={'search'} />
            </View>
            <TextInput
              style={{
                // color: props.color,
                fontSize: 14,
                fontWeight: '500',
                paddingLeft: 16,
                paddingBottom: 20,
              }}
              // onChangeText={handleChangeText}
              // value={text}
            />
          </View>
        </View>
      </View>

      {!loading ? (
        <TouchableOpacity onPress={() => handleCreateChat('single')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              padding: 5,
              borderRadius: 8,
              marginTop: 5,
            }}>
            <MaterialIcons
              name="chat"
              size={25}
              color={'#1a1a1a'}
              style={{marginRight: 10, paddingTop: 5}}
            />
            <VHeader type="five" color="#1a1a1a" text={'create chat'} />
          </View>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          color="#cecece"
          size="large"
          style={{marginVertical: 3}}
        />
      )}

      {users.length === 0 ? (
        <LottieView
          source={require('../../core/57276-astronaut-and-music.json')}
          autoPlay
          loop
        />
      ) : (
        <FlatList
          data={users}
          style={{width: '100%', padding: 10}}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
              item,
              users,
            );
            console.log('vrwerfq', users.includes(item.id));
            return (
              <TouchableOpacity onPress={() => handleAddUser(item.id)}>
                <View
                  style={{
                    backgroundColor:
                      chat.includes(item.id) === true ? 'green' : '#333333',
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: '80%',
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: '#333333',
                  }}>
                  <Image
                    style={{
                      height: 80,
                      width: 90,
                      borderRadius: 5,
                      backgroundColor: '#fff',
                    }}
                    source={{
                      uri: item.avatarURL,
                    }}
                  />
                  <View
                    style={{
                      justifyContent: 'center',
                      marginLeft: 30,
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <VHeader
                        type="four"
                        color={
                          chat.includes(item.id) === true ? '#fff' : '#fff'
                        }
                        text={item.trak_name + ' '}
                      />
                      <Body
                        type="two"
                        color="#cececece"
                        text={`[${item.trak_symbol}]`}
                        // textAlign="right"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};
