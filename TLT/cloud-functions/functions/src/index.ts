import * as functions from "firebase-functions";
import * as express from "express";

const app = express();

import FBAuth from "./util/fb_auth";

import {
  newPost,
  getPost,
  getPosts,
  likePost,
  unLikePost,
  savePost,
  unSavePost,
  commentOnPost,
  deletePost,
} from "./handlers/posts";
import {
  login,
  getUser,
  register,
  followUser,
  unFollowUser,
  spotifyLogin,
  trakliteLogin,
  getUserDetails,
  updateUserDetails,
  getAllUsersDetails,
  updateRefreshToken,
  getAuthenticatedUser,
} from "./handlers/users";
import { addStory, removeStory, getStories } from "./handlers/stories";
import { getAllCards, addCardHistory } from "./handlers/cards";
import { addCard, swipeAction, addCards, getCards } from "./handlers/swipe";
import { likeItem } from "./handlers/gamification";
import {
  deleteArticle,
  setTrending,
  pushTrending,
  popTrending,
  setSpotlight,
  setArticle,
  setHot100,
  getNews,
  getHot100,
} from "./handlers/admin";
import { addParty, getParty, makeRequest, djAction } from "./handlers/parties";

// Parties
app.post("/party", FBAuth, addParty);
app.post("/party/:partyId/dj", FBAuth, djAction);
app.get("/party/:partyId", FBAuth, getParty);
app.post("/party/request/:partyId", FBAuth, makeRequest);

// Cards
app.get("/cards", getAllCards);
app.post("/card", FBAuth, addCardHistory);

// Swipe
app.post("/swipe/card", FBAuth, addCard);
app.post("/swipe", FBAuth, addCards);
app.get("/swipe", FBAuth, getCards);
app.post("/swipe/swipeAction", FBAuth, swipeAction);

// Stories
app.get("/stories", FBAuth, getStories);
app.get("/story/add", FBAuth, addStory);
app.get("/story/remove", FBAuth, removeStory);

// Admin
app.post("/admin/charts/billboard/hot-100", FBAuth, setHot100);
app.get("/admin/charts/billboard/hot-100", getHot100);
app.post("/admin/trending/set", FBAuth, setTrending);
app.post("/admin/trending/push", FBAuth, pushTrending);
app.post("/admin/trending/pop", FBAuth, popTrending);
app.post("/admin/spotlight/set", FBAuth, setSpotlight);
app.post("/admin/news/article", FBAuth, setArticle);
app.get("/admin/news", getNews);
app.delete("/admin/news/article/:articleID", FBAuth, deleteArticle);

// Posts
app.get("/posts", getPosts);
app.get("/post/:postID", getPost);
app.post("/post", FBAuth, newPost);
app.get("/:postID/like", FBAuth, likePost);
app.get("/:postID/unlike", FBAuth, unLikePost);
app.get("/:postID/save", FBAuth, savePost);
app.get("/:postID/unsave", FBAuth, unSavePost);
app.delete("/post/:postID", FBAuth, deletePost);
app.post("/:postID/comment", FBAuth, commentOnPost);

// Users
app.post("/register", register);
app.post("/login", login);
app.post("/login/spotify", spotifyLogin);
app.post("/login/traklite", trakliteLogin);
app.get("/user/:username", getUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/users/", getAllUsersDetails);
app.post("/user", FBAuth, updateUserDetails);
app.get("/search/:user", FBAuth, getUser);
app.get("/user/:recipient/follow", FBAuth, followUser);
app.get("/user/:recipient/unfollow", FBAuth, unFollowUser);
app.post("/user/token", FBAuth, updateRefreshToken);

// Gamification
app.post("/gamification/like/:type", likeItem);

exports.api = functions.region("europe-west1").https.onRequest(app);
