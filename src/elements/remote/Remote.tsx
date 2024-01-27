import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {VHeader, Body, Caption} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProgressBar, Colors} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {handlePost} from '../../app';
import {store, setTimeline} from '../../stores';

export const RemoteElement = ({
  hidden,
  artist,
  title,
  mode,
  handleChatText,
  handleSendChat,
  chat,
  currentTime,
  playableDuration,
  isMMS,
  spotifyPlayer,
  handleAddTRAK,
}: any) => {
  const {isFeed, feedTrack} = useSelector((state: any) => state.player);
  const {timeline} = useSelector((state: any) => state.feed);

  console.log('🚀 ~ file: Remote.tsx ~ line 24 ~ spotifyPlayer', spotifyPlayer);
  console.log('🚀 ~ file: Remote.tsx ~ line 23 ~ chat', chat);
  const [postText, setPostText] = useState('');
  const [onFocus, setOnFocus] = useState(false);
  const inputRef: any = useRef();

  return (
    <>
      {((mode == 'default' && !isFeed) ||
        (mode == 'default' && isFeed && hidden)) && (
        <View
          style={{
            // backgroundColor: 'blue',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{flex: 5, padding: 10}}>
            <ProgressBar
              progress={
                spotifyPlayer && !hidden
                  ? spotifyPlayer.progress_ms ??
                    100 / spotifyPlayer?.item?.duration_ms ??
                    1000
                  : currentTime / playableDuration
              }
              color={'#cecece'}
              style={{
                backgroundColor: spotifyPlayer && !hidden ? '#1db954' : 'grey',
                height: 5,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      )}

      {mode == 'chat' && hidden && (
        <View
          style={{
            // backgroundColor: 'blue',
            width: '100%',
            marginVertical: 2,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{flex: 5, padding: 10}}>
            <ProgressBar
              progress={currentTime / playableDuration}
              color={'#cecece'}
              style={{
                backgroundColor: 'grey',
                height: 5,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      )}

      {((mode === 'chat' && hidden) ||
        (mode === 'default' && !isFeed) ||
        (mode === 'default' && isFeed && hidden)) && (
        <>
          <View
            style={{
              marginBottom: mode === 'chat' ? 10 : 0,
              padding: 4,
              borderRadius: 3,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '100%',
              }}>
              <View>
                <VHeader
                  type="four"
                  color="#fff"
                  text={
                    spotifyPlayer && !hidden
                      ? spotifyPlayer.item?.artists[0].name
                      : artist
                  }
                  numberOfLines={1}
                />
              </View>
              <View>
                <VHeader
                  type="five"
                  color="#cecece"
                  text={
                    spotifyPlayer && !hidden ? spotifyPlayer.item?.name : title
                  }
                  numberOfLines={1}
                />
              </View>
            </View>
          </View>
        </>
      )}

      {mode === 'chat' && !hidden && (
        <View style={{flexDirection: 'row', flex: 1}}>
          <TextInput
            value={chat}
            ref={inputRef}
            onSubmitEditing={() => {
              setOnFocus(false);
            }}
            onFocus={() => setOnFocus(true)}
            onChangeText={handleChatText}
            placeholderTextColor={isMMS ? 'grey' : '#cecece'}
            placeholder={
              isMMS ? 'Caption your recommendation!' : 'Type a message...'
            }
            style={{
              flex: 3,
              backgroundColor: '#fff',
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderRadius: 8,
              marginRight: 10,
            }}
            multiline={true}
            // value={chat}
          />
          <TouchableOpacity
            onPress={handleSendChat}
            style={{
              // flex: 1,

              height: 50,
              // width: 40,
              backgroundColor: 'green',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              padding: 10,
              flexDirection: 'row',
            }}>
            <Ionicons
              name="checkmark-done-circle-sharp"
              color={'#fff'}
              size={20}
            />
            <VHeader type="five" color="#fff" text={'SEND'} numberOfLines={1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSendChat}
            style={{
              height: 50,
              width: 30,
              backgroundColor: 'green',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderLeftWidth: 1,
              borderLeftColor: '#cecece',
              padding: 5,
            }}>
            <Ionicons name="options" color={'#FFF'} size={15} />
          </TouchableOpacity>
        </View>
      )}
      {mode === 'default' && !hidden && isFeed && (
        <View style={{flexDirection: 'row', flex: 1}}>
          <TextInput
            value={postText}
            ref={inputRef}
            onSubmitEditing={() => {
              setOnFocus(false);
            }}
            onFocus={() => setOnFocus(true)}
            onChangeText={setPostText}
            placeholderTextColor={isMMS ? 'grey' : '#cecece'}
            placeholder={
              isMMS ? 'Caption your recommendation!' : 'Type a caption...'
            }
            style={{
              flex: 3,
              backgroundColor: '#fff',
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderRadius: 8,
              marginRight: 10,
            }}
            multiline={true}
          />
          <View style={{justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={handleAddTRAK}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: '#2323cc',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // paddingLeft: 3,
                  borderRadius: 8,
                }}>
                {!feedTrack?.image ? (
                  <Ionicons name="add" color={'#fff'} size={30} />
                ) : (
                  <Image
                    source={{uri: feedTrack.image}}
                    style={{
                      backgroundColor: '#1B4F26',
                      height: '100%',
                      width: '100%',
                      borderRadius: 8,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                handlePost({postText, feedTrack}).then((post: any) => {
                  const newTimeline = [...timeline, post];

                  const sortedTimeline = newTimeline.sort((a: any, b: any) => {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.postedAt) - new Date(a.postedAt);
                  });

                  const action = setTimeline({timeline: sortedTimeline});
                  store.dispatch(action);
                })
              }
              style={{
                height: 50,
                backgroundColor: 'green',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: 10,
                padding: 10,
                flexDirection: 'row',
              }}>
              <Ionicons
                name="checkmark-done-circle-sharp"
                color={'#fff'}
                size={20}
              />
              <VHeader
                type="five"
                color="#fff"
                text={'SEND'}
                numberOfLines={1}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
