const https = require("https");

const getSpotifyData = (options: any) =>
  new Promise((resolve, reject) => {
    const req = https.request(options, (res: any) => {
      let data = "";

      res.on("data", (chunk: any) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error: any) => {
      reject(error);
    });

    req.end();
  });

export const getSpotifyGenre = async (req: any, res: any) => {
  const id = req.params.id;
  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    // First request to get the track's information
    const trackOptions = {
      hostname: "api.spotify.com",
      path: `/v1/tracks/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    };

    const trackData: any = await getSpotifyData(trackOptions);
    const artistId = trackData.artists[0].id; // Assuming there is at least one artist
    console.log(
      "🚀 ~ file: genre.ts:56 ~ getSpotifyGenre ~ artistId:",
      artistId
    );

    // Second request to get the artist's details
    const artistOptions = {
      hostname: "api.spotify.com",
      path: `/v1/artists/${artistId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    };

    const artistData: any = await getSpotifyData(artistOptions);

    // Combine track and artist data or return just the artist data
    res
      .status(200)
      .json({ genre: artistData.genres, isrc: trackData.external_ids.isrc });
  } catch (error) {
    console.error("Error in Spotify requests", error);
    res.status(500).json({ error: "Error in Spotify requests" });
  }
};

export const handleTRX00SpotifyDependencies = async ({
  spotifyId,
  accessToken,
}: {
  spotifyId: string;
  accessToken: string;
}) => {
  console.log("🚀 ~ file: genre.ts:91 ~ spotifyId:", spotifyId);
  try {
    // First request to get the track's information
    const trackOptions = {
      hostname: "api.spotify.com",
      path: `/v1/tracks/${spotifyId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    // Fetch track data to get artistId
    const trackData: any = await getSpotifyData(trackOptions);
    console.log("🚀 ~ file: genre.ts:105 ~ trackData:", trackData);
    const artistId = trackData.artists[0].id; // Assuming there is at least one artist

    // Define the request options for the artist's genre
    const genreOptions = {
      hostname: "api.spotify.com",
      path: `/v1/artists/${artistId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Define the request options for audio features
    const audioFeaturesOptions = {
      hostname: "api.spotify.com",
      path: `/v1/audio-features/${spotifyId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Fetch data concurrently
    const [artistData, audioFeaturesData]: any = await Promise.all([
      getSpotifyData(genreOptions),
      getSpotifyData(audioFeaturesOptions),
    ]);

    // Construct the combined data object
    const combinedData = {
      audioFeatures: {
        acousticness: audioFeaturesData.acousticness,
        danceability: audioFeaturesData.danceability,
        energy: audioFeaturesData.energy,
        instrumentalness: audioFeaturesData.instrumentalness,
        liveness: audioFeaturesData.liveness,
        loudness: audioFeaturesData.loudness,
        speechiness: audioFeaturesData.speechiness,
        tempo: audioFeaturesData.tempo,
        valence: audioFeaturesData.valence,
        mode: audioFeaturesData.mode,
        time_signature: audioFeaturesData.time_signature,
      },
      genres: artistData.genres, // Now getting the genre from the artist data
      isrc: trackData.external_ids.isrc,
    };

    return combinedData;
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};
