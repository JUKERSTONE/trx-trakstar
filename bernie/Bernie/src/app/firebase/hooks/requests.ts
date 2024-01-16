import firestore from '@react-native-firebase/firestore';

export const handleRequests = async () => {
  return await firestore()
    .collection('requests')
    .get()
    .then((data: any) => {
      console.log('🚀 ~ file: likes.ts ~ line 31 ~ .then ~ data', data);
      let requests: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        requests.push(data);
      });

      return requests;
    });
};
