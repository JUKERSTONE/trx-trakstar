import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';

export const useMMSChat = ({navigation, route}: any) => {
  console.log('🚀 ~ file: usemmsChat.ts ~ line 11 ~ useMMSChat ~ route', route);
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  // const {
  //   params: {isMMS},
  // } = route;
  // console.log('🚀 ~ file: usemmsChat.ts ~ line 19 ~ useMMSChat ~ isMMS', isMMS);

  const {handleSearchUsers, handleSetChat} = useFirebase();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [chat, setChat] = useState<string[]>([userId]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const users = await handleSearchUsers('query');
    setUsers(users);
  };

  const handleAddUser = (userId: string) => {
    if (!chat.includes(userId)) {
      setChat([...chat, userId]);
    } else {
      const removedUser = chat.filter(item => item != userId);
      setChat([...removedUser]);
    }
  };

  const handleCreateChat = async (type: string) => {
    setLoading(true);
    const {success, data} = await handleSetChat(chat, type);

    setTimeout(() => {
      switch (success) {
        case true:
          const chatURI = data;
          const action = handleMediaPlayerAction({
            playbackState: 'chat-uri',
            isMMS: true,
            chatURI,
          });
          store.dispatch(action);
          setLoading(false);
          navigation.navigate('SOCIAL', {
            screen: 'CHAT',
            params: {chatURI},
          });
          break;
        case false:
          alert(data);
          break;
      }
    }, 1000);
  };

  return {
    users,
    handleCreateChat,
    handleAddUser,
    chat,
    loading,
  };
};
