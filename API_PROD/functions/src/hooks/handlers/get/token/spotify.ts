const https = require("https");
const querystring = require("querystring");

export const getSpotifyAccessToken = async (req: any, res: any) => {
  const response = await new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      grant_type: "client_credentials",
    });

    const authString =
      "29dec26a7f304507b4a9d9bcf0ef210b:1d27af3b5c4946c1a411657ca50490d0";
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(authString).toString("base64"),
    };

    const options = {
      method: "POST",
      hostname: "accounts.spotify.com",
      path: "/api/token",
      headers: headers,
    };

    const req = https.request(options, (res: any) => {
      let data = "";

      res.on("data", (chunk: any) => {
        data += chunk;
      });

      res.on("end", () => {
        const parsedData = JSON.parse(data);
        resolve(parsedData.access_token);
      });
    });

    req.on("error", (e: any) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });

  return res.json({ access_token: response });
};
