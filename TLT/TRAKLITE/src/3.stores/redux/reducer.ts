import * as actions from "./actions/action-types";
import moment from "moment";
interface IAppState {
  timestamp: string;
  loading: boolean;
  loggedIn: boolean;
  options: any;
  player: {};
  offline: any;
  keys: any;
  user_data: {
    createdAt: string;
    email: string;
    followers: any[];
    following: any[];
    gamification: any;
    image: string;
    playlist: string;
    posts: any[];
    services: any;
    topArtists: string;
    topTracks: string;
    userId: string;
    username: string;
  };
}

const timestamp = new Date().toString();

export const initialState = {
  timestamp,
  loading: false,
  loggedIn: false,
  options: {
    hasSearch: false,
  },
  player: {
    isMuted: false,
    isHidden: true,
    hasReplay: true,
  },
  modal: {
    type: "",
    full_screen: {
      active: false,
      image: "",
    },
    track_screen: {
      active: false,
      track: "",
    },
    artist_screen: {
      active: false,
      artist: "",
    },
    profile: {
      active: false,
      data: "",
    },
    post: {
      active: false,
    },
  },
  user_data: {},
  offline: {
    likes: [],
    isOnboarded: false,
  },
  keys: {
    spotify: {
      s_client_token: "",
      access_token: "",
    },
  },
};

export const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actions.LOADING:
      return {
        ...state,
        loading: !state.loading,
        timestamp: new Date().toString(),
      };
    case actions.SET_SPOTIFY_ACCESS_TOKEN:
      return {
        ...state,
        keys: {
          ...state.keys,
          spotify: {
            ...state.keys.spotify,
            ...action.payload.data,
          },
        },
        timestamp: new Date().toString(),
      };

    case actions.LOAD_FEED:
      return {
        ...state,
        feed: action.payload.data,
        timestamp: new Date().toString(),
      };

    case actions.SET_PLAYER:
      if (!state.player.isLocked) {
        return {
          ...state,
          player: action.payload.data,
          timestamp: new Date().toString(),
        };
      } else
        return {
          ...state,
        };
    case actions.TOGGLE_MUTE:
      return {
        ...state,
        player: {
          ...state.player,
          isMuted: action.payload.data,
        },
        timestamp: new Date().toString(),
      };

    case actions.TOGGLE_PLAYER:
      return {
        ...state,
        player: {
          ...state.player,
          isPaused: !state.player?.isPaused,
        },
        timestamp: new Date().toString(),
      };

    case actions.TOGGLE_REPLAY:
      return {
        ...state,
        player: {
          ...state.player,
          hasReplay: !state.player?.hasReplay,
        },
        timestamp: new Date().toString(),
      };
    case actions.TOGGLE_SEARCH:
      return {
        ...state,
        options: {
          ...state.options,
          hasSearch: !state.options?.hasSearch,
        },
        timestamp: new Date().toString(),
      };

    case actions.TOGGLE_FULL_SCREEN:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload.data,
        },
        timestamp: new Date().toString(),
      };

    case actions.POP_PROFILE:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload.data,
        },
        timestamp: new Date().toString(),
      };

    case actions.TOGGLE_POST_OPTIONS:
      return {
        ...state,
        modal: {
          ...state.modal,
          ...action.payload.data,
        },
        timestamp: new Date().toString(),
      };

    case actions.LOCK_PLAYER:
      return {
        ...state,
        player: {
          ...state.player,
          isLocked: action.payload.data,
        },
        timestamp: new Date().toString(),
      };

    case actions.HIDE_PLAYER:
      return {
        ...state,
        player: {
          ...state.player,
          isHidden: !action.payload.data,
        },
        timestamp: new Date().toString(),
      };

    case actions.SPOTIFY_CLIENT_TOKEN:
      return {
        ...state,
        keys: {
          ...state.keys,
          spotify: {
            ...state.keys?.spotify,
            s_client_token: action.payload.data,
          },
        },
        timestamp: new Date().toString(),
      };

    case actions.OFFLINE_LIKE:
      return {
        ...state,
        offline: {
          ...state.offline,
          likes: action.payload.data,
        },
        timestamp: new Date().toString(),
      };
    case actions.FAILED_INITIAL_AUTH:
      return {
        ...state,
        isFailedInitialAuth: true,
        timestamp: new Date().toString(),
      };

    case actions.ONLINE_LIKE:
      return {
        ...state,
        user_data: {
          ...state.user_data,
          likes: action.payload.data,
        },
        timestamp: new Date().toString(),
      };

    case actions.USER_REGISTERED:
      switch (action.payload.data.success) {
        case true:
          return {
            ...state,
            user_data: action.payload.data.data,
            loggedIn: true,
            timestamp: new Date().toString(),
            stories: [],
            keys: {
              ...state.keys,
              spotify: {
                ...state.keys?.spotify,
                ...action.payload.tokens,
              },
              traklist: {
                access_token: action.payload.data.token,
                expires: moment(
                  new Date(action.payload.data.token.expirationTime)
                ).format("LTS"),
              },
            },
          };
        case false:
          alert("success : false");
          break;
      }
    case actions.USER_LOGGED_IN_SPOTIFY:
      console.log(
        "🚀 ~ file: reducer.ts ~ line 267 ~ reducer ~ action",
        action.payload
      );
      return {
        ...state,
        user_data: action.payload.data,
        loggedIn: true,
        timestamp: new Date().toString(),
        stories: [],
        keys: {
          ...state.keys,
          spotify: {
            ...state.keys?.spotify,
            access_token: action.payload.data.services.spotify.access_token,
            expires: action.payload.data.services.spotify.access_token_expiry,
            refresh_token: action.payload.data.services.spotify.refresh_token,
          },
        },
      };
    case actions.USER_PERSISTED:
      return {
        ...state,
        user_data: action.payload.data,
        loggedIn: true,
        timestamp: new Date().toString(),
        stories: [],
        keys: action.payload.keys,
      };

    case actions.USER_OFFLINE_PERSISTED:
      return {
        ...state,
        offline: action.payload.data,
      };

    case actions.USER_SPOTIFY_AUTHENTICATED:
      return {
        ...state,
        user_data: {
          ...state.user_data,
          spotify: action.payload.data,
        },
        timestamp: new Date().toString(),
        // add refresh token to keys here
      };
    case actions.SET_ONBOARDED:
      return {
        ...state,
        offline: {
          ...state.offline,
          isOnboarded: true,
        },
        timestamp: new Date().toString(),
      };
    case actions.SET_PARTY:
      return {
        ...state,
        party: action.payload.data,
        timestamp: new Date().toString(),
      };
    case actions.SIGN_OUT:
      return {
        loggedIn: false,
        timestamp: new Date().toString(),
        ...action.payload.data,
      };
    default:
  }
};
