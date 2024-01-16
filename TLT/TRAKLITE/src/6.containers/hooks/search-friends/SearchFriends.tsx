import React from 'react';
import {View, Text} from 'react-native';
import {SearchFriends} from '../../../7.elements/search-friends';
import {useSearchFriends} from './useSearchFriends';
export const SearchFriendsView = ({...props}) => {
  const {...useSearchFriendsProps} = useSearchFriends();
  return <SearchFriends {...useSearchFriendsProps} {...props} />;
};
