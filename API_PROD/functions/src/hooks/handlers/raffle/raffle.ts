import { db } from "../../../firestore";

export const raffleTRAK = (req: any, res: any) => {
  const subscription = req.params.subscription;
  const userId = req.params.userId;

  const trx00Document = db.doc("/protocols/trx_00");
  const trx00Collection = trx00Document.collection("trak");
  const userTRX00Document = db.doc(`/TRAKLIST/${userId}`);
  const userTRX00Collection = userTRX00Document.collection("nft");
  switch (subscription) {
    case "free":
      let free: any = [];

      trx00Collection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(25)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              trakURI: trak.trakURI,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.meta.artist,
              title: trak.meta.title,
              thumbnail: trak.meta.thumbnail,
              tier: trak.tier,
              hasBlankDisc: false,
            };
            free.push(TRAKDocument);
            userTRX00Collection.add(TRAKDocument);
          });
        })
        .then(() => {
          trx00Collection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(5)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  trakURI: trak.trakURI,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.meta.artist,
                  title: trak.meta.title,
                  thumbnail: trak.meta.thumbnail,
                  tier: trak.tier,
                  hasBlankDisc: false,
                };
                free.push(TRAKDocument);
                userTRX00Collection.add(TRAKDocument);
              });
              return res.json(free);
            });
        });
      break;
    case "basic":
      let basic: any = [];

      trx00Collection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(40)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              trakURI: trak.trakURI,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.meta.artist,
              title: trak.meta.title,
              thumbnail: trak.meta.thumbnail,
              tier: trak.tier,
              hasBlankDisc: false,
            };
            basic.push(TRAKDocument);
            userTRX00Collection.add(TRAKDocument);
          });
        })
        .then(() => {
          trx00Collection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(15)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  trakURI: trak.trakURI,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.meta.artist,
                  title: trak.meta.title,
                  thumbnail: trak.meta.thumbnail,
                  tier: trak.tier,
                  hasBlankDisc: false,
                };
                basic.push(TRAKDocument);
                userTRX00Collection.add(TRAKDocument);
              });
            })
            .then(() => {
              trx00Collection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(5)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
                      exchangedAt: null,
                      trakID: trak.trakID,
                      trakURI: trak.trakURI,
                      isNFT: trak.isNFT,
                      isPrimaryTRAK: trak.isPrimaryTRAK,
                      isRare: trak.isRare,
                      label: trak.label,
                      artist: trak.meta.artist,
                      title: trak.meta.title,
                      thumbnail: trak.meta.thumbnail,
                      tier: trak.tier,
                      hasBlankDisc: false,
                    };
                    basic.push(TRAKDocument);
                    userTRX00Collection.add(TRAKDocument);
                  });
                  return res.json(basic);
                });
            });
        });

      break;
    case "pro":
      let pro: any = [];

      trx00Collection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              trakURI: trak.trakURI,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.meta.artist,
              title: trak.meta.title,
              thumbnail: trak.meta.thumbnail,
              tier: trak.tier,
              hasBlankDisc: false,
            };
            pro.push(TRAKDocument);
            userTRX00Collection.add(TRAKDocument);
          });
        })
        .then(() => {
          trx00Collection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(20)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  trakURI: trak.trakURI,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.meta.artist,
                  title: trak.meta.title,
                  thumbnail: trak.meta.thumbnail,
                  tier: trak.tier,
                  hasBlankDisc: false,
                };
                pro.push(TRAKDocument);
                userTRX00Collection.add(TRAKDocument);
              });
            })
            .then(() => {
              trx00Collection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
                      exchangedAt: null,
                      trakID: trak.trakID,
                      trakURI: trak.trakURI,
                      isNFT: trak.isNFT,
                      isPrimaryTRAK: trak.isPrimaryTRAK,
                      isRare: trak.isRare,
                      label: trak.label,
                      artist: trak.meta.artist,
                      title: trak.meta.title,
                      thumbnail: trak.meta.thumbnail,
                      tier: trak.tier,
                      hasBlankDisc: false,
                    };
                    pro.push(TRAKDocument);
                    userTRX00Collection.add(TRAKDocument);
                  });

                  return res.json(pro);
                });
            });
        });
      break;
    case "musichead":
      let musichead: any = [];

      trx00Collection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
              exchangedAt: null,
              trakID: trak.trakID,
              trakURI: trak.trakURI,
              isNFT: trak.isNFT,
              isPrimaryTRAK: trak.isPrimaryTRAK,
              isRare: trak.isRare,
              label: trak.label,
              artist: trak.meta.artist,
              title: trak.meta.title,
              thumbnail: trak.meta.thumbnail,
              tier: trak.tier,
              hasBlankDisc: false,
            };
            musichead.push(TRAKDocument);
            userTRX00Collection.add(TRAKDocument);
          });
        })
        .then(() => {
          trx00Collection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(25)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
                  exchangedAt: null,
                  trakID: trak.trakID,
                  trakURI: trak.trakURI,
                  isNFT: trak.isNFT,
                  isPrimaryTRAK: trak.isPrimaryTRAK,
                  isRare: trak.isRare,
                  label: trak.label,
                  artist: trak.meta.artist,
                  title: trak.meta.title,
                  thumbnail: trak.meta.thumbnail,
                  tier: trak.tier,
                  hasBlankDisc: false,
                };
                musichead.push(TRAKDocument);
                userTRX00Collection.add(TRAKDocument);
              });
            })
            .then(() => {
              trx00Collection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
                      exchangedAt: null,
                      trakID: trak.trakID,
                      trakURI: trak.trakURI,
                      isNFT: trak.isNFT,
                      isPrimaryTRAK: trak.isPrimaryTRAK,
                      isRare: trak.isRare,
                      label: trak.label,
                      artist: trak.meta.artist,
                      title: trak.meta.title,
                      thumbnail: trak.meta.thumbnail,
                      tier: trak.tier,
                      hasBlankDisc: false,
                    };
                    musichead.push(TRAKDocument);
                    userTRX00Collection.add(TRAKDocument);
                  });
                })
                .then(() => {
                  trx00Collection
                    .where("isRare", "==", false)
                    .where("tier", "==", "tier_1")
                    .limit(5)
                    .get()
                    .then((data: any) => {
                      data.forEach((doc: any) => {
                        const trak = doc.data();
                        const TRAKDocument = {
                          createdAt: new Date(),
                          exchangedAt: null,
                          trakID: trak.trakID,
                          trakURI: trak.trakURI,
                          isNFT: trak.isNFT,
                          isPrimaryTRAK: trak.isPrimaryTRAK,
                          isRare: trak.isRare,
                          label: trak.label,
                          artist: trak.meta.artist,
                          title: trak.meta.title,
                          thumbnail: trak.meta.thumbnail,
                          tier: trak.tier,
                          hasBlankDisc: false,
                        };
                        musichead.push(TRAKDocument);
                        userTRX00Collection.add(TRAKDocument);
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
