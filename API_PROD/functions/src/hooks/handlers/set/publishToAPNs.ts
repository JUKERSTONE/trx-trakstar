const jwt = require("jsonwebtoken");
// const https = require("https");
const teamID = "3J39XKJXT5";
const keyID = "5W3XHZU9Y3";
// const p8FilePath = require(`../core/AuthKey_${keyID}.p8`);
const bundleID = "com.bernie.trk";

export const publishToAPNs = async (req: any, res: any) => {
  const contentState = req.body.contentState;
  const token = req.body.token;

  // const tokensQuerySnapshot = await db.collection(`polls/${pollId}/push_tokens`).get();

  // tokensQuerySnapshot.forEach((doc) => {
  //     tokens.push(doc.data().token);
  // });
  // console.log(`tokens: ${tokens.length}`)
  if (!token) return;
  // const date = new Date();
  // const unixTimestamp = Math.floor(date.getTime() / 1000);

  const json = {
    timestamp: Math.floor(Date.now() / 1000),
    event: "update",
    "content-state": contentState,
  };

  console.log("🚀 ~ file: publishToAPNs.ts:28 ~ publishToAPNs ~ json:", json);
  return await publishToApns(token, json).then(() => {
    return res.status(200).send("ok");
  });
};

async function publishToApns(token: any, json: any) {
  console.log(`Tokens to push: ${token}, payload: ${JSON.stringify(json)}`);

  const privateKey =
    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgQjR4+b3TCLXq3qda\neBLRp20a8BtOxTLyAzzTKHIrWsGgCgYIKoZIzj0DAQehRANCAAQIC27IUXutiiGO\nGDF28LEQpdwkdp2OqFqfPxTwV4WZjxay2HH9QabC+fmbRL8mpBZ7yisZcZiVCi+m\nASETWTSG\n-----END PRIVATE KEY-----";

  const secondsSinceEpoch = Math.round(Date.now() / 1000);
  const payload = {
    iss: teamID,
    iat: secondsSinceEpoch,
  };

  const finalEncryptToken = jwt.sign(payload, privateKey, {
    algorithm: "ES256",
    keyid: keyID,
  });

  const http2 = require("node:http2");
  // const session = http2.connect("https://api.sandbox.push.apple.com:443");
  const session = http2.connect("https://api.push.apple.com:443");
  session.on("error", (err: any) => {
    console.log("Session Error", err);
  });

  try {
    const req = session.request({
      ":method": "POST",
      ":path": "/3/device/" + token,
      authorization: "bearer " + finalEncryptToken,
      "apns-push-type": "liveactivity",
      "apns-topic": `${bundleID}.push-type.liveactivity`,
      "Content-Type": "application/json",
    });

    req.on("response", (headers: any) => {
      console.log(
        "🚀 ~ file: publishToAPNs.ts:95 ~ req.on ~ headers:",
        headers
      );
      console.log(headers[http2.constants.HTTP2_HEADER_STATUS]);
    });

    let data = "";
    req.setEncoding("utf8");
    req.on("data", (chunk: any) => (data += chunk));

    req.on("end", () => {
      console.log(`The server says: ${data}`);
      session.close();
    });
    req.end(JSON.stringify(json));
  } catch (err) {
    console.error("Error sending token:", err);
  }
}
