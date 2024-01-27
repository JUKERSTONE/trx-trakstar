import axios from 'axios';

export const handleReproduceBitcoin = async () => {
  const route = `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${keys.public}/balances`;

  const account = await axios
    .get(route, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      return res.data;
    });
  console.log(
    '🚀 ~ file: useFORCHAINApp.ts ~ line 76 ~ handleStacksWal ~ account',
    account,
  );
};
