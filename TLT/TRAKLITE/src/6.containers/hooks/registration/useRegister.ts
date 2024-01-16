import {useState, useEffect} from 'react';

import ImagePicker from 'react-native-image-crop-picker';

import {authHandler} from '../../../2.auth';
import {register} from '../../../2.auth';
import {store} from '../../../3.stores';
import {updateRegistrationState} from './handlers';
import * as actions from '../../../3.stores';
import {spotifyState, registrationState} from './handlers';
import {RegistrationState, SpotifyAuthState} from './types';

import axios from 'axios';
import {USER} from '../../../1.api';

export const useRegister = ({navigation}: any) => {
  const [image, setImage] = useState<any>(null);
  const [spotify, setSpotify] = useState<SpotifyAuthState>(spotifyState);
  const [registrationForm, setRegistrationForm] =
    useState<RegistrationState>(registrationState);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAuthenticatedSpotify, sethasAuthenticatedSpotify] = useState(false);
  const [isLoadingSpotify, setIsLoadingSpotify] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [hasLoadedAvatar, setHasLoadedAvatar] = useState(false);

  // useEffect(() => {
  //   console.log(registrationForm);
  // }, [registrationForm]);

  const handleRegistrationChange = (text: any, field: any) =>
    updateRegistrationState(text, field, registrationForm, setRegistrationForm);

  const handleRegistrationSubmit = async () => {
    setIsLoading(true);

    const newData = await register(registrationForm, spotify, image);

    const tokens = {
      access_token: spotify.access_token,
      refresh_token: spotify.refresh_token,
      access_token_expiry: spotify.access_token_expiry,
    };

    if (newData.success) {
      setIsLoading(false);
      store.dispatch(
        actions.USER_REGISTERED('user registered.', newData, tokens),
      ); // handle token expiry
    } else {
      setIsLoading(false);
      const errors = newData.data;
      Object.keys(errors).map(error => {
        alert('ERROR : ' + errors[error]);
      });
    }
  };

  const handleSpotifyAuthentication = async () => {
    setIsLoadingSpotify(true);
    const data: any = await authHandler.onLogin();

    if (data.success) {
      setIsLoadingSpotify(false);
      sethasAuthenticatedSpotify(true);

      setSpotify(data.data);
    } else {
      setIsLoadingSpotify(false);
      sethasAuthenticatedSpotify(false);
      alert("couldn't authenticate your spotify. try again");
    }
  };

  const handleImageUpload = () => {
    setIsLoadingAvatar(true);

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        setImage(image);
        setIsLoadingAvatar(false);
        setHasLoadedAvatar(true);

        // const reference = storage().ref(registrationForm.username as string); // change reference to username_pp.png
        // await reference.putFile(image.path);
      })
      .catch(err => {
        setIsLoadingAvatar(false);
        setHasLoadedAvatar(false);
      });
  };

  const handleAuthNavigation = () => navigation.navigate('SIGN IN.');

  return {
    handleRegistrationChange,
    handleRegistrationSubmit,
    handleSpotifyAuthentication,
    handleImageUpload,
    handleAuthNavigation,
    isLoadingSpotify,
    isLoadingAvatar,
    isLoading,
    hasAuthenticatedSpotify,
    hasLoadedAvatar,
  };
};

export default useRegister;
