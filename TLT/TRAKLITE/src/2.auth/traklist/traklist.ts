import { useContext } from "react";

import axios from "axios";
import storage from "@react-native-firebase/storage";
import { useProvider } from "../../3.stores/context";
import { RegistrationState, SpotifyAuthState } from "../../6.containers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import {
  REGISTER_ROUTE,
  SIGN_IN_ROUTE,
  USER,
  SIGN_IN_SPOTIFY_ROUTE,
  UPDATE_REFRESH_TOKEN,
  TRAKLITE_AUTH_ROUTE,
} from "../../1.api";

import { store } from "../../3.stores";
import { authHandler } from "../";
import * as actions from "../../3.stores";
import { SignInState } from "../../6.containers";

export async function register(
  details: RegistrationState,
  spotify: SpotifyAuthState,
  image: any
) {
  const data = {
    admin: false,
    username: details.username,
    email: details.email,
    password: details.password,
    confirm_password: details.confirmPassword,
    s_id: spotify.spotifyID,
    s_refresh_token: spotify.refresh_token,
    s_email: spotify.spotifyEmail,
    image:
      "https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/" +
      details.username +
      "?alt=media",
    // spotifyProduct: spotify.product,
  };

  try {
    const response = await axios.post(REGISTER_ROUTE, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tokenDetails = response.data.token;
    console.log("🚀 ~ file: traklist.ts ~ line 52 ~ response", response);

    const userData = await getUserData(tokenDetails.token);
    //
    const newData = {
      ...userData.data.credentials,
      likes: userData.data.likes,
      services: {
        spotify: {
          ...userData.data.credentials.services.spotify,
          playlists: spotify.playlists,
          top_tracks: spotify.top_tracks,
          top_artists: spotify.top_artists,
          recently_played: spotify.recently_played,
          access_token: spotify.access_token,
        },
      },
      gamification: {
        audio_features: {
          acousticness: null,
          energy: null,
          instrumentalness: null,
          liveness: null,
          loudness: null,
          speechiness: null,
        },
      },
    };

    const reference = storage().ref(data.username as string); // change reference to username_pp.png
    await reference.putFile(image ? image.path : image);

    return {
      success: true,
      data: newData,
      token: tokenDetails,
    };
  } catch (error: any) {
    return {
      success: false,
      data: error.response.data,
    };
  }
}

export async function signIn(details: SignInState) {
  try {
    const response = await axios.post(SIGN_IN_ROUTE, details, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const tokenDetails = response.data.token;

    const userData = await getUserData(tokenDetails.token);

    const refresh_token =
      userData.data.credentials.services.spotify.refresh_token;
    console.log(
      "🚀 ~ file: traklist.ts ~ line 108 ~ signIn ~ refresh_token",
      refresh_token
    );

    const spotify = await authHandler.refreshLogin(
      refresh_token,
      response.data.token
    );
    console.log(
      "🚀 ~ file: traklist.ts ~ line 115 ~ signIn ~ spotify",
      spotify
    );

    const expiryTimeStamp = moment(spotify?.data.access_token_expiry).format(
      "LTS"
    );

    const newData = {
      ...userData.data.credentials,
      likes: userData.data.likes,
      services: {
        spotify: {
          ...userData.data.credentials.services.spotify,
          playlists: spotify?.data.playlists,
          top_tracks: spotify?.data.top_tracks,
          top_artists: spotify?.data.top_artists,
          recently_played: spotify?.data.recently_played,
          access_token: spotify?.data.access_token,
          access_token_expiry: expiryTimeStamp,
          refresh_token: spotify?.data.refresh_token,
        },
      },
    };

    return {
      success: true,
      data: newData,
      token: tokenDetails,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

export const persistAuthInWithSpotify = async (
  refreshToken: any,
  traklistToken: any
) => {
  const spotify: any = await authHandler.refreshLogin(
    refreshToken,
    traklistToken
  );
  console.log("🚀 ~ file: traklist.ts ~ line 157 ~ spotify", spotify);

  if (spotify!.success) {
    return {
      success: true,
      token: {
        access_token: spotify!.data.access_token,
        refresh_token: spotify!.data.refresh_token,
        access_token_expiry: spotify!.data.access_token_expiry,
      },
    };
  } else {
    return {
      success: false,
    };
  }
};

export async function signInWithSpotify() {
  const spotify = await authHandler.onLogin();

  if (!spotify!.success) {
    return {
      success: false,
      data: "User details not found. Try again",
    };
  }

  try {
    const userResponse = await axios.get(
      "https://api.spotify.com/v1/users/" + spotify?.data.spotifyID,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + spotify?.data.access_token,
        },
      }
    );

    const access_token_expiry = moment(
      spotify?.data.access_token_expiry
    ).format("LTS");

    const newData = {
      services: {
        spotify: {
          id: spotify?.data.spotifyID,
          images: userResponse.data.images,
          playlists: spotify?.data.playlists,
          top_tracks: spotify?.data.top_tracks,
          top_artists: spotify?.data.top_artists,
          recently_played: spotify?.data.recently_played,
          access_token: spotify?.data.access_token,
          access_token_expiry,
        },
      },
    };

    if (
      spotify?.data.top_artists.length == 0 ||
      spotify?.data.top_tracks.length == 0
    ) {
      return {
        success: false,
        data: "Hmmn..\n\n Seems like you're not an active user on Spotify. \nClick the icon in the top right of the screen to use the offline version of TRAKLITE",
      };
    }

    return {
      success: true,
      data: newData,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

export const signOut = (data?: any) => {
  AsyncStorage.clear();
  store.dispatch(actions.SIGN_OUT("user signed out.", data));
};

export async function getUserData(token: string) {
  try {
    const response = await axios.get(USER, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
}

export async function updateRefreshToken(token: string, refreshToken: string) {
  const body = {
    refresh_token: refreshToken,
  };
  try {
    const response = await axios.post(UPDATE_REFRESH_TOKEN, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
}
