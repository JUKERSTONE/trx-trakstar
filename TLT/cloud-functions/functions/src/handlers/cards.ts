import db from "../util/admin";

export const getAllCards = (req: any, res: any) => {
  db.collection("cards")
    .orderBy("swipedAt", "desc")
    .get()
    .then((data) => {
      let cards: any = [];
      data.forEach((doc) => {
        cards.push(doc.data());
      });
      return res.json(cards);
    })
    .catch((err) => console.error(err));
};

export const addCardHistory = (req: any, res: any) => {
  const newCard = {
    username: req.user.username,
    third_party: req.body.third_party,
    track: req.body.track,
    service: req.body.service,
    mutual_listeners: req.body.mutual_listeners,
    type: req.body.type,
    swipedAt: new Date().toISOString(),
  };

  db.collection("cards")
    .add(newCard)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created succesfully` });
    })
    .catch((err) => {
      // if(err == "auth/argument-error") some error about having the wrong authentication
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
