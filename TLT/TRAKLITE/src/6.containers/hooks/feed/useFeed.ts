import {useContext, useState, useEffect, useRef} from 'react';

import axios from 'axios';

import {useProvider} from '../../../3.stores';

import {GET_POSTS, LIKE_POST_ROUTE, POST_COMMENT} from '../../../1.api';
import {store} from '../../../3.stores';
import * as actions from '../../../3.stores';

import {SPOTIFY_TRACKS} from '../../../1.api';

export const useFeed = () => {
  const {state} = useContext(useProvider);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(GET_POSTS, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // setPosts(response.data);
        store.dispatch(actions.LOAD_FEED('load feed.', response.data));
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getFeed = () => {
    return state.feed;
  };

  const onViewableItemsChanged_ = useRef((viewableItems: any) => {
    console.log(
      '🚀 ~ file: useFeed.ts ~ line 40 ~ constonViewableItemsChanged_=useRef ~ viewableItems',
      viewableItems,
    );
    const info = {
      ...state.player,
      title: viewableItems.viewableItems[0]?.item?.music?.title,
      artist: viewableItems.viewableItems[0]?.item?.music?.artist,
      uri: viewableItems.viewableItems[0]?.item?.music?.artwork,
      preview_url: viewableItems.viewableItems[0]?.item?.music?.preview,
      isPaused: viewableItems.viewableItems[0]?.item?.music?.preview
        ? false
        : true,
      id: {
        track: viewableItems.viewableItems[0]?.item?.music?.sId,
        // artist: spotifyData.artists[0].id,
      },
      // isMuted: false,
    };
    if (viewableItems.viewableItems[0]?.item.music)
      store.dispatch(actions.SET_PLAYER('set player.', info));
  });

  const onViewableItemsChanged = onViewableItemsChanged_.current;

  const viewabilityConfig_ = useRef({
    itemVisiblePercentThreshold: 90,
    minimumViewTime: 1000,
  });

  const viewabilityConfig = viewabilityConfig_.current;

  return {
    getFeed,
    viewabilityConfig,
    onViewableItemsChanged,
    loading,
  };
};

export default useFeed;
