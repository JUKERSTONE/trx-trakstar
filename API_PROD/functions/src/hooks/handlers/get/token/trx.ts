import { auth } from "../../../../firestore";

export const getToken = (req: any, res: any) => {
  const { uid } = req.body;

  // Here you would validate the username and email, then find the user's UID.
  // This is just a placeholder for the actual UID retrieval logic.

  return auth
    .createCustomToken(uid)
    .then((customToken) => {
      return res.status(200).send({ token: customToken });
    })
    .catch((error) => {
      console.log("Error creating custom token:", error);
      return res.status(500).send("Internal Server Error");
    });
};
