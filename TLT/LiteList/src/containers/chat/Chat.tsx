import React from 'react';
import {View, Text} from 'react-native';
import {useChat} from './useChat';
import {ChatElement} from '../../elements';

export const ChatContainer = ({navigation, route, ...props}: any) => {
  const {...useChatProps} = useChat({navigation, route});
  return <ChatElement {...useChatProps} {...props} />;
};
