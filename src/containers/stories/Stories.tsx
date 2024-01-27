import React from 'react';
import {View, Text} from 'react-native';
import {useStories} from './useStories';
import {StoriesElement} from '../../elements';

export const StoriesContainer = ({navigation, route, ...props}: any) => {
  const {...useStoriesProps} = useStories({navigation, route});
  return <StoriesElement {...useStoriesProps} {...props} />;
};
