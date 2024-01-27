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
import {v4 as uuidv4} from 'uuid';

export const handleAddStory = async () => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const username = TRXProfile.user_name;
  const userId = TRXProfile.id;

  const options: any = {
    saveToPhotos: true,
    mediaType: 'video',
    includeExtra: false,
  };
  const result: any = await launchCamera(options);

  const asset = result.assets[0];
  console.log(
    '🚀 ~ file: addStory.ts ~ line 24 ~ handleAddStory ~ asset',
    asset,
  );

  const storyId = uuidv4();

  const videoURI = asset.uri;
  let filename = videoURI.substring(videoURI.lastIndexOf('/') + 1);

  const extension = filename.split('.').pop();
  const name = filename.split('.').slice(0, -1).join('.');

  filename = name + Date.now() + '.' + extension;

  const upload: any = storage()
    .ref('stories/' + username + '/' + storyId)
    .putFile(videoURI /*, {contentType: 'image/jpeg'}*/);

  upload.on('state_changed', (snapshot: any) => {
    console.log(
      `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
    );
    // setTransferred(
    //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
    // );

    switch (snapshot.state) {
      case storage.TaskState.PAUSED:
        console.log('Upload Paused');
        break;
      case storage.TaskState.RUNNING:
        console.log('Upload Running');
        break;
      case storage.TaskState.SUCCESS:
        upload.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          console.log('File available at ', downloadURL);
          // setImageURL(downloadURL);

          const date =
            new Date().getDate() +
            '-' +
            new Date().getMonth() +
            '-' +
            new Date().getFullYear();

          firestore().doc(`users/${userId}/stories/${storyId}`).set({
            createdAt: new Date().toISOString(),
            storyId,
            storyURL: downloadURL,
          });
        });
        break;
      case storage.TaskState.ERROR:
        alert('ERROR : Try again');
    }
  });
};
