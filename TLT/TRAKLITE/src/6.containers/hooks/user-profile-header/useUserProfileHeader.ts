import React, {useContext, useState} from 'react';
import {useProvider} from '../../../3.stores';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

export const useProfileHeader = (props: any) => {
  console.log(
    '🚀 ~ file: useUserProfileHeader.ts ~ line 7 ~ useProfileHeader ~ props',
    props,
  );
  const {state} = useContext(useProvider);
  // const {username, image, followers, following} = state.user_data;
  const {username, image} = props.profile;
  // const image = props.image;
  // const followers = props.followers;
  // const following = props.following;
  console.log(
    '🚀 ~ file: useUserProfileHeader.ts ~ line 14 ~ useProfileHeader ~ username',
    props.profile,
  );

  // console.log(params, 'vroir');

  const [avatar, setAvatar] = useState<any>(image);

  const handleEditProfile = async (username: string) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      setAvatar(image.sourceURL);
      const reference = storage().ref(username as string); // change reference to username_pp.png
      await reference.putFile(image ? image.path : image);
    });
  };

  return {
    username,
    avatar: image,
    followers: [],
    following: [],
    handleEditProfile,
    state,
  };
};
