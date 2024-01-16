import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {useFirebase, useLITELISTState} from '../../app';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const useDetails = ({navigation, route}: any) => {
  const [details, setDetails] = useState<any>({
    trak_name: '',
    trak_symbol: '',
    phone_number: '',
    email_address: '',
    confirm_email_address: '',
    password: '',
    avatarURL: null,
  });
  const [hasRequiredDetails, setHasRequiredDetails] = useState<any>(false);
  const [selectedValue, setSelectedValue] = useState<any>('trx');
  const [isValidTrakName, setIsValidTrakName] = useState(false);
  const [isValidTrakSymbol, setIsValidTrakSymbol] = useState(false);
  const [isValidAvatarURL, setIsValidAvatarURL] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [isValidConfirmEmail, setIsValidConfirmEmail] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const {
    params: {profile},
  } = route;

  useEffect(() => {
    if (details['trak_name'].length > 3) {
      setIsValidTrakName(true);
    } else setIsValidTrakName(false);

    if (
      details['trak_symbol'].length === 3 ||
      details['trak_symbol'].length === 4
    ) {
      setIsValidTrakSymbol(true);
    } else setIsValidTrakSymbol(false);

    if (details['avatarURL']) {
      setIsValidAvatarURL(true);
    } else setIsValidAvatarURL(false);

    if (details['password'].length > 6) {
      setIsValidPassword(true);
    } else setIsValidPassword(false);

    if (details['confirm_email_address'] === details['email_address']) {
      setIsValidConfirmEmail(true);
    } else setIsValidConfirmEmail(false);

    // trak_name - min 5 characters, alphanumeric
    // trak_symbol - min 3 to 5 characters, alpha
  }, [details]);

  const handleDetailsChange = (text: any, type: string) => {
    switch (type) {
      case 'trak_name':
        setDetails({...details, trak_name: text.toLowerCase().trim()});
        break;
      case 'trak_symbol':
        if (details['trak_symbol'].length < 5) {
          setDetails({...details, trak_symbol: text.toUpperCase().trim()});
        }
        break;
      case 'phone_number':
        setDetails({...details, phone_number: text});
        break;
      case 'email_address':
        setDetails({...details, email_address: text.toLowerCase().trim()});
        break;
      case 'confirm_email_address':
        setDetails({
          ...details,
          confirm_email_address: text.toLowerCase().trim(),
        });
        break;
      case 'password':
        setDetails({...details, password: text});
        break;
    }
  };

  const handleNavigateNext = () => {
    const isValidForm =
      isValidTrakName &&
      isValidTrakSymbol &&
      isValidPassword &&
      isValidConfirmEmail &&
      isValidAvatarURL;

    if (isValidForm) {
      const detailForm = {
        ...details,
        trak_name: `${details.trak_name}.${selectedValue}`,
      };

      console.log({...profile, ...detailForm}, 'checkeerr');

      navigation.navigate('PAYWALL', {
        screen: 'SUBSCRIPTIONS',
        params: {
          profile: {
            ...profile,
            ...detailForm,
          },
        },
      });
    } else alert('Missing parameters');
  };

  const handleSeePassword = () => {
    if (seePassword) {
      setSeePassword(false);
    } else setSeePassword(true);
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
          setUploadLoading(true);
          break;
        case storage.TaskState.SUCCESS:
          setUploadLoading(false);
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
    handleDetailsChange,
    handleNavigateNext,
    selectedValue,
    setSelectedValue,
    details,
    isValidTrakName,
    isValidTrakSymbol,
    isValidAvatarURL,
    handleSeePassword,
    seePassword,
    isValidPassword,
    isValidConfirmEmail,
    handleUploadAvatar,
    uploadLoading,
  };
};
