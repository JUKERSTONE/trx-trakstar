import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {store, handleMediaPlayerAction} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {useAPI} from '../../api';
import {useStripe} from '@stripe/stripe-react-native';
import firestore from '@react-native-firebase/firestore';

export const useCollections = ({navigation, route}: any) => {
  return {
    // product,
    // handlePurchaseProduct,
    // handleNavigateBakset,
    // handleUpdateBasket,
  };
};
