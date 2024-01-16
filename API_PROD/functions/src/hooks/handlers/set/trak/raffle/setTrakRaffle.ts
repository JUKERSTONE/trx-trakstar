import { db } from "../../../../../firestore";

export const setTrakRaffle = (req: any, res: any) => {
  const subscription = req.params.subscription;
  const userId = req.user.userId;

  const trakSubCollection = db
    .collection("metaverse")
    .doc("native")
    .collection("protocols")
    .doc("trx_00")
    .collection("trak");

  switch (subscription) {
    case "free":
      let free: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(2)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.artist,
              title: trak.title,
              cover_art: trak.cover_art,
              tier: trak.tier,
              hasBlankDisc: false,
              userId,
            };
            free.push(TRAKDocument);
            db.doc(
              "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
            ).set(TRAKDocument);
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(1)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.artist,
                  title: trak.title,
                  cover_art: trak.cover_art,
                  tier: trak.tier,
                  hasBlankDisc: false,
                  userId,
                };
                free.push(TRAKDocument);
                db.doc(
                  "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
                ).set(TRAKDocument);
              });
              return res.json(free);
            });
        });
      break;
    case "basic":
      let basic: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(2)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.artist,
              title: trak.title,
              cover_art: trak.cover_art,
              tier: trak.tier,
              hasBlankDisc: false,
              userId,
            };
            basic.push(TRAKDocument);
            db.doc(
              "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
            ).set(TRAKDocument);
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(2)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.artist,
                  title: trak.title,
                  cover_art: trak.cover_art,
                  tier: trak.tier,
                  hasBlankDisc: false,
                  userId,
                };
                basic.push(TRAKDocument);
                db.doc(
                  "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
                ).set(TRAKDocument);
              });
            })
            .then(() => {
              trakSubCollection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(1)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
                      exchangedAt: null,
                      trakID: trak.trakID,
                      isNFT: trak.isNFT,
                      isPrimaryTRAK: trak.isPrimaryTRAK,
                      isRare: trak.isRare,
                      label: trak.label,
                      artist: trak.artist,
                      title: trak.title,
                      cover_art: trak.cover_art,
                      tier: trak.tier,
                      hasBlankDisc: false,
                      userId,
                    };
                    basic.push(TRAKDocument);
                    db.doc(
                      "/platforms/TRAKLIST/users/" +
                        userId +
                        "/trak/" +
                        trak.trakID
                    ).set(TRAKDocument);
                  });
                  return res.json(basic);
                });
            });
        });

      break;
    case "pro":
      let pro: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(3)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.artist,
              title: trak.title,
              cover_art: trak.cover_art,
              tier: trak.tier,
              hasBlankDisc: false,
              userId,
            };
            pro.push(TRAKDocument);
            db.doc(
              "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
            ).set(TRAKDocument);
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(2)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.artist,
                  title: trak.title,
                  cover_art: trak.cover_art,
                  tier: trak.tier,
                  hasBlankDisc: false,
                  userId,
                };
                pro.push(TRAKDocument);
                db.doc(
                  "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
                ).set(TRAKDocument);
              });
            })
            .then(() => {
              trakSubCollection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(1)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
                      exchangedAt: null,
                      trakID: trak.trakID,
                      isNFT: trak.isNFT,
                      isPrimaryTRAK: trak.isPrimaryTRAK,
                      isRare: trak.isRare,
                      label: trak.label,
                      artist: trak.artist,
                      title: trak.title,
                      cover_art: trak.cover_art,
                      tier: trak.tier,
                      hasBlankDisc: false,
                      userId,
                    };
                    pro.push(TRAKDocument);
                    db.doc(
                      "/platforms/TRAKLIST/users/" +
                        userId +
                        "/trak/" +
                        trak.trakID
                    ).set(TRAKDocument);
                  });

                  return res.json(pro);
                });
            });
        });
      break;
    case "musichead":
      let musichead: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(4)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.artist,
              title: trak.title,
              cover_art: trak.cover_art,
              tier: trak.tier,
              hasBlankDisc: false,
              userId,
            };
            musichead.push(TRAKDocument);
            db.doc(
              "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
            ).set(TRAKDocument);
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(3)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.artist,
                  title: trak.title,
                  cover_art: trak.cover_art,
                  tier: trak.tier,
                  hasBlankDisc: false,
                  userId,
                };
                musichead.push(TRAKDocument);
                db.doc(
                  "/platforms/TRAKLIST/users/" + userId + "/trak/" + trak.trakID
                ).set(TRAKDocument);
              });
            })
            .then(() => {
              trakSubCollection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(2)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
                      exchangedAt: null,
                      trakID: trak.trakID,
                      isNFT: trak.isNFT,
                      isPrimaryTRAK: trak.isPrimaryTRAK,
                      isRare: trak.isRare,
                      label: trak.label,
                      artist: trak.artist,
                      title: trak.title,
                      cover_art: trak.cover_art,
                      tier: trak.tier,
                      hasBlankDisc: false,
                      userId,
                    };
                    musichead.push(TRAKDocument);
                    db.doc(
                      "/platforms/TRAKLIST/users/" +
                        userId +
                        "/trak/" +
                        trak.trakID
                    ).set(TRAKDocument);
                  });
                })
                .then(() => {
                  trakSubCollection
                    .where("isRare", "==", false)
                    .where("tier", "==", "tier_1")
                    .limit(1)
                    .get()
                    .then((data: any) => {
                      data.forEach((doc: any) => {
                        const trak = doc.data();
                        const TRAKDocument = {
                          createdAt: new Date(),
                          exchangedAt: null,
                          trakID: trak.trakID,
                          isNFT: trak.isNFT,
                          isPrimaryTRAK: trak.isPrimaryTRAK,
                          isRare: trak.isRare,
                          label: trak.label,
                          artist: trak.artist,
                          title: trak.title,
                          cover_art: trak.cover_art,
                          tier: trak.tier,
                          hasBlankDisc: false,
                          userId,
                        };
                        musichead.push(TRAKDocument);
                        db.doc(
                          "/platforms/TRAKLIST/users/" +
                            userId +
                            "/trak/" +
                            trak.trakID
                        ).set(TRAKDocument);
                      });

                      return res.json(musichead);
                    });
                });
            });
        });
      break;
    default:
      return res.json("Invalid Subscription Type");
  }
};
