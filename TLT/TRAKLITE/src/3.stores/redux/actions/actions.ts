import * as actionTypes from "./action-types";

export const AUTH_STATE = (description: string) => {
  return {
    type: actionTypes.LOADING,
    payload: {
      description,
    },
  };
};

export const SET_SPOTIFY_ACCESS_TOKEN = (description: string, data: any) => {
  return {
    type: actionTypes.SET_SPOTIFY_ACCESS_TOKEN,
    payload: {
      description,
      data,
    },
  };
};

export const TOGGLE_SEARCH = (description: string) => {
  return {
    type: actionTypes.TOGGLE_SEARCH,
    payload: {
      description,
    },
  };
};

export const SET_PLAYER = (description: string, data: any) => {
  return {
    type: actionTypes.SET_PLAYER,
    payload: {
      description,
      data,
    },
  };
};

export const TOGGLE_REPLAY = (description: string) => {
  return {
    type: actionTypes.TOGGLE_REPLAY,
    payload: {
      description,
    },
  };
};

export const LOCK_PLAYER = (description: string, data: any) => {
  return {
    type: actionTypes.LOCK_PLAYER,
    payload: {
      description,
      data,
    },
  };
};

export const HIDE_PLAYER = (description: string, data: any) => {
  return {
    type: actionTypes.HIDE_PLAYER,
    payload: {
      description,
      data,
    },
  };
};

export const TOGGLE_MUTE = (description: string, data: any) => {
  return {
    type: actionTypes.TOGGLE_MUTE,
    payload: {
      description,
      data,
    },
  };
};

export const TOGGLE_PLAYER = (description: string) => {
  return {
    type: actionTypes.TOGGLE_PLAYER,
    payload: {
      description,
    },
  };
};

export const TOGGLE_FULL_SCREEN = (description: string, data: any) => {
  return {
    type: actionTypes.TOGGLE_FULL_SCREEN,
    payload: {
      description,
      data,
    },
  };
};

export const POP_PROFILE = (description: string, data: any) => {
  return {
    type: actionTypes.POP_PROFILE,
    payload: {
      description,
      data,
    },
  };
};

export const TOGGLE_POST_OPTIONS = (description: string, data: any) => {
  return {
    type: actionTypes.TOGGLE_POST_OPTIONS,
    payload: {
      description,
      data,
    },
  };
};

export const SPOTIFY_CLIENT_TOKEN = (description: string, data: any) => {
  return {
    type: actionTypes.SPOTIFY_CLIENT_TOKEN,
    payload: {
      description,
      data,
    },
  };
};

export const LOAD_FEED = (description: string, data: any) => {
  return {
    type: actionTypes.LOAD_FEED,
    payload: {
      description,
      data,
    },
  };
};

export const USER_REGISTERED = (
  description: string,
  data: any,
  tokens: any
) => {
  return {
    type: actionTypes.USER_REGISTERED,
    payload: {
      description,
      data,
      tokens,
    },
  };
};

export const USER_LOGGED_IN_SPOTIFY = (description: string, data: any) => {
  return {
    type: actionTypes.USER_LOGGED_IN_SPOTIFY,
    payload: {
      description,
      data,
    },
  };
};

export const SET_ONBOARDED = (description: string) => {
  return {
    type: actionTypes.SET_ONBOARDED,
    payload: {
      description,
    },
  };
};

export const FAILED_INITIAL_AUTH = (description: string) => {
  return {
    type: actionTypes.FAILED_INITIAL_AUTH,
    payload: {
      description,
    },
  };
};

export const USER_PERSISTED = (description: string, data: any, keys: any) => {
  return {
    type: actionTypes.USER_PERSISTED,
    payload: {
      description,
      data,
      keys,
    },
  };
};

export const USER_OFFLINE_PERSISTED = (description: string, data: any) => {
  return {
    type: actionTypes.USER_OFFLINE_PERSISTED,
    payload: {
      description,
      data,
    },
  };
};

export const USER_SPOTIFY_AUTHENTICATED = (
  description: string,
  data: { [key: string]: string }
) => {
  return {
    type: actionTypes.USER_SPOTIFY_AUTHENTICATED,
    payload: {
      description,
      data,
    },
  };
};

export const OFFLINE_LIKE = (description: string, data: any) => {
  return {
    type: actionTypes.OFFLINE_LIKE,
    payload: {
      description,
      data,
    },
  };
};

export const ONLINE_LIKE = (description: string, data: any) => {
  return {
    type: actionTypes.ONLINE_LIKE,
    payload: {
      description,
      data,
    },
  };
};

export const SET_PARTY = (description: string, data: any) => {
  return {
    type: actionTypes.SET_PARTY,
    payload: {
      description,
      data,
    },
  };
};

export const SIGN_OUT = (description: string, data: any) => {
  return {
    type: actionTypes.SIGN_OUT,
    payload: {
      description,
      data,
    },
  };
};
