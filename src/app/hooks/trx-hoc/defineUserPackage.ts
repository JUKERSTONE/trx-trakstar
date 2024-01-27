import {View, Text} from 'react-native';
import React from 'react';
import {useLITELISTState} from '../../useLITELISTState';
import moment from 'moment';
import {handleResetUserPackages, handleGetLatestReciept} from '../../firebase';

export const handleDefineUserPackage = async () => {
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const user_subscribed_at = profile.TRX.user_subscribed_at;
  const userPackage = profile.TRX.userPackage;
  console.log(
    '🚀 ~ file: defineUserPackage.ts:14 ~ handleDefineUserPackage ~ userPackage:',
    userPackage,
  );

  if (!userPackage) return;

  //  get latest reciept
  const latestReceipt = await handleGetLatestReciept();
  console.log(
    '🚀 ~ file: defineUserPackage.ts:22 ~ handleDefineUserPackage ~ latestReceipt:',
    latestReceipt,
  );
  //
  if (latestReceipt.length !== 0) {
    const userSubscribedAt = moment(latestReceipt.transactionDate);
    const expirationDate = userSubscribedAt.add(31, 'days'); // IF ITS BIGGER THAN 30 30DAYS

    const isExpired = userSubscribedAt.isAfter(expirationDate);

    if (isExpired) {
      handleResetUserPackages();
    }
  }
};
