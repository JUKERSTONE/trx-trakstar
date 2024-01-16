import React from 'react';
import Feed from '../../../7.elements/feed';
import useFeed from './useFeed';
import {Loading} from '../../../7.elements/loading';

interface FeedViewProps {
  navigation: any;
}

export const FeedView: React.FC<FeedViewProps> = ({navigation}) => {
  const {...props} = useFeed();
  const loading = props.loading;

  return loading ? (
    <Loading />
  ) : (
    <Feed
      navigation={navigation}
      posts={props.getFeed()}
      viewabilityConfig={props.viewabilityConfig}
      onViewableItemsChanged={props.onViewableItemsChanged}
    />
  );
};
