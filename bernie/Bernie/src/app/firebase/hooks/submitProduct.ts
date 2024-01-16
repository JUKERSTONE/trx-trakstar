import firestore from '@react-native-firebase/firestore';

export const handleSubmitProduct = async (product: any) => {
  if (
    product.artist == '' ||
    product.description == '' ||
    product.images.length == 0 ||
    product.price == 0
  ) {
    alert('missing fields');
    return;
  }

  return await firestore().collection('shop').add(product);
};
