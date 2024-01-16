import { db } from "../../../../firestore";

export const getRankedTRX = async ({ userPreferences }: any) => {
  const genresPromises = userPreferences.map(async (userPreference: any) => {
    console.log(
      "🚀 ~ file: getRankedTRX.ts:8 ~ genresPromises ~ userPreference:",
      userPreference
    );

    return userPreference?.genres || []; // Return an empty array if there are no genres
  });
  console.log(
    "🚀 ~ file: getRankedTRX.ts:13 ~ genresPromises ~ genresPromises:",
    genresPromises
  );

  const genresArrays: string[][] = await Promise.all(genresPromises);
  console.log(
    "🚀 ~ file: getRankedTRX.ts:20 ~ getRankedTRX ~ genresArrays:",
    genresArrays
  );

  const accumulatedGenres: string[] = ([] as string[]).concat(...genresArrays); // Flatten the array of arrays

  const maxGenresPerQuery = 10;
  let allMatchingDocs = [];

  for (let i = 0; i < accumulatedGenres.length; i += maxGenresPerQuery) {
    const genresSubset = accumulatedGenres.slice(i, i + maxGenresPerQuery);

    const snapshot = await db
      .collection("TRX")
      .where("genres", "array-contains-any", genresSubset)
      .get();

    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    allMatchingDocs.push(...docs);
  }

  return allMatchingDocs;
};
