import { db } from "../../../firestore";
import { handleContinueSession, handleStartSession } from "./handlers";

export const getTrakListSession = async (req: any, res: any) => {
  /**
   * ADUS measures the average amount of time a user spends on TrakStar during a single session.
   * A session is defined as the continuous engagement with the platform and is considered terminated if no track is played within 90 seconds of the previous track ending.
   *
   */
  /**
   * has last session?
   *    yes:
   *        is session active?
   *            yes:
   *               continue session
   *            no:
   *                start session
   *    no:
   *        start session
   */
  /**
   * start session === radio-1 (5 tracks)
   * continue session === radio-2 (5 tracks)
   */
  /**
   * user : {
   *  rankedLikedGenres: [],
   *  averageAudioFeatues : {}
   * }
   *
   * trx_00 : {
   *    genres : [],
   *   audioFeatures: []
   * }
   */

  const sessionsRef = db
    .collection("sessions")
    .where("userId", "==", req.user.uid);
  const query = sessionsRef.orderBy("streamingAt", "desc"); // Use 'asc' for ascending order

  let session: any[] = [];
  query
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        session.push(doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  switch (!!session.length) {
    case true:
      const { state, isActive } = handleIsSessionActive(session[0]);
      if (isActive) {
        const nextSession = handleContinueSession({ session: state });
        return res.json({
          success: true,
          data: {
            prompt: "continue session",
            hasSession: true,
            nextSession,
          },
        });
      } else {
        const startSession = handleStartSession();
        return res.json({
          success: true,
          data: {
            prompt: "start session",
            hasSession: true,
            session: startSession,
          },
        });
      }
    default:
      const startSession = handleStartSession();
      return res.json({
        success: true,
        data: {
          prompt: "start session",
          hasSession: false,
          session: startSession,
        },
      });
  }
};

const handleIsSessionActive = (session: any) => {
  // check if last session was less than 90 secs ago
  const lastSession = session.streamingAt;
  const now = new Date();
  const diff = now.getTime() - lastSession.getTime();
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / 1000 / 60);
  console.log(diffSeconds, diffMinutes);
  return {
    isActive: diffMinutes < 5,
    state: session,
  };
};
