import React from 'react';
import {
  TextInput,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Image,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, TouchableOpacity} from 'react-native';
import {VHeader, Body, Caption, BHeader} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import moment from 'moment';

export const ChatElement = ({
  handleChatText,
  handleSendChat,
  chatURI,
  chat,
  userId,
  handleAvatarPress,
  trakName,
  handleTRAKOptions,
  ...props
}: any) => {
  console.log('🚀 ~ file: Chat.tsx ~ line 26 ~ chat', chat);
  console.log('🚀 ~ file: Chat.tsx ~ line 16 ~ chatURI', chatURI);
  const chats = useSelector((state: any) => state.messaging.chats);
  console.log('🚀 ~ file: Chat.tsx ~ line 17 ~ chats', chats);
  // const chatArray = Object.keys(chats)
  // console.log('🚀 ~ file: Chat.tsx ~ line 17 ~ chats', chats);
  console.log('🚀 ~ file: Chat.tsx ~ line 22 ~ chats[chatURI]', chats[chatURI]);
  const messages = chats[chatURI]?.messages ?? [];
  console.log('🚀 ~ file: Chat.tsx ~ line 24 ~ messages', messages);

  const copiesMessages = [...messages];

  const sortedMessages = copiesMessages.sort(function (a: any, b: any) {
    // @ts-ignore
    return new Date(b.sentAt) - new Date(a.sentAt);
  });
  console.log(
    '🚀 ~ file: Chat.tsx ~ line 31 ~ sortedMessages ~ sortedMessages',
    sortedMessages,
  );
  console.log('🚀 ~ file: Chat.tsx ~ line 20 ~ messages', messages);

  const {avatar, trak_name} = chats[chatURI].thumbnail.find(
    (chat: any) => chat.trak_name != trakName,
  );

  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <View style={{flex: 4}}>
        <View
          style={{
            // height: 80,
            padding: 10,
            backgroundColor: '#fff',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            // flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 55,
              width: 55,
              borderRadius: 10,
              // borderRadius: 40,
              backgroundColor: '#fff',
              marginBottom: 5,
            }}
            source={{
              uri: avatar,
            }}
          />
          <VHeader
            type="five"
            color="#1a1a1a"
            text={trak_name}
            textAlign="right"
          />
        </View>
        <FlatList
          inverted
          data={sortedMessages}
          style={{height: '100%'}}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
              item,
            );

            const player = JSON.parse(item.player);
            console.log('🚀 ~ file: Chat.tsx ~ line 97 ~ player', player);

            const isMe = item.userId === userId;

            return (
              <View
                style={{
                  // borderBottomWidth: 1,
                  borderBottomColor: '#cecece',
                  padding: 5,
                  width: '80%',
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                }}>
                {isMe ? (
                  <>
                    {item.isMMS && (
                      <TouchableOpacity
                        onPress={() => handleTRAKOptions({player})}>
                        <TrendingCard
                          artwork={player.image.uri}
                          title={player.title}
                          artist={player.artist}
                        />
                      </TouchableOpacity>
                    )}
                    <View
                      style={{
                        alignItems: 'center',
                        flex: 3,
                        flexDirection: 'row',
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#333333',
                          justifyContent: 'center',
                          margin: 10,
                          height: '80%',
                          borderRadius: 10,
                          minWidth: '30%',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <VHeader
                          type="five"
                          color="whitesmoke"
                          text={item.message}
                          textAlign="right"
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => handleAvatarPress(item.userId)}>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                            marginTop: 5,
                          }}
                          source={{uri: item.avatar}}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    {item.isMMS && (
                      <TouchableOpacity
                        onPress={() => handleTRAKOptions({player})}>
                        <TrendingCard
                          artwork={player.image.uri}
                          title={player.title}
                          artist={player.artist}
                        />
                      </TouchableOpacity>
                    )}
                    <View
                      style={{
                        alignItems: 'center',
                        flex: 3,
                        flexDirection: 'row',
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                      }}>
                      <TouchableOpacity
                        onPress={() => handleAvatarPress(item.userId)}>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                            marginTop: 5,
                          }}
                          source={{uri: item.avatar}}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: '#333333',
                          justifyContent: 'center',
                          margin: 10,
                          height: '80%',
                          borderRadius: 5,
                          minWidth: '30%',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <VHeader
                          type="five"
                          color="whitesmoke"
                          text={item.message}
                          textAlign="right"
                        />
                      </View>
                    </View>
                  </>
                )}
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginTop: 5,
                    flexDirection: 'row',
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                  }}>
                  <View
                    style={{
                      alignItems: isMe ? 'flex-end' : 'flex-start',
                      marginLeft: 10,
                    }}>
                    <VHeader
                      type="five"
                      color="grey"
                      text={item.username}
                      textAlign="right"
                    />
                  </View>
                  <Caption
                    type="two"
                    color="#cecece"
                    text={'  ± ' + moment(item.sentAt).fromNow()}
                    textAlign="right"
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
