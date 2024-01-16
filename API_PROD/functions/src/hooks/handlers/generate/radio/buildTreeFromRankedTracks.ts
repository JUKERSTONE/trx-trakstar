// import { determineNextGroup } from "./determineNextGroup";
import { Tree, TreeNode } from "../../../../core/tree";
import { db } from "../../../../firestore";
import { determineNextGroup } from "./determineNextGroup";
import { getRankedTRX } from "./getRankedTRX";
import { getUserPreferences } from "./getUserPreferences";

export const buildTreeFromRankedTracks = async (req: any, res: any) => {
  const userPreferences = await getUserPreferences({ userId: req.user.userId });
  console.log(
    "🚀 ~ file: buildTreeFromRankedTracks.ts:9 ~ buildTreeFromRankedTracks ~ userPreferences:",
    userPreferences
  );
  const rankedTracks: any = await getRankedTRX({ userPreferences });
  console.log(
    "🚀 ~ file: buildTreeFromRankedTracks.ts:14 ~ buildTreeFromRankedTracks ~ rankedTracks:",
    rankedTracks
  );

  const n = 3;

  let radioTree = new Tree();
  let radioSliceIndex = 0;

  while (radioSliceIndex < rankedTracks.length) {
    let radioSlice = rankedTracks
      .map((item: any) => item.isrc)
      .slice(radioSliceIndex, radioSliceIndex + n);
    let radioSliceNode = new TreeNode(radioSlice);

    // Assuming that determineNextGroup is a function that determines the next group of tracks
    // based on user interactions with the current group

    const isNextRadioSliceValid = radioSliceIndex + n < rankedTracks.length;

    if (isNextRadioSliceValid) {
      radioSliceNode.default = new TreeNode(
        rankedTracks
          .map((item: any) => item.isrc)
          .slice(radioSliceIndex + n, radioSliceIndex + n * 2)
      );
      radioSliceNode.like = new TreeNode(
        await Promise.resolve(
          determineNextGroup({
            responseType: "like",
            radioSliceIndex,
            rankedTracks,
            n,
          })
        )
      );
      radioSliceNode.dislike = new TreeNode(
        await Promise.resolve(
          determineNextGroup({
            responseType: "dislike",
            radioSliceIndex,
            rankedTracks,
            n,
          })
        )
      );
    }

    radioTree.addNode(radioSliceNode);
    radioSliceIndex += n;
  }

  db.doc(`users/${req.user.userId}/radio/${new Date().toISOString()}`).set({
    serializedRadio: JSON.stringify(radioTree),
  });

  const result = await Promise.all(
    radioTree.root?.value.map(async (isrc: any) => {
      return await db
        .doc(`TRX/trx:00:${isrc}`)
        .get()
        .then((doc: any) => doc.data());
    })
  );
  console.log(
    "🚀 ~ file: buildTreeFromRankedTracks.ts:80 ~ buildTreeFromRankedTracks ~ result:",
    result
  );

  return res.json({ radio: radioTree, traklist: result });
};
