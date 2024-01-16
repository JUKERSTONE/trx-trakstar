import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, useFirebase, useLITELISTState} from '../../app';
import {Keyboard} from 'react-native';

export const useRemote = ({
  navigation,
  route,
  chatURI,
  isMMS = false,
  player = null,
}: any) => {
  console.log(
    '🚀 ~ file: useRemote.tsx ~ line 12 ~ useRemote ~ isMMS, player',
    isMMS,
    player,
  );
  const {handleGetState} = useLITELISTState();

  const {handleRetrieveChat, handleSubmitChat} = useFirebase();
  const [chat, setChat] = useState<any>('');

  const handleChatText = (text: string) => {
    setChat(text);
  };

  const handleSendChat = () => {
    if (chat != '') {
      Keyboard.dismiss();
      handleSubmitChat({chat, chatURI, isMMS, player});
      setChat('');
    }
  };

  return {
    handleChatText,
    handleSendChat,
    chat,
  };
};
