import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useDetails = ({navigation, route}: any) => {
  const [details, setDetails] = useState<any>({
    trak_name: '',
    trak_symbol: '',
    phone_number: '',
    email_address: '',
    confirm_email_address: '',
    password: '',
  });
  const [hasRequiredDetails, setHasRequiredDetails] = useState<any>(false);
  const [selectedValue, setSelectedValue] = useState<any>('trx');
  const [isValidTrakName, setIsValidTrakName] = useState(false);
  const [isValidTrakSymbol, setIsValidTrakSymbol] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [isValidConfirmEmail, setIsValidConfirmEmail] = useState(false);

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
        setDetails({...details, trak_name: text.toLowerCase()});
        break;
      case 'trak_symbol':
        if (details['trak_symbol'].length < 5) {
          setDetails({...details, trak_symbol: text.toUpperCase()});
        }
        break;
      case 'phone_number':
        setDetails({...details, phone_number: text});
        break;
      case 'email_address':
        setDetails({...details, email_address: text.toLowerCase()});
        break;
      case 'confirm_email_address':
        setDetails({...details, confirm_email_address: text.toLowerCase()});
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
      isValidConfirmEmail;

    if (isValidForm) {
      const detailForm = {
        ...details,
        trak_name: `${details.trak_name}.${selectedValue}`,
      };
      const {
        params: {profile},
      } = route;
      navigation.navigate('PROFILE_EDIT', {
        profile: {
          ...profile,
          ...detailForm,
        },
      });
    } else alert('Missing parameters');
  };

  const handleSeePassword = () => {
    if (seePassword) {
      setSeePassword(false);
    } else setSeePassword(true);
  };

  return {
    handleDetailsChange,
    handleNavigateNext,
    selectedValue,
    setSelectedValue,
    details,
    isValidTrakName,
    isValidTrakSymbol,
    handleSeePassword,
    seePassword,
    isValidPassword,
    isValidConfirmEmail,
  };
};
