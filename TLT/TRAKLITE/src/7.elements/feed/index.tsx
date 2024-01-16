import {title} from 'process';
import React, {useCallback, useContext, useState} from 'react';
import {FlatList, View, RefreshControl, Text} from 'react-native';
import {PostView} from '../../6.containers';
import {GET_POSTS} from '../../1.api';
import axios from 'axios';
import {useProvider} from '../../3.stores';
import {store} from '../../3.stores';
import * as actions from '../../3.stores';
import {VHeader} from '../typography';
import LinearGradient from 'react-native-linear-gradient';

interface PostProps {
  navigation: any;
  posts: any;
  onViewableItemsChanged: any;
  viewabilityConfig: any;
}

export const Feed: React.FC<PostProps> = ({
  navigation,
  posts,
  onViewableItemsChanged,
  viewabilityConfig,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);
  const {state, setState} = useContext(useProvider);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    axios
      .get(GET_POSTS, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.traklist.access_token,
        },
      })
      .then(response => {
        store.dispatch(actions.LOAD_FEED('load feed.', response.data));
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setErrorLoad(true);
        setTimeout(() => {
          setErrorLoad(false);
          setRefreshing(false);
        }, [1000]);
      });
  }, [refreshing]);

  const renderItem = ({item}: any) => {
    return (
      <View style={{margin: 15}}>
        <PostView
          navigation={navigation}
          id={item.id}
          isRecent={item.post.isRecent}
          service={item.music.service}
          sId={item.music.sId}
          username={item.post.username}
          createdAt={item.createdAt}
          caption={item.post.caption}
          title={item.music.title}
          artist={item.music.artist}
          uri={item.music.artwork}
          preview_url={item.music.preview ? item.music.preview : null}
          likeCount={item.post.count.likes}
          commentCount={item.post.comments.length}
        />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#1a1a1a', '#1B3926', '#1a1a1a', '#1B3926']}
      style={{paddingBottom: 300}}>
      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => '' + index}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={errorLoad ? 'red' : '#fff'}
          />
        }
      />
    </LinearGradient>
  );
};

export default Feed;
