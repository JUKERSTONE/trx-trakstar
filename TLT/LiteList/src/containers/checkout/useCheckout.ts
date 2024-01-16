import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {store, handleMediaPlayerAction, updateBasket} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {useAPI} from '../../api';
import {useStripe} from '@stripe/stripe-react-native';
import firestore from '@react-native-firebase/firestore';

export const useProduct = ({navigation, route}: any) => {
  console.log('🚀 ~ file: useProduct.ts:7 ~ useProduct ~ route:', route);
  const product = route.params.item;
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState(null);
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const trakName = TRXProfile.trak_name;

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST_API/trakstar/stripe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price * 100,
          currency: 'gbp',
          isLive: !__DEV__,
        }),
      },
    );

    const {paymentIntent, ephemeralKey, customer} = await response.json();
    console.log(
      '🚀 ~ file: useProduct.ts:32 ~ fetchPaymentSheetParams ~ paymentIntent, ephemeralKey, customer:',
      paymentIntent,
      ephemeralKey,
      customer,
    );

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();

    setPaymentIntentClientSecret(paymentIntent);

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'TSB M3DIA LTD.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: trakName,
      },
      returnURL: 'traklist://stripe-redirect',
    });
    if (!error) {
      setLoading(true);
    }
  };

  const handlePurchaseProduct = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');

      // firestore().doc(`receipts/${paymentIntentClientSecret}`).set({
      //   paymentIntent : paymentIntentClientSecret,
      //   size
      // })
    }
  };

  const handleNavigateBakset = () => {
    navigation.navigate('LIST_DASHBOARD', {
      isNavigateToBasket: true,
    });
  };

  const handleUpdateBasket = (item: any) => {
    const action = updateBasket(item);
    store.dispatch(action);
  };

  return {
    product,
    handlePurchaseProduct,
    handleNavigateBakset,
    handleUpdateBasket,
  };
};
