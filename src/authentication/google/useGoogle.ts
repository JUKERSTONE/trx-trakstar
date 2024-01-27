import {authorize, refresh, revoke} from 'react-native-app-auth';

export const useGoogle = () => {
  const config = {
    issuer: 'https://accounts.google.com',
    clientId: 'GOOGLE_OAUTH_APP_GUID.apps.googleusercontent.com',
    redirectUrl:
      'com.googleusercontent.apps.GOOGLE_OAUTH_APP_GUID:/oauth2redirect/google',
    scopes: ['openid', 'profile'],
  };

  // Log in to get an authentication token
  const authorizeGoogle: any = async () => await authorize(config);

  // Refresh token
  const refreshedState: any = async () =>
    await refresh(config, {
      refreshToken: authorizeGoogle().refreshToken,
    });

  // Revoke token
  const revokeState = async () =>
    await revoke(config, {
      tokenToRevoke: refreshedState().refreshToken!,
    });

  return {
    authorizeGoogle,
    refreshedState,
    revokeState,
  };
};
