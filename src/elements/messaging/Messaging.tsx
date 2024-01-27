import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Animated,
  Alert,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {VHeader, Body, Paragraph, BHeader, Caption} from '../typography';
import {useSelector} from 'react-redux';
import moment from 'moment';
// @ts-ignore
import StickyItemFlatList from '@gorhom/sticky-item';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useLITELISTState} from '../../app';

import LottieView from 'lottie-react-native';
export const MessagingElement = ({
  handleNewChat,
  handleNewGroupChat,
  handleChangeText,
  handleChatNavigation,
}: any) => {
  const chats = useSelector((state: any) => state.messaging.chats);
  console.log('🚀 ~ file: Messaging.tsx ~ line 26 ~ chats', chats);

  const orderedChats = Object.keys(chats).sort(function (a, b) {
    console.log('🚀 ~ file: Messaging.tsx:44 ~ Object.keys ~ a:', chats[a]);
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (
      new Date(chats[b].lastMessageSentAt) -
      new Date(chats[a].lastMessageSentAt)
    );
  });

  const test = orderedChats.map((chat: any) => {
    console.log('🚀 ~ file: Messaging.tsx:46 ~ test ~ chats:', chats[chat]);
    return {...chats[chat], chatURI: chat};
  });
  console.log('🚀 ~ file: Messaging.tsx:46 ~ test ~ test:', test);

  console.log(
    '🚀 ~ file: Messaging.tsx:42 ~ orderedChats ~ orderedChats:',
    orderedChats,
  );

  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const trakName = TRXProfile.trak_name;

  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1, alignItems: 'center'}}>
      <View
        style={{
          // backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => handleNewChat('single')}
          style={{marginLeft: 5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              width: 100,
              padding: 5,
              borderRadius: 8,
              marginRight: 10,
            }}>
            <MaterialIcons name="person-add" size={25} color={'#1a1a1a'} />
            <VHeader type="five" color="#1a1a1a" text={'new chat'} />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => handleNewChat('group')}> */}
        <TouchableOpacity onPress={() => alert('coming soon')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'grey',
              padding: 3,
              borderRadius: 8,
              paddingHorizontal: 5,
            }}>
            <MaterialIcons
              name="group-add"
              size={30}
              color={'#1a1a1a'}
              style={{marginRight: 10}}
            />
            <VHeader type="five" color="#1a1a1a" text={'new group'} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 4,
          borderColor: '#0000',
          borderRadius: 11,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            width: '80%',
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
              <VHeader type="five" color={'#1a1a1a'} text={'search'} />
            </View>
            <TextInput
              style={{
                // color: props.color,
                fontSize: 14,
                fontWeight: '500',
                paddingLeft: 16,
                paddingBottom: 20,
              }}
              onChangeText={handleChangeText}
              // value={query}
            />
          </View>
        </View>
      </View>
      <View style={{marginVertical: 8}}>
        <VHeader
          type="five"
          color="white"
          text={'RECENT CHATS HERE AND BELOW'}
          textAlign="right"
        />
      </View>
      {Object.keys(chats).length == 0 ? (
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#cecece',
            opacity: 0.4,
            borderRadius: 10,
            width: '100%',
          }}>
          <LottieView
            source={require('../../core/animation_lkmv4pzr.json')}
            autoPlay
            loop
          />
          <View style={{position: 'absolute', top: 30}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#cecece',

                // padding: 30,
              }}>
              No Active Chats
            </Text>
            <Button
              title="Start a chat.."
              onPress={() => handleNewChat('single')}
            />
          </View>
        </SafeAreaView>
      ) : (
        <FlatList
          data={test}
          style={{height: '100%', width: '100%'}}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
              item,
              item.lastMessage,
            );

            const thumbnail = item.thumbnail.find(
              (chat: any) => chat.trak_name != trakName,
            );

            const serializedLastMessage = item.lastMessage;
            // const thumbnail = chats[item].thumbnail;

            const {chat, sentAt, username} = JSON.parse(serializedLastMessage);

            return (
              <TouchableOpacity onPress={() => handleChatNavigation(item)}>
                <View
                  style={{
                    flex: 3,
                    margin: 8,
                    width: '80%',
                    alignSelf: 'center',
                    backgroundColor: '#333333',
                    flexDirection: 'row',
                    alignItems: 'center',
                    // padding: 5,
                    borderRadius: 8,
                  }}>
                  <Image
                    style={{
                      height: '100%',
                      width: 55,
                      borderRadius: 10,
                      // borderRadius: 40,
                      backgroundColor: '#fff',
                    }}
                    source={{
                      uri: thumbnail.avatar,
                    }}
                  />
                  <View
                    style={{
                      margin: 15,
                      justifyContent: 'space-around',
                      alignItems: 'flex-start',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        // alignItems: 'flex-end',
                        paddingRight: 5,
                        flexDirection: 'row',
                        // backgroundColor: 'blue',
                      }}>
                      <Caption
                        type="two"
                        color="white"
                        text={thumbnail.trak_name}
                        textAlign="right"
                      />
                      <View style={{justifyContent: 'flex-start'}}>
                        <Caption
                          type="two"
                          color="white"
                          text={'  ± ' + moment(sentAt).fromNow()}
                          textAlign="right"
                        />
                      </View>
                    </View>

                    <Caption
                      type="two"
                      color="#cecece"
                      text={username ? '@' + username + ' : ' + chat : chat}
                      textAlign="right"
                      numberOfLines={1}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item: any) => item.id}
        />
      )}
    </View>
  );
};
