import db from "../util/admin";

export const newPost = (req: any, res: any) => {
  if (req.body.caption.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }
  const newPost = {
    post: {
      username: req.user.username,
      isRecent: req.body.isRecent,
      type: req.body.type,
      caption: req.body.caption,
      comments: [],
      count: {
        likes: 0,
        saves: 0,
        comments: 0,
      },
    },
    music: {
      service: req.body.service,
      title: req.body.title,
      artist: req.body.artist,
      artwork: req.body.artwork,
      preview: req.body.preview,
      sId: req.body.spotifyID,
    },
    createdAt: new Date().toISOString(),
  };

  db.collection("posts")
    .add(newPost)
    .then(() => {
      return res.json(newPost);
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
};

export const getPost = (req: any, res: any) => {
  let postData: any = {};
  db.doc(`/posts/${req.params.postID}`)
    .get()
    .then((doc: any) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      postData = doc.data();
      return res.json(postData);
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const getPosts = (req: any, res: any) => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data: any) => {
      let posts: any = [];
      data.forEach((doc: any) => {
        posts.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      return res.json(posts);
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const likePost = (req: any, res: any) => {
  const likeDocument = db
    .collection("likes")
    .where("username", "==", req.user.username)
    .where("postID", "==", req.params.postID)
    .limit(1);

  const postDocument = db.doc(`/posts/${req.params.postID}`);

  let postData: any;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            postID: req.params.postID,
            username: req.user.username,
            likedAt: new Date().toISOString(),
          })
          .then(() => {
            const newData = {
              ...postData.post,
              count: {
                ...postData.post.count,
                likes: postData.post.count.likes + 1,
              },
            };
            postData.likeCount++;
            return postDocument.update({ post: newData });
          })
          .then(() => {
            // update postData to like + 1
            return res.json(postData);
          });
      } else {
        return res.status(400).json({ error: "Post already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const unLikePost = (req: any, res: any) => {
  const likeDocument = db
    .collection("likes")
    .where("username", "==", req.user.username)
    .where("postID", "==", req.params.postID)
    .limit(1);

  const postDocument = db.doc(`/posts/${req.params.postID}`);

  let postData: any;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;
        return likeDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Post not liked" });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            const newData = {
              ...postData.post,
              count: {
                ...postData.post.count,
                likes: postData.post.count.likes - 1,
              },
            };
            return postDocument.update({ post: newData });
          })
          .then(() => {
            // update postData to like -1
            return res.json(postData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const commentOnPost = (req: any, res: any) => {
  let commentId: string;
  const postDocument = db.doc(`/posts/${req.params.postID}`);

  if (req.body.comment.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }
  const newPost = {
    post: {
      id: "",
      type: req.body.type,
      comment: req.body.comment,
      createdAt: new Date().toISOString(),
      comments: [],
      count: {
        likes: 0,
        comments: 0,
      },
    },
    username: req.user.username,
    spotifyID: req.body.spotifyID,
    //   image: req.body.image,
  };

  db.collection("posts")
    .add(newPost)
    .then((doc: any) => {
      return doc.id;
    })
    .then((id: any) => {
      commentId = id;
      return postDocument.get();
    })
    .then((doc) => {
      const newData = {
        ...doc.data(),
        post: {
          ...doc.data()?.post,
          comments: [...doc.data()?.post.comments, commentId],
          count: {
            ...doc.data()?.post.count,
            comments: doc.data()?.post.count.comments + 1,
          },
        },
      };
      postDocument.update({ post: newData.post });
      return res.json(newData);
    })
    .catch((err) => {
      return res.status(400).json({ err: err });
    });
};

export const deletePost = (req: any, res: any) => {
  // check if post is a comment
  // maybe have an isComment bosy request
  const document = db.doc(`/posts/${req.params.postID}`);
  document
    .get()
    .then((doc: any) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found" });
      }
      if (doc.data().username !== req.user.username) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      return res.json({ message: "Post deleted succesfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

export const savePost = (req: any, res: any) => {
  const saveDocument = db
    .collection("saves")
    .where("username", "==", req.user.username)
    .where("postID", "==", req.params.postID)
    .limit(1);

  const postDocument = db.doc(`/posts/${req.params.postID}`);

  let postData: any;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;
        return saveDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("saves")
          .add({
            postID: req.params.postID,
            username: req.user.username,
            savedAt: new Date().toISOString(),
          })
          .then(() => {
            const newData = {
              ...postData.post,
              count: {
                ...postData.post.count,
                saves: postData.post.count.saves + 1,
              },
            };
            postData.saveCount++;
            return postDocument.update({ post: newData });
          })
          .then(() => {
            // update postData to like + 1
            return res.json(postData);
          });
      } else {
        return res.status(400).json({ error: "Post already saved" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const unSavePost = (req: any, res: any) => {
  const saveDocument = db
    .collection("saves")
    .where("username", "==", req.user.username)
    .where("postID", "==", req.params.postID)
    .limit(1);

  const postDocument = db.doc(`/posts/${req.params.postID}`);

  let postData: any;

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postID = doc.id;
        return saveDocument.get();
      } else {
        return res.status(404).json({ error: "Post not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Post not liked" });
      } else {
        return db
          .doc(`/saves/${data.docs[0].id}`)
          .delete()
          .then(() => {
            const newData = {
              ...postData.post,
              count: {
                ...postData.post.count,
                saves: postData.post.count.saves - 1,
              },
            };
            return postDocument.update({ post: newData });
          })
          .then(() => {
            // update postData to like -1
            return res.json(postData);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
