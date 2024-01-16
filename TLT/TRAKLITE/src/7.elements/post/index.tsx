import React, {useState, useContext} from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import styles from './styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import storage from '@react-native-firebase/storage';
import {VHeader, Body, BHeader} from '../typography';
import {useProvider} from '../../3.stores';

interface PostProps {
  id: string;
  sId: string;
  username: string;
  createdAt: string;
  caption: string;
  title: string;
  artist: string;
  uri: string;
  preview_url: string;
  isLiked: boolean;
  isSaved: boolean;
  likeCount: number;
  commentCount: number;
  handleLike: any;
  handleSave: any;
  handleComment: any;
  handleShare: any;
  isRecent: boolean;
  service: string;
  handleUserNavigation: (username: string) => void;
  handleImagePress: (item: any) => void;
  state: any;
  avatar: any;
  setAvatar: any;
  lines: any;
  setLines: any;
}

export const Post: React.FC<PostProps> = ({
  id,
  username,
  createdAt,
  caption,
  title,
  artist,
  uri,
  sId,
  preview_url,
  likeCount,
  commentCount,
  handleLike,
  handleSave,
  handleComment,
  handleShare,
  isLiked,
  isSaved,
  isRecent,
  handleUserNavigation,
  handleImagePress,
  service,
  state,
  avatar,
  setAvatar,
  lines,
  setLines,
}) => {
  dayjs.extend(relativeTime);
  Promise.resolve(storage().ref(username).getDownloadURL()).then(response => {
    setAvatar(response);
  });
  const commentString = commentCount > 1 ? 'comments' : 'comment';
  likeCount = isLiked ? ++likeCount : likeCount;

  const info = {
    ...state.player,
    title,
    artist,
    uri,
    preview_url,
    isPaused: preview_url ? false : true,
    id: {
      track: sId,
    },
  };

  return (
    <View style={styles.post}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleUserNavigation(username)}>
          <View style={styles.imgContainer}>
            <View style={styles.profilePictureBorder}>
              <Image
                source={{
                  uri: avatar || undefined,
                }}
                style={styles.profilePicture}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.titles}>
          <VHeader
            type="five"
            color="#000"
            /*numberOfLines={1} style={styles.user} */
            text={`${username} • ${dayjs(createdAt).fromNow()}`}
          />
          <TouchableWithoutFeedback
            onPress={() => (lines > 2 ? setLines(1) : setLines(0))}>
            <View style={{marginTop: 5}}>
              <Body
                type="one"
                color="grey"
                text={caption}
                numberOfLines={lines}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.music}>
        <Pressable style={{flex: 1}} onPress={() => handleImagePress(info)}>
          <ImageBackground
            source={{
              uri,
            }}
            style={styles.artwork}
            imageStyle={{
              borderRadius: 15,
              borderWidth: 4.5,
              borderColor: '#fff',
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                flex: 1,
                flexDirection: 'column',
              }}>
              {isRecent && (
                <View
                  style={{
                    backgroundColor: '#fff',
                    // marginRight: 5,
                    opacity: 0.7,
                    // padding: 5,
                    // borderRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderTopRightRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: 70,
                    height: 40,
                  }}>
                  <MaterialCommunityIcons
                    name="play-speed"
                    size={30}
                    color="#1a1a1a"
                  />
                </View>
              )}
              {service === 'soundcloud' && (
                <View
                  style={{
                    backgroundColor: '#FE5000',
                    // marginRight: 5,
                    opacity: 0.7,
                    // padding: 5,
                    // borderRadius: 15,
                    borderBottomLeftRadius: 15,
                    borderTopRightRadius: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: 70,
                    height: 40,
                  }}>
                  <MaterialCommunityIcons
                    name="soundcloud"
                    size={30}
                    color="#fff"
                  />
                </View>
              )}
            </View>
          </ImageBackground>
        </Pressable>
      </View>

      <View style={[styles.footer]}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            paddingLeft: 10,
          }}>
          <Pressable onPress={handleShare}>
            <MaterialCommunityIcons name="share" size={20} color="#000" />
          </Pressable>
          {(likeCount > 0 || commentCount > 0) && (
            <Body type="two" color="#cecece" text={''} />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // backgroundColor: 'red',
            width: '40%',
          }}>
          <Pressable onPress={handleComment}>
            <MaterialCommunityIcons name="comment" size={20} color="grey" />
          </Pressable>
          <Pressable onPress={handleLike}>
            <View
              style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="heart"
                size={20}
                color={isLiked ? '#000' : 'grey'}
              />
              {likeCount > 0 && (
                <Body type="two" color="#cecece" text={'' + likeCount} />
              )}
            </View>
          </Pressable>
          <Pressable onPress={handleSave}>
            <MaterialCommunityIcons
              name="content-save"
              size={20}
              color={isSaved ? '#000' : 'grey'}
            />
          </Pressable>
        </View>
      </View>
      {commentCount !== 0 && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            // backgroundColor: 'grey',
            paddingHorizontal: 7,
            paddingVertical: 3,
            borderRadius: 5,
            borderTopWidth: 0.6,
            borderTopColor: '#292929',
          }}>
          <VHeader
            type="five"
            color="#cecece"
            text={`${commentCount} ${commentString}`}
          />
        </View>
      )}
    </View>
  );
};

export default Post;
