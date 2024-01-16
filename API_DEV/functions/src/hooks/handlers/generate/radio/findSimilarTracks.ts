import { db } from "../../../../firestore";

/**
 * 1. Get focused tracks
 * 2. Filter out blacklisted tracks from focused tracks
 * 3. Append to rankedTracks at n
 * 4. Return rankedTracks
 */

export const findSimilarTracks = async ({
  radioSliceIndex,
  rankedTracks = [],
  genres = [],
  n = 3,
}: findTracksProps) => {
  // Firestore query limit for 'array-contains-any'
  const MAX_QUERY_ARRAY_LENGTH = 10;
  let focusedTracks: any[] = [];

  // Split the genres array into chunks of 10
  for (let i = 0; i < genres.length; i += MAX_QUERY_ARRAY_LENGTH) {
    const genresChunk = genres.slice(i, i + MAX_QUERY_ARRAY_LENGTH);
    const snapshot = await db
      .collection("TRX")
      .where("genres", "array-contains-any", genresChunk)
      .get();

    snapshot.forEach((doc) => {
      focusedTracks.push(doc.data());
    });
  }

  const blacklistedTracks = rankedTracks.slice(0, radioSliceIndex + n);

  const filteredFocusedTracks = focusedTracks.filter(
    (focusedTrack) =>
      !blacklistedTracks.map((track) => track.isrc).includes(focusedTrack.isrc)
  );

  // Assuming each track has a unique 'id' field
  const focusedTrackIds = new Set(
    filteredFocusedTracks.map((track) => track.isrc)
  );

  // Filter out the focusedTracks from rankedTracks
  const filteredRankedIds = rankedTracks
    .map((item) => item.isrc)
    .filter((isrc) => !focusedTrackIds.has(isrc));

  return [...focusedTrackIds, ...filteredRankedIds].slice(0, n);
};
