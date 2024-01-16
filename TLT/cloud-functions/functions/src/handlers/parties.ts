import db from "../util/admin";

export const djAction = (req: any, res: any) => {
  const djAction = {
    action: req.body.action,
    spotifyId: req.body.spotifyId,
  };
  const partyDocument = db.doc(`/parties/${req.params.partyId}`);

  partyDocument.get().then((doc) => {
    if (doc.exists) {
      const data: any = doc.data();
      const requests = data.requests;
      var result = requests.find((request: any) => {
        return request.spotifyId === djAction.spotifyId;
      });

      const response = {
        ...result,
        action: djAction.action,
      };

      const partyData = [...data?.requests, response];
      partyDocument.update({ requests: partyData });

      return res.json({ message: "action dispatched" });
    } else return res.status(400).json({ error: "Party Doc doesn't exist" });
  });
};

export const addParty = (req: any, res: any) => {
  const partyDocument = {
    djId: req.user.username,
    assumedCapacity: req.body.assumedCapacity,
    expires: req.body.expires,
    requests: {},
  };

  db.collection("parties")
    .add(partyDocument)
    .then((doc: any) => {
      return res.json({ message: "party successfully created", id: doc.id });
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
};

// join party
export const getParty = (req: any, res: any) => {
  const partyId = req.params.partyId;
  let partyData: any = {};
  db.doc(`/parties/${partyId}`)
    .get()
    .then((doc: any) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Party not found" });
      }
      partyData = { ...doc.data(), id: doc.id };
      return res.json(partyData);
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const makeRequest = (req: any, res: any) => {
  const requestObject = {
    spotifyId: req.body.id,
    title: req.body.title,
    artist: req.body.artist,
    artwork: req.body.artwork,
  };

  //

  const partyDocument = db.doc(`/parties/${req.params.partyId}`);

  partyDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data: any = doc.data();
        const request = {
          username: req.user.username,
          ...requestObject,
        };

        const partyData = [...data?.requests, request];

        return partyDocument.update({ requests: partyData });
      } else return res.status(400).json({ error: "Party Doc doesn't exist" });
    })
    .then(() => {
      return res.json({ message: "The DJ has received your request" });
    });
};
