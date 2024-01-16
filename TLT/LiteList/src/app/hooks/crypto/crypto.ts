import {useState, useContext, useEffect} from 'react';
import {
  useAsyncStorage,
  asyncStorageIndex,
  setTransactions,
  store,
} from '../../../stores';
import axios from 'axios';
import {
  useLITELISTState,
  handleGetTransactions,
  handleGetPublicKeys,
} from '../../../app';
import {useAPI} from '../../../api';

import {useAppBrowser} from '../../../containers';

export const handleCrypto = async ({keys: tuc_public_keys, user}: any) => {
  console.log(
    '🚀 ~ file: crypto.ts ~ line 19 ~ handleCrypto ~ serialized_tuc_keys',
    tuc_public_keys,
  );
  // const {handleLoadHTTPS} = useAppBrowser();
  // alert(3);
  // // // OPEN THAT SHIT UP
  // await handleLoadHTTPS({
  //   route: 'localhost:3000/wallet/reproduce',
  //   params: JSON.stringify(tuc_public_keys),
  // });

  // const transactions = await handleGetTransactions(user);
  // console.log(
  //   '🚀 ~ file: crypto.ts ~ line 50 ~ handleCrypto ~ transactions',
  //   transactions,
  // );

  // const action = setTransactions({transactions});
  // store.dispatch(action);
};
