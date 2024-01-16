import firestore from '@react-native-firebase/firestore';

export const handleLikeMigration = async ({reference, trak}: any) => {
  console.log(
    '🚀 ~ file: likeMigration.ts:4 ~ handleLikeMigration ~ trak:',
    trak,
  );
  console.log(
    '🚀 ~ file: likeMigration.ts:4 ~ handleLikeMigration ~ reference:',
    reference,
  );
  return await firestore()
    .collection('likes')
    .where('isrc', '==', reference?.isrc)
    .get()
    .then(data => {
      console.log(
        '🚀 ~ file: likeMigration.ts:13 ~ handleLikeMigration ~ data:',
        data,
      );
      let likes: any[] = [];
      data.forEach(async doc => {
        const data = doc.data();
        console.log(
          '🚀 ~ file: likeMigration.ts:24 ~ handleLikeMigration ~ data:',
          data,
        );
        const userId = data.userId;
        console.log(
          '🚀 ~ file: likeMigration.ts:21 ~ handleLikeMigration ~ userId:',
          userId,
        );

        return await firestore()
          .collection('likes')
          .doc(`00:${reference.isrc}:${userId}`)
          .set({
            ...trak,
            userId,
            likedAt: new Date().toISOString(),
            trxUri: `trx:00:${reference.isrc}`,
            hasMigrated: true,
          })
          .then(async () => {
            await firestore()
              .collection('likes')
              .doc(`isrc:${reference.isrc}:${userId}`)
              .update({migratedAt: new Date().toISOString()});

            console.log(
              '🚀 ~ file: likeMigration.ts:85 ~ .then ~ doc.id:',
              doc.id,
            );
          })
          .then(async () => {
            console.log('🚀 ~ file: likeMigration.ts:59 ~ .then ~ trak:', trak);
            console.log(
              "🚀 ~ file: likeMigration.ts:60 ~ .then ~ trak.youtube?.url.split('=')[1]:",
              trak.youtube?.url.split('=')[1],
            );

            const ref04 = await firestore()
              .collection('trx-04')
              .doc(`trx:04:${trak.youtube?.url.split('=')[1]}`);

            const exists = (await ref04.get()).exists;

            if (!exists) return;

            ref04
              .update({
                migratedAt: new Date().toISOString(),
                migratedTo: `trx:00:${reference.isrc}`,
              })
              .catch(err => {
                console.log(
                  '🚀 ~ file: likeMigration.ts:68 ~ .then ~ err:',
                  err,
                );
                return alert('Problem with 04 migration');
              });
          })
          .catch(() => alert('Problem with 00 migration'));
      });

      return likes;
    });
};
// get all likes where isrc === reference.isrc
// for each like, get userId
// create new like at path <00:isrc:userId>
// update old like at path <"isrc":isrc:userId> with migratedAt
