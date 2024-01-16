import {api, useAPI} from '../../api';
import {useTRAKLISTState} from '../useTRAKLISTState';
import {store} from '../../stores';
import {useFirebase} from '../firebase';

export const handleRefreshWallet = async (token: string) => {
  const {handleStoreValue} = useFirebase();
  const {handleGetState} = useTRAKLISTState();
  const {useGET, usePOST} = useAPI();
  const route = api.bernie({
    method: 'get_user_wallet',
  });
  const userWalletResponse = await useGET({
    route,
    token,
  });
  const userWallet = userWalletResponse.data;
  console.log(
    '🚀 ~ file: getWallet.ts ~ line 14 ~ handleGetWal ~ userWalletResponse',
    userWallet,
  );

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const stacks_public_key = TRXProfile.stacks_public_key;

  const route_2 = `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${stacks_public_key}/balances`;

  const stxResponse = await useGET({
    route: route_2,
  });

  const stx = stxResponse.data.stx.balance;

  handleStoreValue({value: userWallet.nft, tokency: 'nft'});
  handleStoreValue({value: userWallet.trak, tokency: 'trak'});
  handleStoreValue({value: +stx, tokency: 'stx'});
};
