import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {useFirebase, useLITELISTState} from '../../app';

export const useProfileEdit = ({navigation, route}: any) => {
  const [details, setDetails] = useState<any>({
    bio: null,
    quotable: null,
    location: null,
    avatarURL: null,
  });
  // const [hasRequiredDetails, setHasRequiredDetails] = useState<any>(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // useEffect(() => {
  //   const detailsArray = Object.keys(details);

  //   const hasRequiredDetails = !detailsArray.some(
  //     (key: string) => details[key] == null,
  //   );

  //   switch (hasRequiredDetails) {
  //     case true:
  //       setHasRequiredDetails(true);
  //       break;
  //     case false:
  //       setHasRequiredDetails(false);
  //       break;
  //   }
  //   // trak_name - min 5 characters, alphanumeric
  //   // trak_symbol - min 3 to 5 characters, alpha
  // }, [details]);

  const handleProfileEditChange = (text: any, type: string) => {
    switch (type) {
      case 'bio':
        setDetails({...details, bio: text});
        break;
      case 'quotable':
        setDetails({...details, quotable: text});
        break;
      case 'location':
        setDetails({...details, location: text});
        break;
    }
  };

  const handleNavigateNext = () => {
    const {
      params: {profile},
    } = route;
    console.log(
      '🚀 ~ file: useProfileEdit.ts ~ line 59 ~ handleNavigateNext ~ profile',
      profile,
    );

    navigation.navigate('WALLET_SETUP', {
      profile: {
        ...profile,
        ...details,
      },
    });
  };

  const handleUploadAvatar = async () => {
    setUploadLoading(true);

    const {handleGetState} = useLITELISTState();
    const profile = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    const username = TRXProfile.user_name;
    const userId = TRXProfile.id;

    const options: any = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
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

    const avatarId = uuid.v4();

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
          setDetails({...details, avatarURL: downloadURL});
          break;
        case storage.TaskState.ERROR:
          alert('ERROR : Try again');
          setUploadLoading(false);
          break;
      }
    });
    setUploadLoading(false);
  };

  return {
    handleProfileEditChange,
    // hasRequiredDetails,
    handleNavigateNext,
    handleUploadAvatar,
    details,
    uploadLoading,
  };
};
