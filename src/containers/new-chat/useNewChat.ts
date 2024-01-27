import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import algoliasearch from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../../auth';

export const useNewChat = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const {handleSearchUsers, handleSetChat} = useFirebase();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [usersHits, setUsersHits] = useState<any>([]);
  const [chat, setChat] = useState<string[]>([userId]);

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = client.initIndex('users');

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const users = await handleSearchUsers('query');
    console.log('🚀 ~ file: useNewChat.ts:27 ~ handleSearch ~ users:', users);
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
            chatURI,
            isMMS: false,
          });
          store.dispatch(action);
          setLoading(false);
          navigation.navigate('CHAT', {chatURI});
          break;
        case false:
          setChat([userId]);
          setLoading(false);
          alert(data);
          break;
      }
    }, 1000);
  };

  const handleChangeText = (text: string) => {
    if (text === '') {
      setUsersHits([]);
    } else {
      index
        .search(text)
        .then(({hits}) => {
          console.log('bs', hits);
          // alert(1);
          console.log(hits);

          // SAVE TRX METAVERSE TRAK

          // map

          const results = hits.map((hit: any) => {
            const id = hit.id;
            const trak_name = hit.trak_name;
            const trak_symbol = hit.trak_symbol;
            const avatarURL = hit.avatarURL;
            console.log(
              '🚀 ~ file: useNewChat.ts:85 ~ results ~ trak_name:',
              trak_name,
            );

            // remove same user

            console.log('🚀 ~ file: useNewChat.ts:87 ~ results ~ hit:', hit);
            return {id, trak_name, trak_symbol, avatarURL};
          });

          const filteredUsers = results.filter(
            (hit: any) => hit.id !== TRXProfile.id,
          );
          console.log(
            '🚀 ~ file: useNewChat.ts:104 ~ .then ~ filteredUsers:',
            filteredUsers,
          );

          console.log(
            '🚀 ~ file: useNewChat.ts:89 ~ results ~ results:',
            results,
          );

          setUsersHits(filteredUsers);
        })
        .catch(err => {
          // alert(2);
          console.log(err);
        });
    }
  };

  return {
    users,
    handleCreateChat,
    handleAddUser,
    chat,
    loading,
    handleChangeText,
    usersHits,
  };
};
