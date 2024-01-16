import firestore from '@react-native-firebase/firestore';

export const handleGetPreviews = async () => {
  return await firestore()
    .collection('likes')
    .where('isPreview', '==', true)
    .get()
    .then((data: any) => {
      let previews: any = [];
      data.forEach((doc: any) => {
        previews.push(doc.data());
      });

      const filteredPreviews = previews.filter((item: any) => {
        console.log(
          '🚀 ~ file: getPreviews.ts:24 ~ previews.filter ~ item:',
          item,
        );
        return (
          !item.migratedAt || item.migratedAt === null || item.hasCheck === null
        );
      });
      return filteredPreviews;
    })
    .catch(err => {
      console.log(
        '🚀 ~ file: getPreviews.ts:32 ~ handleGetPreviews ~ err:',
        err,
      );
      return;
    });
};
