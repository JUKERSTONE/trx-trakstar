import React, {useEffect, useState, useContext} from 'react';
import {useFirebase} from '../../app';
import auth from '@react-native-firebase/auth';
import {handleValidateProfile} from '../../app/firebase/hooks/validatateProfile';

export const useSignIn = () => {
  const {handleSignIn} = useFirebase();

  const [fullNumber, setFullNumber] = useState<any>(null);
  const [details, setDetails] = useState<any>({
    phone_number: '',
    otp: '',
    confirmation: null,
  });

  const [hasRequiredDetails, setHasRequiredDetails] = useState<any>(false);
  const [selectedValue, setSelectedValue] = useState<any>('trx');
  const [isValidTrakName, setIsValidTrakName] = useState(false);
  const [isValidTrakSymbol, setIsValidTrakSymbol] = useState(false);
  const [isValidAvatarURL, setIsValidAvatarURL] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidOTP, setIsValidOTP] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [isValidConfirmEmail, setIsValidConfirmEmail] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState(null);

  const handleDetailsChange = (text: any, type: string) => {
    switch (type) {
      case 'phone_number':
        setDetails({...details, phone_number: text});
        break;
      case 'otp':
        setDetails({...details, otp: text});
        break;
      default:
        break;
    }
  };

  const handleConfirmPhone = async () => {
    if (isValidPhoneNumber) {
      setIsValidOTP(false);
      setDetails({...details, otp: ''});
    } else {
      console.log(
        '🚀 ~ handleConfirmPhone ~ selectedPhoneCode:',
        selectedPhoneCode.callingCode + details.phone_number,
      );

      const number = `${selectedPhoneCode.callingCode} ${details.phone_number}`;
      setFullNumber(number);
      console.log('🚀 ~ handleConfirmPhone ~ number:', number);

      const confirmation = await auth()
        .signInWithPhoneNumber(number)
        .then(confirmation => {
          setDetails({
            ...details,
            confirmation,
          });
        })
        .catch(err => {
          console.log('🚀 ~ handleConfirmPhone ~ err:', err);
        });
      console.log('🚀 ~ handleConfirmPhone ~ confirmation:', confirmation);
    }
    setIsValidPhoneNumber(!isValidPhoneNumber);
  };

  const handleConfirmOTP = async () => {
    const otp = details['otp'];
    if (!isValidOTP) {
      const exists = await handleValidateProfile(fullNumber);

      if (exists) {
        details.confirmation.confirm(otp).catch(err => {
          alert(err?.message ?? "Couldn't confirm OTP. Please try again.");
        });
      } else {
        alert(
          "Profile and phone number doesn't exists. Please sign up or Register.",
        );
      }
    }
    setIsValidOTP(!isValidOTP);
  };

  return {
    // handleSignInEvent,
    isValidPhoneNumber,
    selectedPhoneCode,
    setSelectedPhoneCode,
    handleConfirmPhone,
    handleDetailsChange,
    details,
    uploadLoading,
    isValidOTP,
    handleConfirmOTP,
  };
};
