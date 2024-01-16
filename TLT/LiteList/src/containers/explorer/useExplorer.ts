import React, {useEffect, useState, useContext, useRef} from 'react';
import {Alert} from 'react-native';
import {
  store,
  handleMediaPlayerAction,
  addToBasket,
  removeFromBasket,
} from '../../stores';
import {
  useLITELISTState,
  useFirebase,
  handleGetProductsByCategory,
  useEffectAsync,
} from '../../app';
import {useAPI} from '../../api';
import {useStripe} from '@stripe/stripe-react-native';
import firestore from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const useExplorer = ({navigation, route}: any) => {
  const [products, setProducts] = useState([]);
  const categories = route.params.categories.map((item: any) => item.category);

  const productListRef: any = useRef();

  const [subCategories, setSubCategories] = useState(
    route.params.categories[route.params.selectedCategoryIndex][
      'sub-categories'
    ],
  );

  const [selectedCategory, setSelectedCategory] = useState({
    category: categories[route.params.selectedCategoryIndex],
    index: route.params.selectedCategoryIndex,
  });

  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);

  useEffectAsync(async () => {
    setSubCategories(
      route.params.categories[selectedCategory.index]['sub-categories'],
    );
    const products = await handleGetProductsByCategory({
      category: selectedCategory.category,
    });
    console.log(
      '🚀 ~ file: useExplorer.ts:37 ~ useEffectAsync ~ products:',
      products,
    );
    setProducts(products);
  }, [selectedCategory]);

  useEffect(() => {
    const activeProductIndex = products.findIndex(
      (item: any) => item.subCategory == selectedSubCategory,
    );
    if (activeProductIndex != -1) {
      productListRef.current?.scrollToIndex({
        animated: true,
        index: activeProductIndex,
      });
    }
  }, [selectedSubCategory]);

  const handleAddToBasket = ({product}: any) => {
    const action = addToBasket({product, variantIndex: 0});
    store.dispatch(action);

    Toast.show({
      type: 'success',
      text1: `Added ${product.name} to basket!`,
      text2: 'Keep shopping',
    });
  };

  const handleDecreaseQuantity = ({product}: any) => {
    const action = removeFromBasket({product, variantIndex: 0});
    store.dispatch(action);

    Toast.show({
      type: 'success',
      text1: `Removed ${product.name} from basket!`,
      text2: 'Keep shopping!',
    });
  };

  const handleNavigateProduct = ({product}: any) => {
    navigation.navigate('Product', {product});
  };

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    subCategories,
    products,
    productListRef,
    handleAddToBasket,
    handleNavigateProduct,
    handleDecreaseQuantity,
  };
};
