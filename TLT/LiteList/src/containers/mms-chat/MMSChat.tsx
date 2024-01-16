import React from 'react';
import {View, Text} from 'react-native';
import {useMMSChat} from './useMMSChat';
import {MMSChatElement} from '../../elements';

export const MMSChatContainer = ({navigation, route, ...props}: any) => {
  const {...useMMSChatProps} = useMMSChat({navigation, route});
  return <MMSChatElement {...useMMSChatProps} {...props} />;
};
