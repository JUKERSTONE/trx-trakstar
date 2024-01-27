import {createSlice} from '@reduxjs/toolkit';
import {useAsyncStorage, asyncStorageIndex} from '../../async';

const {handleStore} = useAsyncStorage();

export const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    basket: [],
    isBasket: false,
  },
  reducers: {
    addToBasket: (state: any, action) => {
      const {product, variantIndex} = action.payload;
      const basketIndex = state.basket.findIndex(
        (element: any) =>
          element.product.variants[variantIndex].id ===
            product.variants[variantIndex].id &&
          element.product.id === product.id,
      );
      if (basketIndex === -1) {
        state.basket.push({
          product,
          variant: product.variants[variantIndex],
          quantity: 1,
        });
      } else {
        state.basket.splice(basketIndex, 1, {
          product,
          variant: product.variants[variantIndex],
          quantity: state.basket[basketIndex].quantity + 1,
        });
      }

      handleStore({
        key: asyncStorageIndex.updateBasket,
        value: state.basket,
      });
    },
    removeFromBasket: (state: any, action) => {
      const {product, variantIndex} = action.payload;
      const basketIndex = state.basket.findIndex(
        (element: any) =>
          element.product.variants[variantIndex].id ===
            product.variants[variantIndex].id &&
          element.product.id === product.id,
      );
      if (basketIndex === -1) {
        alert("Couldn't be found in ytour basket");
      } else {
        if (state.basket[basketIndex].quantity == 1) {
          state.basket.splice(basketIndex, 1);
        } else {
          state.basket.splice(basketIndex, 1, {
            product,
            variant: product.variants[variantIndex],
            quantity: state.basket[basketIndex].quantity - 1,
          });
        }
      }

      handleStore({
        key: asyncStorageIndex.updateBasket,
        value: state.basket,
      });
    },
    handleToggleCheckout: (state: any, action) => {
      const isBasket = action.payload;
      state.isBasket = isBasket;
    },
    handleSetBasket: (state: any, action) => {
      const basket = action.payload;
      state.basket = basket;
    },
    increaseQuantity: (state: any, action) => {
      const {basketLine} = action.payload;
      console.log('🚀 ~ file: basket.ts:77 ~ basketLine:', basketLine);
      const basketIndex = state.basket.findIndex(
        (element: any) =>
          element.variant.id === basketLine.variant.id &&
          element.product.id === basketLine.product.id,
      );

      if (basketIndex === -1) {
      } else {
        state.basket.splice(basketIndex, 1, {
          ...basketLine,
          quantity: basketLine.quantity + 1,
        });
      }

      handleStore({
        key: asyncStorageIndex.updateBasket,
        value: state.basket,
      });
    },
    decreaseQuantity: (state: any, action) => {
      const {basketLine} = action.payload;
      console.log('🚀 ~ file: basket.ts:77 ~ basketLine:', basketLine);
      const basketIndex = state.basket.findIndex(
        (element: any) =>
          element.variant.id === basketLine.variant.id &&
          element.product.id === basketLine.product.id,
      );

      if (basketIndex === -1) {
      } else {
        if (basketLine.quantity == 1) {
          state.basket.splice(basketIndex, 1);
        } else {
          state.basket.splice(basketIndex, 1, {
            ...basketLine,
            quantity: basketLine.quantity - 1,
          });
        }
      }

      handleStore({
        key: asyncStorageIndex.updateBasket,
        value: state.basket,
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToBasket,
  handleToggleCheckout,
  handleSetBasket,
  increaseQuantity,
  decreaseQuantity,
  removeFromBasket,
} = basketSlice.actions;

export const basketReducer = basketSlice.reducer;
