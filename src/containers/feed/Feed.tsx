import React from 'react';
import {View, Text} from 'react-native';
import {useFeed} from './useFeed';
import {FeedElement} from '../../elements';

export const FeedContainer = ({...props}: any) => {
  const {...useFeedProps} = useFeed({...props});
  return <FeedElement {...useFeedProps} {...props} />;
};
