export const updateSignInState = (
  text: string,
  field: string,
  signIn: any,
  setSignIn: any,
) => {
  switch (field) {
    case 'email':
      setSignIn({
        ...signIn,
        email: text,
      });
      break;
    case 'password':
      setSignIn({
        ...signIn,
        password: text,
      });
      break;
    default:
  }
};

export const signInState = {
  email: null,
  password: null,
};
