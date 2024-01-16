import React from 'react';
import Post from '../../../7.elements/post';
import {usePost} from './usePost';

interface PostProps {
  navigation: any;
  id: string;
  sId: string;
  isRecent: boolean;
  username: string;
  createdAt: string;
  caption: string;
  title: string;
  artist: string;
  uri: string;
  preview_url: string;
  likeCount: number;
  commentCount: number;
  service: string;
}

export const PostView: React.FC<PostProps> = ({...props}) => {
  const {id, sId, title, artist} = props;
  const itemInfo = {
    id,
    sId,
    title,
    artist,
  };
  const {...useProps} = usePost({...props}, itemInfo);
  return <Post {...props} {...useProps} />;
};
