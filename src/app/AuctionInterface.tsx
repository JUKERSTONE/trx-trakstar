import React, {Component} from 'react';
import {View, StatusBar, Alert, Touchable} from 'react-native';
import axios from 'axios';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
} from 'react-native-spotify-remote';

import {useLITELISTState, handleNowPlaying} from '.';
import {api} from '../api';
import {
  store,
  handleMediaPlayerAction,
  handleQueueControlsAction,
  setPlayers,
} from '../stores';
import {TRXPlayer} from '../elements';
import {VHeader, Caption} from '../elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useStripe} from '@stripe/stripe-react-native';
import {ActivityIndicator} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {AuctionScreen} from '../screens';
import {AuctionContainer} from '../containers';

export const AuctionInterfaceHOC = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
      const {handleGetState} = useLITELISTState();
      const {
        TRX: {trak_name},
      } = handleGetState({index: 'profile'});
      const keys = handleGetState({index: 'keys'});

      this.state = {
        isMinimized: false,
        subtotal: 0,
        deliveryFee: 2.99,
        serviceFee: 1.99,
        currency: 'GBP',
        paymentIntent: null,
        trakName: trak_name,
      };
    }

    handleNewSummary = (basket: any) => {
      this.setState({basket});
      let newSubTotal = 0;
      basket.forEach((item: any) => {
        newSubTotal += item.variant.amount * item.quantity;
      });
      this.initializePaymentSheet({subtotal: newSubTotal});
    };

    handleCheckout = async () => {
      const {error} = await presentPaymentSheet();

      if (error) {
        // Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        await firestore()
          .doc(`receipts/${this.state.paymentIntent}`)
          .set({
            paymentIntent: this.state.paymentIntent,
            basket: this.state.basket,
          })
          .then((res: any) => {
            console.log(
              '🚀 ~ file: CheckoutInterface.tsx:72 ~ TRXInterfaceHOC ~ .then ~ res:',
              res,
            );
          })
          .catch(err => {
            console.log(
              '🚀 ~ file: CheckoutInterface.tsx:71 ~ TRXInterfaceHOC ~ handleCheckout= ~ err:',
              err,
            );
          });

        Alert.alert('Success', 'Your order is confirmed!');
      }
    };

    fetchPaymentSheetParams = async ({subtotal}: any) => {
      const response = await fetch(
        `https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST_API/trakstar/stripe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: (
              (subtotal + this.state.deliveryFee + this.state.serviceFee) *
              100
            ).toFixed(0),
            currency: this.state.currency,
            isLive: !__DEV__,
          }),
        },
      )
        .then((response: any) => {
          console.log(
            '🚀 ~ file: CheckoutInterface.tsx:86 ~ TRXInterfaceHOC ~ .then ~ response:',
            response,
          );
          this.setState({subtotal});
          return response;
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: CheckoutInterface.tsx:87 ~ TRXInterfaceHOC ~ ).then ~ err:',
            err,
          );
          alert('err');
        });
      console.log(
        '🚀 ~ file: CheckoutInterface.tsx:85 ~ TRXInterfaceHOC ~ fetchPaymentSheetParams= ~ response:',
        response,
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

    initializePaymentSheet = async ({subtotal}: any) => {
      const {paymentIntent, ephemeralKey, customer} =
        await this.fetchPaymentSheetParams({subtotal});

      this.setState({paymentIntent});

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'TSB M3DIA LTD.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: this.state.trakName,
        },
        returnURL: 'traklist://stripe-redirect',
      });
      if (!error) {
        // setLoading(true);
      }
    };

    handleStakeTRX = async () => {
      this.handleCheckout().then(() => {
        //
        //
        // apn, next stake cycle
      });
    };

    handleInitialBid = async (stake: number) => {
      this.setState({...this.state, subtotal: stake});
      this.initializePaymentSheet({subtotal: stake});
    };

    render() {
      return (
        <AuctionContainer
          handleInitialBid={this.handleInitialBid}
          handleStakeTRX={this.handleStakeTRX}
        />
      );
    }
  };
};
