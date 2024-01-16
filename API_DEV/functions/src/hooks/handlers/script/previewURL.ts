import { db } from "../../../firestore";

export const appendPreviewURL = ({ req, res }: any) => {
  db.collection("currency")
    .where("web.spotify", "!=", null)
    .get()
    .then((data: any) => {
      //   let spotifyURI;
      data.forEach((doc: any) => {
        // do later - needs to be in frontend
      });
      return res.json("successfully updated");
    });
};
