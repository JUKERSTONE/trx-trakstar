export const findDifferentTracks = ({
  rankedTracks = [],
  genres = [],
  n = 3,
}: findTracksProps) => {
  const differentTracks = rankedTracks
    .filter((track: { genres: string[] }) => {
      // Check if none of the track's genres are in the provided genres array
      return (
        track.genres &&
        track.genres.some((genre: string) => !genres.includes(genre))
      );
    })
    .map((item) => item.isrc);

  return differentTracks.splice(0, n);
};
