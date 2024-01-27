import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  setFirebaseProfile,
  storeKeysTRX,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {handleLikeTRAK} from '.';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const handlePost = async ({postText, feedTrack}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const trakName = TRXProfile.trak_name;
  const trakSymbol = TRXProfile.trak_symbol;
  const avatar = TRXProfile.avatarURL;

  if (postText.trim() !== '' && feedTrack) {
    const payload = {
      caption: postText,
      track: feedTrack,
      postedAt: new Date().toISOString(),
      userId,
      trakName,
      trakSymbol,
      avatar,
    };
    console.log('🚀 ~ file: post.ts:43 ~ handlePost ~ payload:', payload);

    return firestore()
      .collection('posts')
      .add(payload)
      .then(() => {
        return {
          caption: postText,
          track: feedTrack,
          postedAt: new Date().toISOString(),
          userId,
          trakName,
          trakSymbol,
          avatar,
        };
      });
  } else {
    alert('add a track and a caption');
  }
};
