import firestore from '@react-native-firebase/firestore';

export const handleAcceptTRAK = async ({payload}: any) => {
  console.log(
    '🚀 ~ file: acceptTRAK.ts:4 ~ handleAcceptTRAK ~ payload:',
    payload,
  );
  return await firestore()
    .doc(`originals/trx:01:${payload.NFTFileName}`)
    .set({
      isOriginal: true,
      title: payload.title,
      artist: payload.artist,
      serialized_trak: JSON.stringify(payload),
      // serialized_trak: JSON.stringif
    })
    .then(res => {
      return firestore().doc(`requests/trx:01:${payload.NFTFileName}`).delete();
    })
    .then(() => {
      return {
        success: true,
      };
    })
    .catch(() => {
      alert('d');
      return {
        success: false,
      };
    });
};
