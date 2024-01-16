const https = require("https");
const crypto1 = require("crypto");
// const { URL } = require('url');
const QueryString = require("querystring");

// init spotify config
const spClientId = "29dec26a7f304507b4a9d9bcf0ef210b";
const spClientSecret = "1d27af3b5c4946c1a411657ca50490d0";
const authString = Buffer.from(spClientId + ":" + spClientSecret).toString(
  "base64"
);
const authHeader = `Basic ${authString}`;

// encryption
const encSecret = "THEMETAVERSEISMINE.";
// const encMethod = process.env.ENCRYPTION_METHOD || "aes-256-ctr";
const encMethod = "aes-256-ctr";
export const encrypt = (text: string) => {
  const aes = crypto1.createCipher(encMethod, encSecret);
  let encrypted = aes.update(text, "utf8", "hex");
  encrypted += aes.final("hex");
  return encrypted;
};
export const decrypt = (text: string) => {
  const aes = crypto1.createDecipher(encMethod, encSecret);
  let decrypted = aes.update(text, "hex", "utf8");
  decrypted += aes.final("utf8");
  return decrypted;
};

// handle sending POST request
export const postRequest = (url: any, data = {}) => {
  return new Promise((resolve, reject) => {
    // build request data
    url = new URL(url);
    const reqData = {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    // create request
    const req = https.request(reqData, (res: any) => {
      // build response
      let buffers: any = [];
      res.on("data", (chunk: any) => {
        buffers.push(chunk);
      });

      res.on("end", () => {
        // parse response
        let result = null;
        try {
          result = Buffer.concat(buffers);
          result = result.toString();
          var contentType = res.headers["content-type"];
          if (typeof contentType == "string") {
            contentType = contentType.split(";")[0].trim();
          }
          if (contentType == "application/x-www-form-urlencoded") {
            result = QueryString.parse(result);
          } else if (contentType == "application/json") {
            result = JSON.parse(result);
          }
          // @ts-ignore
        } catch (error: any) {
          error.response = res;
          error.data = result;
          reject(error);
          return;
        }
        resolve({ response: res, result: result });
      });
    });

    // handle error
    req.on("error", (error: any) => {
      reject(error);
    });

    // send
    data = QueryString.stringify(data);
    req.write(data);
    req.end();
  });
};
