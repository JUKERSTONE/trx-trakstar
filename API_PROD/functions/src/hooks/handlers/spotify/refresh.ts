import { decrypt, encrypt, postRequest } from "./utils";

export const handleRefreshToken = async (req: any, res: any) => {
  const spotifyEndpoint = "https://accounts.spotify.com/api/token";

  try {
    // ensure refresh token parameter
    if (!req.body.refresh_token) {
      res.status(400).json({ error: "Refresh token is missing from body" });
      return;
    }

    // decrypt token
    const refreshToken = decrypt(req.body.refresh_token);
    // build request data
    const reqData = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    // get new token from Spotify API
    const { response, result }: any = await postRequest(
      spotifyEndpoint,
      reqData
    );

    // encrypt refresh_token
    if (result.refresh_token) {
      result.refresh_token = encrypt(result.refresh_token);
    }

    // send response
    res.status(response.statusCode).json(result);
    // @ts-ignore
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.statusCode);
    } else {
      res.status(500);
    }
    if (error.data) {
      res.send(error.data);
    } else {
      res.send("");
    }
  }
};
