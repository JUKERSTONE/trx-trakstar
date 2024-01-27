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

export const handleToggleFollowUser = async () => {
  alert('coming soon');
  // const {handleGetState} = useLITELISTState();
  // const profile = handleGetState({index: 'profile'});
  // const TRXProfile = profile.TRX;
  // const following = TRXProfile.following;
  // const userId = TRXProfile.id;
  // const userId2 = '';
  // const isFollowing = true;
  // switch (isFollowing) {
  //   case true:
  //     return;
  //   default:
  //     const hasFollowed: any = await firestore()
  //       .doc(`users/${userId}`)
  //       .update({following: [...following, userId2]});
  //     if (hasFollowed) {
  //       // get other users followers
  //       await firestore().doc(`users/${userId2}`).update({followers: !userId2});
  //     }
  //     return;
  // }
  // // const hasFollowed: any = await firestore()
  // //   .doc(`users/${userId}`)
  // //   .update({following: [...following, userId2]});
  // // if (hasFollowed) {
  // //   await firestore().doc(`users/${userId2}`).update({followers: !isPrivate});
  // // }
};
