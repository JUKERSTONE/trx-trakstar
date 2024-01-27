import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useFirebase} from '../../app';
import {useLITELISTState} from '../../app';
import {useSelector} from 'react-redux';

export const useMessaging = ({navigation, route}: any) => {
  const {handleRetrieveUser} = useFirebase();

  const handleNewChat = (type: 'single' | 'group') => {
    navigation.navigate('MODAL', {
      type: 'chat',
      exchange: {
        active: true,
        item: type,
      },
    });
  };

  const handleChatNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useMessaging.ts:26 ~ handleChatNavigation ~ item:',
      item.chatURI,
    );
    const action = handleMediaPlayerAction({
      playbackState: 'chat-uri',
      chatURI: item.chatURI,
    });
    store.dispatch(action);
    navigation.navigate('CHAT', {
      chatURI: item.chatURI,
    });
  };

  return {
    handleNewChat,
    handleChatNavigation,
    // handleGetUser,
  };
};
