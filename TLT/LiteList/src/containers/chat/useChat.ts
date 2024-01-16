import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  setChatPlayer,
} from '../../stores';
import {useGenerate, useFirebase, useLITELISTState} from '../../app';

export const useChat = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const trakName = TRXProfile.trak_name;

  console.log('🚀 ~ file: useChat.ts ~ line 11 ~ useChat ~ route', route);
  const {handleRetrieveChat, handleSubmitChat, handleRetrieveUser} =
    useFirebase();
  const [chat, setChat] = useState<any>();
  const [chatHistory, setChatHistory] = useState<any>();

  const {
    params: {chatURI, isMMS = false, player = null},
  } = route;
  console.log(
    '🚀 ~ file: useChat.ts ~ line 26 ~ useChat ~ isMMS, player',
    isMMS,
    player,
  );

  useEffect(() => {
    const action = setChatPlayer({});
    store.dispatch(action);
  }, []);

  const handleChatText = (text: string) => {
    setChat(text);
  };

  const handleSendChat = () => {
    if (chat != '') {
      handleSubmitChat({chat, chatURI, isMMS, player});
      setChat('');
    }
  };

  const handleAvatarPress = async (id: string) => {
    const isMe = id === userId;

    const userProfile = await handleRetrieveUser(id);
    switch (isMe) {
      case false:
        navigation.navigate('MODAL', {
          type: 'user-profile',
          exchange: {
            active: true,
            item: userProfile,
          },
        });
        break;
      default:
        navigation.navigate('MODAL', {
          type: 'profile',
          exchange: {
            active: true,
            item: userProfile,
          },
        });
    }
  };

  const handleTRAKOptions = ({player}: any) => {
    console.log(
      '🚀 ~ file: useChat.ts ~ line 70 ~ handleTRAKOptions ~ player',
      player,
    );
    Alert.alert(
      `${player.artist} - ${player.title}`,
      `What would you like to do?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Preview',
          onPress: async () => {
            if (player.source.uri) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: player.source.uri,
                url: player.image.uri,
                artist: player.artist,
                title: player.title,
                id: {
                  spotify: player.id,
                  apple_music: '',
                },
                isrc: player.isrc,
              });
              store.dispatch(action);
            } else
              alert(
                `Sorry. ${player.artist} didn't upload a preview for '${player.title}'`,
              );
          },
        },
        {
          text: 'Find',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: player.title,
                  artist: player.artist,
                },
              },
            });
          },
        },
      ],
    );
  };

  return {
    handleChatText,
    handleSendChat,
    chatURI,
    isMMS,
    player,
    chat,
    userId,
    handleAvatarPress,
    trakName,
    handleTRAKOptions,
  };
};
