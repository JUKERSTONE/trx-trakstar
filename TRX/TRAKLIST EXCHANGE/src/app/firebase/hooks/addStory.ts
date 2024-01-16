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
import {useTRAKLISTState} from '../../useTRAKLISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';

export const handleAddStory = async () => {
  const {handleGetState} = useTRAKLISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const username = TRXProfile.user_name;
  const userId = TRXProfile.id;

  const options: any = {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
    includeExtra: true,
  };
  const result: any = await launchImageLibrary(options);
  console.log(
    '🚀 ~ file: addStory.ts ~ line 33 ~ handleAddStory ~ result',
    result,
  );

  const asset = result.assets[0];
  console.log(
    '🚀 ~ file: addStory.ts ~ line 24 ~ handleAddStory ~ asset',
    asset,
  );

  const avatarId = uuidv4();

  const videoURI = asset.uri;
  let filename = videoURI.substring(videoURI.lastIndexOf('/') + 1);

  filename = avatarId;

  const upload = storage()
    .ref('users/' + filename)
    .putFile(videoURI /*, {contentType: 'image/jpeg'}*/);

  upload.on('state_changed', async (snapshot: any) => {
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
        const downloadURL = await upload.snapshot!.ref.getDownloadURL();
        // .then((downloadURL: string) => {
        //   console.log('File available at ', downloadURL);
        //   // setImageURL(downloadURL);
        // });
        console.log(
          '🚀 ~ file: addStory.ts ~ line 77 ~ upload.on ~ downloadURL',
          downloadURL,
        );
        return downloadURL;
      case storage.TaskState.ERROR:
        alert('ERROR : Try again');
    }
  });
};
