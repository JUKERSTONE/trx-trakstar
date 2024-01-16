import firebase from "firebase";
import db from "../util/admin";
import config from "../util/config";
import { auth } from "../util/admin";
import { reduceUserDetails } from "../util/validators";

import {
  validateRegistrationData,
  validateLogInData,
} from "../util/validators";

firebase.initializeApp(config);

export const trakliteLogin = (req: any, res: any) => {
  const user = {
    date: new Date(),
    id: req.body.id,
    email: req.body.email,
    refresh_token: req.body.refresh_token,
    playlists: req.body.playlists,
    top_tracks: req.body.top_tracks,
    top_artists: req.body.top_artists,
  };

  // return res.json(user);

  const serialzedUser = JSON.stringify(user);

  const userDocument = db.doc(`/users/${user.id}`);

  return userDocument.get().then((doc: any) => {
    if (doc.exists) {
      const data = doc.data();
      userDocument.set({ ...data, [user.date as any]: { serialzedUser } });
      return res.json(doc.data());
    } else {
      userDocument.set({ [user.date as any]: { serialzedUser } });
      return res.json("user store created");
    }
  });

  // userDocument.update({ [user.date as any]: serialzedUser }).then(() => {
  //   return res.json("success");
  // });
};

export const login = (req: any, res: any) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLogInData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data: any) => {
      return data.user.getIdTokenResult();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code == "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      } else if (err.code == "auth/user-not-found") {
        return res
          .status(403)
          .json({ general: "User not found, please try again" });
      }
      return res.status(500).json({ error: err.code });
    });
};

export const getUserDetails = (req: any, res: any) => {
  let userData: any = {};
  db.doc(`/users/${req.params.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        return db
          .collection("posts")
          .where("username", "==", req.params.username)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .then((data) => {
      userData.posts = [];
      data.forEach((doc: any) => {
        userData.posts.push({
          createdAt: doc.data().createdAt,
          username: doc.data().username,
          following: doc.data().following,
          followers: doc.data().followers,
          image: doc.data().image,
          playlist: doc.data().playlist,
          recentlyPlayed: doc.data().recentlyPlayed,
          topArtists: doc.data().topArtists,
          topTracks: doc.data().topTracks,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

export const register = (req: any, res: any) => {
  const newUser = {
    admin: req.body.admin,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    email: req.body.email,
    username: req.body.username,
    image: req.body.image,
    s_email: req.body.s_email,
    s_id: req.body.s_id,
    s_refresh_token: req.body.s_refresh_token,
  };

  const { valid, errors } = validateRegistrationData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token: string, userId: string;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "this username is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then((data: any) => {
            userId = data.user.uid;
            return data.user.getIdTokenResult();
          })
          .then((idToken) => {
            token = idToken;
            const userCredentials = {
              admin: newUser.admin,
              username: newUser.username,
              email: newUser.email,
              image: newUser.image,
              services: {
                spotify: {
                  email: newUser.s_email,
                  id: newUser.s_id,
                  refresh_token: newUser.s_refresh_token,
                },
              },
              followers: [],
              following: [],
              createdAt: new Date().toISOString(),
              userId,
            };

            db.doc(`/users/${newUser.username}`).set(userCredentials);
          })
          .then(() => {
            return res.status(201).json({ token });
          })
          .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
              return res
                .status(400)
                .json({ email: "e-mail is already in use" });
            } else if (err.code === "auth/weak-password") {
              return res
                .status(400)
                .json({ password: "password must be stronger" });
            } else {
              return res.status(500).json({ error: err.code });
            }
          });
      }
    });
};

interface UserObject {
  [key: string]: any;
}

export const getAuthenticatedUser = (req: any, res: any) => {
  let userData: UserObject = {};
  db.doc(`/users/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("username", "==", req.user.username)
          .get();
      }
      return;
    })
    .then((data: any) => {
      userData.likes = [];
      data.forEach((doc: any) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection("posts")
        .where("username", "==", req.user.username)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then((data: any) => {
      userData.posts = [];
      data.forEach((doc: any) => {
        userData.posts.push(doc.data());
      });
      return userData;
    })
    .then((doc) => {
      return res.json(doc);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

export const spotifyLogin = (req: any, res: any) => {
  const user = {
    email: req.body.email,
    refresh_token: req.body.refresh_token,
  };

  let userData: any = [];
  db.collection("users")
    .where("services.spotify.email", "==", user.email)
    .get()
    .then((data) => {
      userData = []; // change to object
      data.forEach((doc) => {
        userData.push({
          email: doc.data().services.spotify.email,
          refresh_token: doc.data().services.spotify.refresh_token,
          userId: doc.data().userId,
        });
      });
      return userData;
    })
    .then((data) => {
      const uid = data[0].userId;
      if (data[0].email === user.email) {
        auth
          .createCustomToken(uid)
          .then((customToken) => {
            firebase
              .auth()
              .signInWithCustomToken(customToken)
              .then((user: any) => {
                return user.user.getIdTokenResult();
              })
              .then((token) => {
                return res.json({ token });
              })
              .catch((err) => console.log(err));
            return;
          })
          .catch((err) => console.log(err));
      } else return res.status(501).json({ error: "This should never happen" });
      return;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

export const updateRefreshToken = (req: any, res: any) => {
  let services: any = {};

  db.doc(`/users/${req.user.username}`)
    .get()
    .then((doc) => {
      services = doc.data()?.services;
      const newServices = {
        ...services,
        spotify: {
          ...services.spotify,
          refresh_token: req.body.refresh_token,
        },
      };
      return newServices;
    })
    .then((services) => {
      db.doc(`/users/${req.user.username}`).update({ services });
      res.json({
        message: "refresh token updated to " + req.body.refresh_token,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

export const getUser = (req: any, res: any) => {
  return db
    .collection("users")
    .where("username", "==", req.params.user)
    .get()
    .then((data) => {
      let users: any = [];
      data.forEach((doc) => {
        users.push(doc.data());
      });
      return res.json({ users });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

export const followUser = (req: any, res: any) => {
  const followDocument = db
    .collection("follow")
    .where("sender", "==", req.user.username)
    .where("recipient", "==", req.params.recipient)
    .limit(1);

  const recipientDocument = db.doc(`/users/${req.params.recipient}`);
  const senderDocument = db.doc(`/users/${req.user.username}`);

  let meData: any;

  senderDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        meData = doc.data();
        return;
      } else {
        return res.status(404).json({
          error: "This should never happen... suck my balls if you see this",
        });
      }
    })
    .catch(() =>
      res.status(404).json({
        error: "This should never happen... suck my balls if you see this",
      })
    );

  let userData: any;

  recipientDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        return followDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        if (userData.username !== meData.username) {
          return db
            .collection("follow")
            .add({
              recipient: req.params.recipient,
              sender: req.user.username,
              followed_at: new Date().toISOString(),
            })
            .then(() => {
              const followers = [...userData.followers, req.user.username];
              return recipientDocument.update({ followers });
            })
            .then(() => {
              const following = [...userData.followers, req.params.recipient];
              return senderDocument.update({ following });
            })
            .then(() => {
              return res.json(userData);
            });
        } else {
          return res.status(400).json({ error: "you cant follow yourself" });
        }
      } else {
        return res.status(400).json({ error: "User already followed" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const unFollowUser = (req: any, res: any) => {
  const followDocument = db
    .collection("follow")
    .where("sender", "==", req.user.username)
    .where("recipient", "==", req.params.recipient)
    .limit(1);

  const recipientDocument = db.doc(`/users/${req.params.recipient}`);
  const senderDocument = db.doc(`/users/${req.user.username}`);

  let userData: any;

  senderDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData = doc.data();
        return followDocument.get();
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "User not followed" });
      } else {
        return db
          .doc(`/follow/${data.docs[0].id}`)
          .delete()
          .then(() => {
            const index = userData.followers.indexOf(req.user.username);
            if (index > -1) {
              userData.followers.splice(index, 1);
            }
            const followers = [...userData.followers];
            return recipientDocument.update({ followers });
          })
          .then(() => {
            const index = userData.following.indexOf(req.params.recipient);
            if (index > -1) {
              userData.following.splice(index, 1);
            }
            const following = [...userData.following];
            return senderDocument.update({ following });
          })
          .then(() => {
            return res.json(userData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const updateUserDetails = (req: any, res: any) => {
  let userDetails = reduceUserDetails(req.body);

  // return res.json({ message: JSON.stringify(userDetails) });

  db.doc(`/users/${req.user.username}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added succesfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

export const getAllUsersDetails = (req: any, res: any) => {
  let userData: any = {};
  db.collection("users")
    .get()
    .then((data) => {
      userData.users = [];
      data.forEach((doc) => {
        userData.users.push({
          createdAt: doc.data().createdAt,
          username: doc.data().username,
          spotifyID: doc.data().spotifyID,
          recentlyPlayed: doc.data().recentlyPlayed,
          playlists: doc.data().playlists,
          topArtists: doc.data().topArtists,
          topTracks: doc.data().topTracks,
          image: doc.data().image,
        });
      });
      return res.json(userData.users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
