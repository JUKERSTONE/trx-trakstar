export const handleExtraData = ({
  spotifyId,
  accessToken,
}: {
  spotifyId: string;
  accessToken: string;
}) => {
  //
  //
  return {
    isrc: "",
    genres: [],
    audioFeatures: {
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      loudness: 0,
      mode: 0,
      speechiness: 0,
      tempo: 0,
      time_signature: 0,
      valence: 0,
    },
  };
};
