import { genres } from "../../../../core/genres";
import { db } from "../../../../firestore";

export const getTrx00GenreCollections = async (req: any, res: any) => {
  const genreCollections = await Promise.all(
    genres.map(async (genre) => {
      return db
        .collection("TRX")
        .where("genres", "array-contains", genre)
        .get()
        .then((data: any) => {
          let genreCollection: any[] = [];
          data.forEach((doc: any) => {
            genreCollection.push(doc.data());
          });

          if (!genreCollection.length) return;

          return { genre, collection: genreCollection };
        });
    })
  );

  return res.json({
    genreCollections: genreCollections.filter(
      (genreCollection: any) => genreCollection
    ),
  });
};
