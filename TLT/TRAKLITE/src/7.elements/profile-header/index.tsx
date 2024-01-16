import React, {useContext} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {VHeader, BHeader} from '../typography';
import {useProvider} from '../../3.stores';

interface ProfileHeaderProps {
  username: string;
  // avatar: string;
  following: string[];
  followers: string[];
  // handleEditProfile: (username: string) => void;
  state: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  // avatar,
  following = [],
  followers = [],
  // handleEditProfile,
  state,
}) => {
  return (
    <>
      <View
        style={{flexDirection: 'row', padding: 10, backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VHeader type="five" color="white" text={'FOLLOWERS'} />
          <BHeader type="five" color="white" text={'' + followers.length} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                borderWidth: 3,
                borderColor: 'whitesmoke',
                backgroundColor: 'grey',
              }}
              source={state.user_data.services.spotify.images}
            />
            <View style={{marginTop: 8}}>
              <VHeader type="five" color="white" text={username} />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VHeader type="five" color="white" text={'FOLLOWING'} />
          <BHeader type="five" color="white" text={'' + following.length} />
        </View>
      </View>
      <View
        style={{
          // height: 50,
          alignItems: 'center',
          justifyContent: 'space-around',
          // padding: 10,
          backgroundColor: '#1a1a1a',
        }}>
        {/* <Text>{username}</Text> */}
        {/* <Pressable
          onPress={
            username === state.user_data.username
              ? () => handleEditProfile(username)
              : () => alert('feature coming soon')
          }>
          <View
            style={{
              backgroundColor: '#1DB954',
              padding: 8,
              borderRadius: 5,
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              {username === state.user_data.username
                ? 'CHANGE AVATAR'
                : 'FOLLOW'}
            </Text>
          </View>
        </Pressable> */}
      </View>
    </>
  );
};
