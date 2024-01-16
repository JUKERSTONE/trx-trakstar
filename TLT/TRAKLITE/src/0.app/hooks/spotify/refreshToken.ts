import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const queryString = require("query-string");

export const spotifyRefresh = async (refresh_token: any) => {
  console.log(
    "🚀 ~ file: refreshToken.ts ~ line 5 ~ spotifyRefreshToken ~ refresh_token",
    refresh_token
  );
  const route = "https://accounts.spotify.com/api/token";
  return await axios
    .post(
      route,
      queryString.stringify({
        grant_type: "refresh_token",
        refresh_token,
        client_id: "29dec26a7f304507b4a9d9bcf0ef210b",
        client_secret: "1d27af3b5c4946c1a411657ca50490d0",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      console.log(
        "🚀 ~ file: listenUserProfile.ts ~ line 66 ~ .onSnapshot ~ response",
        response
      );

      const tokens = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };
      AsyncStorage.setItem("spotify_tokens", JSON.stringify(tokens));
      // alert("success");
      return tokens;
      // handleSpotifyRefreshToken()
    })
    .catch((error) => {
      console.log(
        "🚀 ~ file: listenUserProfile.ts ~ line 73 ~ .onSnapshot ~ error",
        error,
        error.message,
        error.response,
        alert(1)
      );
    });
  console.log(
    "🚀 ~ file: TRAKLIST.tsx ~ line 108 ~ handleSpot ~ response",
    response
  );
};
