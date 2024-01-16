/**
 * Traklist Base API Route
 */
const TRAKLIST = "https://europe-west1-traklist-7b38a.cloudfunctions.net/api";

/**
 * Traklist User Registration Route
 */
export const REGISTER_ROUTE = TRAKLIST + "/register";

/**
 * Traklist User Sign In Route
 */
export const SIGN_IN_ROUTE = TRAKLIST + "/login";

/**
 * Traklist User Sign In With Spotify Route
 */
export const SIGN_IN_SPOTIFY_ROUTE = TRAKLIST + "/login/spotify";

/**
 * Traklist User Sign In With Spotify Route
 */
export const TRAKLITE_AUTH_ROUTE = TRAKLIST + "/login/traklite";

/**
 * Traklist User Data Route
 */
export const USER = TRAKLIST + "/user";

/**
 * Traklist User Detail Data Route
 */
export const USER_DETAIL = (username: string) => TRAKLIST + "/user/" + username;

/**
 * Traklist Users Data Route
 */
export const USERS = TRAKLIST + "/users";

/**
 * Traklist Get Other User Data Route
 */
export const GET_ANY_USER_ROUTE = (username: string) =>
  TRAKLIST + "/search/" + username;

/**
 * Traklist Refresh Token Update Route
 */
export const UPDATE_REFRESH_TOKEN = TRAKLIST + "/user/token";

/**
 * Traklist New Post Route
 */
export const NEW_POST_ROUTE = TRAKLIST + "/post";

/**
 * Traklist Get All Posts Route
 */
export const GET_POSTS = TRAKLIST + "/posts";

/**
 * Traklist Like Post Route
 * @param id
 * @returns
 */
export const LIKE_POST_ROUTE = (id: string) => TRAKLIST + "/" + id + "/like";

/**
 * Traklist Un-Like Post Route
 * @param id
 * @returns
 */
export const UNLIKE_POST_ROUTE = (id: string) =>
  TRAKLIST + "/" + id + "/unlike";

/**
 * Traklist Save Post Route
 * @param id
 * @returns
 */
export const SAVE_POST_ROUTE = (id: string) => TRAKLIST + "/" + id + "/save";

/**
 * Traklist Un-Save Post Route
 * @param id
 * @returns
 */
export const UNSAVE_POST_ROUTE = (id: string) =>
  TRAKLIST + "/" + id + "/unsave";

/**
 * Traklist Comment On Post Route
 * @param id
 * @returns
 */
export const POST_COMMENT = (id: string) => TRAKLIST + "/" + id + "/comment";

/**
 * Traklist Get Latest news
 */
export const GET_NEWS =
  "https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE/traklite/admin/news";

/**
 * Traklist Get Latest news
 */
export const GET_HOT_100 = TRAKLIST + "/admin/charts/billboard/hot-100";

/**
 * Traklist Get Trending
 */
export const GET_TRENDING =
  "https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE/traklite/admin/trending";

/**
 * Traklist Set Gamification Likes
 * @param type
 * @returns
 */
export const SET_GAMIFICATION_LIKE = (type: string) =>
  TRAKLIST + "/gamification/like/" + type;

export const START_PARTY = TRAKLIST + "/party";

export const GET_PARTY = (id: string) => TRAKLIST + "/party/" + id;

export const MAKE_DJ_REQUEST = (id: string) =>
  TRAKLIST + "/party/request/" + id;
