import { db } from "../../../firestore";

export const fixKeyUri = async ({ req, res }: any) => {
  const sessions = await db
    .collection("fundamentals/TRAKSTAR/streaming")
    .get()
    .then((data) => {
      let sessions: any = [];
      data.forEach((doc) => {
        const data: any = doc.data();
        if (!data.trakUri) return;

        const { trakUri, ...props } = data;
        console.log(
          "🚀 ~ file: fixKeyUri.ts:15 ~ data.forEach ~ props:",
          props
        );
        const newSession = { ...props };
        console.log(
          "🚀 ~ file: fixKeyUri.ts:13 ~ data.forEach ~ trakUri, ...props:",
          newSession
        );

        doc.ref.set(newSession);

        sessions.push(newSession);
      });
      return sessions;
    });

  return res.json({ sessions });
};
