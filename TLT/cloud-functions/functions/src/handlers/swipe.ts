import db from "../util/admin";

export const addCard = (req: any, res: any) => {
  const newCard = req.body.card;
  const swipeDocument = db.doc(`/swipe/${req.user.username}`);
  swipeDocument
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        const data = doc.data();
        const card = [...data.card, newCard];
        swipeDocument.update({ card });
      } else {
        swipeDocument.set({ card: [newCard] });
      }
      return res.json("document created succesfully");
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

export const addCards = (req: any, res: any) => {
  const recommendations = req.body.recommendations;
  const swipeDocument = db.doc(`/swipe/${req.user.username}`);
  swipeDocument
    .get()
    .then((doc: any) => {
      swipeDocument.set({ recommendations });
      return res.json("document created succesfully");
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

export const getCard = (req: any, res: any) => {
  const swipeDocument = db.doc(`/swipe/${req.user.username}`);
  swipeDocument
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        const data = doc.data();
        return res.json(data);
      } else {
        return res.status(500).json({ error: "something went wrong" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

export const getCards = (req: any, res: any) => {
  const swipeDocument = db.doc(`/swipe/${req.user.username}`);
  swipeDocument
    .get()
    .then((doc: any) => {
      const data = doc.data();
      return res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

export const swipeAction = (req: any, res: any) => {
  const action = {
    user: req.user.username,
    trakID: req.body.spotifyId,
    isInterested: req.body.isInterested,
  };

  db.collection("swipe-actions")
    .add(action)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created succesfully` });
    })
    .catch((err) => {
      // if(err == "auth/argument-error") some error about having the wrong authentication
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
  //   const newCard = res.data.card;
  //   db.collection("swipe")
  //     .doc(req.user.username)
  //     .set(newCard)
  //     .then((doc) => {
  //       res.json({ message: `document created succesfully` });
  //     })
  //     .catch((err) => {
  //       // if(err == "auth/argument-error") some error about having the wrong authentication
  //       res.status(500).json({ error: "something went wrong" });
  //       console.error(err);
  //     });
};
