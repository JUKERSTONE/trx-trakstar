import React, {useEffect, useState, useContext, useCallback} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  setTimeline,
  handleMediaPlayerAction,
} from '../../stores';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {handleGetTimeline} from '../../app';

export const useFeed = ({navigation, route}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await handleGetTimeline()
      .then((timeline: any) => {
        const sortedTimeline = timeline.sort((a: any, b: any) => {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.postedAt) - new Date(a.postedAt);
        });
        const action = setTimeline({timeline: sortedTimeline});
        store.dispatch(action);
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setErrorLoad(true);
        setTimeout(() => {
          setErrorLoad(false);
          setRefreshing(false);
        }, 1000);
      });
  }, [refreshing]);

  const handlePlayNow = (item: any) => {
    if (item.track.preview) {
      const action = handleMediaPlayerAction({
        playbackState: 'source',
        uri: item.track.preview,
        url: item.track.image,
        artist: item.track.artist,
        title: item.track.title,
        id: {
          spotify: null,
          apple_music: null,
        },
        isrc: null,
      });
      store.dispatch(action);
    } else
      alert(
        `Sorry. ${item.track.artist} didn't upload a preview for '${item.track.title}'`,
      );
  };

  return {
    handleRefresh,
    refreshing,
    errorLoad,
    handlePlayNow,
  };
};
