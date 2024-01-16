export const handleStacksAPI = ({method, payload}: any) => {
  const transactionId = payload?.transactionId;
  console.log(
    '🚀 ~ file: stacks.ts ~ line 3 ~ handleStacksAPI ~ transactionId',
    transactionId,
  );

  switch (method) {
    case 'transaction':
      return `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${transactionId}`;
    default:
      alert('n/a');
      return '';
  }
};
