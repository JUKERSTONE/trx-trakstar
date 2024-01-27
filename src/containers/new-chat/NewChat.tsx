import React from 'react';
import {View, Text} from 'react-native';
import {useNewChat} from './useNewChat';
import {NewChatElement} from '../../elements';

export const NewChatContainer = ({navigation, route, ...props}: any) => {
  const {...useNewChatProps} = useNewChat({navigation, route});
  return <NewChatElement {...useNewChatProps} {...props} />;
};
