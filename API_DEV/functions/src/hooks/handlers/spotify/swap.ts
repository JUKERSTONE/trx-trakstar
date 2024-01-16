import { postRequest, encrypt } from "./utils";

export const handleSwapToken = async (req: any, res: any) => {
  const spotifyEndpoint = "https://accounts.spotify.com/api/token";
  const spClientCallback = "com.trxklist://oauthredirect/";

  try {
    // build request data
    const reqData = {
      grant_type: "authorization_code",
      redirect_uri: spClientCallback,
      code: req.body.code,
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
