import {View, Text} from 'react-native';
import React from 'react';
import {RSSFeedElement} from '../../elements';
import {useRSSFeed} from './useRSSFeed';

export const RSSFeedComtainer = ({navigation, ...props}: any) => {
  const {...useRSSFeedProps} = useRSSFeed({navigation});
  return <RSSFeedElement {...useRSSFeedProps} {...props} />;
};
