import { db } from "../../../firestore";

interface Session {
  artist: string;
  cover_art: string;
  geniusId: string;
  id: string;
  streamingAt: string;
  title: string;
  trakUri: string;
  userId: string;
}

interface Stream {
  count: number;
  sessions: Session[];
}

export const migrateSessions = async (req: any, res: any) => {
  const sessionsCollectionRef = db.collection("sessions");

  await db
    .collection("fundamentals/TRAKSTAR/streaming")
    .get()
    .then((data) => {
      let playback: Stream[] = [];
      data.forEach((doc) => {
        playback.push(doc.data() as Stream);
      });
      return playback;
    })
    .then((playback) => {
      playback.forEach((item) => {
        item.sessions.forEach((session) => {
          return sessionsCollectionRef.doc(session.id).set(session);
        });
        db.doc(
          "fundamentals/TRAKSTAR/streaming/" + item.sessions[0].trakUri
        ).set({
          count: item.count,
          title: item.sessions[0].title,
          artist: item.sessions[0].artist,
          cover_art: item.sessions[0].cover_art,
          geniusId: item.sessions[0].geniusId,
          trakUri: item.sessions[0].trakUri,
        });
      });
    });

  return res.json("successfully updated");
};
