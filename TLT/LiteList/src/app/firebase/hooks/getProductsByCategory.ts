import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
  setFirebaseProfile,
  storeKeysTRX,
  setLikes,
  handlePublicKeys,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const handleGetProductsByCategory = async ({category}: any) => {
  console.log(
    '🚀 ~ file: getProductsByCategory.ts:22 ~ handleGetProductsByCategory ~ category:',
    category,
  );
  const productsByCategory = await firestore()
    .collection(`storefront-products`)
    .where('category', '==', category)
    .orderBy('subCategory')
    .get()
    .then((data: any) => {
      console.log(
        '🚀 ~ file: getProductsByCategory.ts:27 ~ .then ~ data:',
        data,
      );
      let products: any = [];

      data.forEach((doc: any) => {
        console.log(
          '🚀 ~ file: getProductsByCategory.ts:31 ~ data.forEach ~ doc.data():',
          doc.data(),
        );
        products.push(doc.data());
      });
      console.log(
        '🚀 ~ file: getProductsByCategory.ts:27 ~ handleGetProductsByCategory ~ productsByCategory:',
        productsByCategory,
      );

      return products;
    })
    .catch((err: any) => {
      console.log('🚀 ~ file: getProductsByCategory.ts:52 ~ .then ~ err:', err);
    });

  console.log(
    '🚀 ~ file: getProductsByCategory.ts:27 ~ handleGetProductsByCategory ~ productsByCategory:',
    productsByCategory,
  );

  let subCategory: any = null;
  let productRow: any = [];
  let handledIndices: any = [];
  let storedProduct: any = null;

  const unfilteredProducts = productsByCategory.map(
    (product: any, index: any) => {
      if (handledIndices.includes(index)) return;

      if (product.subCategory === subCategory) {
        if (storedProduct) {
          if (productsByCategory[index + 1]) {
            productRow = [
              storedProduct,
              productsByCategory[index],
              productsByCategory[index + 1],
            ];
            handledIndices.push(index + 1);
          } else if (productsByCategory[index]) {
            productRow = [storedProduct, productsByCategory[index]];
          } else {
            productRow = [storedProduct];
          }
          storedProduct = null;
        } else {
          if (productsByCategory[index + 2]) {
            productRow = [
              productsByCategory[index],
              productsByCategory[index + 1],
              productsByCategory[index + 2],
            ];
            handledIndices.push(index);
            handledIndices.push(index + 1);
            handledIndices.push(index + 2);
          } else if (productsByCategory[index + 1]) {
            productRow = [
              productsByCategory[index],
              productsByCategory[index + 1],
            ];
            handledIndices.push(index);
            handledIndices.push(index + 1);
          } else {
            productRow = [productsByCategory[index]];
            handledIndices.push(index);
          }
        }

        return {
          type: 'row',
          subCategory: product.subCategory,
          products: productsByCategory[index + 2]
            ? productRow
            : productsByCategory[index + 1]
            ? productRow
            : productRow,
        };
      } else {
        subCategory = product.subCategory;
        storedProduct = productsByCategory[index];
        return {
          type: 'headline',
          subCategory: product.subCategory,
        };
      }
    },
  );

  const products = unfilteredProducts.filter((item: any) => item !== undefined);

  console.log(
    '🚀 ~ file: getProductsByCategory.ts:95 ~ products ~ products:',
    products,
  );

  return products;
};
