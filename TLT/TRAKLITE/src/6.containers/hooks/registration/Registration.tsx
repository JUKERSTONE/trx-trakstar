import React from 'react';

import useRegister from './useRegister';
import RegistrationForm from '../../../7.elements/registration';

export const RegistrationView = ({...props}) => {
  const {...useProps} = useRegister(props);
  return <RegistrationForm {...useProps} />;
};
