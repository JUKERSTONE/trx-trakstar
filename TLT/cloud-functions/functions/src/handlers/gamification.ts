import db from "../util/admin";

export const likeItem = (req: any, res: any) => {
  const type = req.params.type;
  switch (type) {
    case "track":
      const likeDocument = db
        .collection("gamification-likes")
        .where("username", "==", req.user.username)
        .where("trackID", "==", req.body.trackID)
        .limit(1);

      //   const postDocument = db.doc(`/posts/${req.params.postID}`);

      let likeData = {
        type,
        trackID: req.body.trackID,
        username: req.user.username,
        likedAt: new Date().toISOString(),
      };

      //   postDocument.get().then((doc) => {
      //     if (doc.exists) {
      //       postData = doc.data();
      //       postData.postID = doc.id;
      //       return likeDocument.get();
      //     } else {
      //       return res.status(404).json({ error: "Post not found" });
      //     }
      //   });

      likeDocument
        .get()
        .then((data) => {
          if (data.empty) {
            return db
              .collection("likes")
              .add(likeData)
              .then(() => {
                return res.json(likeData);
              });
          } else {
            return res.status(400).json({ error: "Post already liked" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: err.code });
        });
  }
};
