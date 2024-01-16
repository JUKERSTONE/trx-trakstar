import { db } from "../../../../../firestore";

export const migrate04Session = async ({
  trak,
  isrc,
  ytid,
}: {
  trak: any;
  isrc: any;
  ytid: any;
}) => {
  db.collection("sessions")
    .where("trakUri", "==", `trx:04:${ytid}`)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        const data = doc.data();
        console.log(
          "🚀 ~ file: migrate04Session.ts:18 ~ data.forEach ~ data:",
          data
        );
        doc.ref.update({ trakUri: `trx:00:${isrc}` });
      });
    });
};
