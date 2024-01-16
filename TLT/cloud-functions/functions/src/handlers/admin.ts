import db from "../util/admin";

export const setTrending = (req: any, res: any) => {
  const trendingDoc = {
    position: req.body.position,
    status: req.body.status,
    artist: req.body.artist,
    image: req.body.image,
    track: req.body.track,
  };

  const trending: any = {};
  trending[trendingDoc.position] = trendingDoc;

  db.collection("admin-trending")
    .get()
    .then((data) => {
      data.docs[0].ref.update(trending).then(() => {
        return res.json("trending updated succesfully");
      });
    })
    .catch((err) => res.status(500).json({ error: "something went wrong" }));
};

export const pushTrending = (req: any, res: any) => {};

export const popTrending = (req: any, res: any) => {};

export const setSpotlight = (req: any, res: any) => {
  const spotlightDoc = {
    position: req.body.position,
    status: req.body.status,
    artist: req.body.artist,
    image: req.body.image,
    track: req.body.track,
  };

  const spotlight: any = {};
  spotlight[spotlightDoc.position] = spotlightDoc;

  db.collection("admin-spotlight")
    .get()
    .then((data) => {
      data.docs[0].ref.update(spotlight).then(() => {
        return res.json("spotlight updated succesfully");
      });
    })
    .catch((err) => res.status(500).json({ error: "something went wrong" }));
};

export const setHot100 = (req: any, res: any) => {
  const chartsDoc = {
    content: req.body.content,
  };

  db.collection("admin-charts")
    .get()
    .then((data) => {
      data.docs[0].ref
        .update({ "billboard-hot-100": chartsDoc.content })
        .then(() => {
          return res.json("billboard-hot-100 updated succesfully");
        });
    })
    .catch((err) => res.status(500).json({ error: "something went wrong" }));
};

export const getHot100 = (req: any, res: any) => {
  db.collection("admin-charts")
    .get()
    .then((data) => {
      return res.json(data.docs[0].data());
    })
    .catch((err) => res.status(500).json({ error: "something went wrong" }));
};

export const setArticle = (req: any, res: any) => {
  const newsDocument = {
    id: req.body.id,
    thumbnail: req.body.thumbnail,
    title: req.body.title,
    source: req.body.source,
    url: req.body.url,
  };
  db.collection("admin-news")
    .add(newsDocument)
    .then((doc: any) => {
      return res.json({ message: "news set succesfully" });
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    });
};

export const getNews = (req: any, res: any) => {
  db.collection("admin-news")
    // .orderBy("createdAt", "desc")
    .get()
    .then((data: any) => {
      let news: any = [];
      data.forEach((doc: any) => {
        news.push(doc.data());
      });
      return res.json(news);
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

export const deleteArticle = (req: any, res: any) => {
  db.collection("admin-news")
    .where("id", "==", req.params.articleID)
    .limit(1)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        doc.ref.delete();
      });
    })
    .then(() => res.json("article deleted"))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
