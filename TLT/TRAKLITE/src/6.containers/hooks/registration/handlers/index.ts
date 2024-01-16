export const updateRegistrationState = (
  text: string,
  field: string,
  registration: any,
  setRegistration: any,
) => {
  switch (field) {
    case 'name':
      setRegistration({
        ...registration,
        username: text,
      });
      break;
    case 'email':
      setRegistration({
        ...registration,
        email: text,
      });
      break;
    case 'password':
      setRegistration({
        ...registration,
        password: text,
      });
      break;
    case 'confirm_password':
      setRegistration({
        ...registration,
        confirmPassword: text,
      });
      break;
    default:
  }
};

export const spotifyState = {
  access_token: '',
  access_token_expiry: '',
  refresh_token: '',
  spotifyID: '',
  spotifyEmail: '',
  product: '',
};

export const registrationState = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
};
