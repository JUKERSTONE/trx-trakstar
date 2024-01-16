import { findDifferentTracks } from "./findDifferentTracks";
import { findSimilarTracks } from "./findSimilarTracks";

interface determineNextGroupProps {
  responseType: "like" | "dislike";
  radioSliceIndex: number;
  rankedTracks: any[];
  n: number;
}

export const determineNextGroup = async ({
  responseType,
  radioSliceIndex,
  rankedTracks,
  n,
}: determineNextGroupProps) => {
  // Basic logic:
  // - If the user liked the current group, find the next group of similar tracks
  // - If the user disliked the current group, find the next group of different tracks

  let nextGroup;
  const radioSlice = rankedTracks.slice(radioSliceIndex, radioSliceIndex + n);
  const genres = getGenres(radioSlice);

  if (responseType === "like") {
    // splice focused track to beginning of rankedTracks and remove duplicates
    nextGroup = findSimilarTracks({ radioSliceIndex, rankedTracks, n, genres });
  } else if (responseType === "dislike") {
    // Filter focussed track genres from ranked tracks
    nextGroup = findDifferentTracks({
      radioSliceIndex,
      rankedTracks,
      n,
      genres,
    });
  }

  return nextGroup;
};

const getGenres = (radioSlice: any[]) => {
  return radioSlice.map((track) => track.genres).flat(1);
};
