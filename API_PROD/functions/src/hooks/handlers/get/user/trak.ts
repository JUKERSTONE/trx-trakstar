import { db } from "../../../../firestore";

export const getUserTRAK = (req: any, res: any) => {
  const username = req.params.username;

  return db
    .collection("trak")
    .where("username", "==", username)
    .where("exchangedAt", "==", null)
    .get()
    .then((data: any) => {
      let trak: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        trak.push(data);
      });
      // console.log("🚀 ~ file: trak.ts ~ line 12 ~ .then ~ data", data);
      res.json(trak);
    });
};
