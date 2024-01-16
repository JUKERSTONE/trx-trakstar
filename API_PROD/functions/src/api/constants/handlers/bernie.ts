export const handleBernieAPI = ({method, payload}: any) => {
  // const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';
  const base =
    'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST_API';

  const subscription = payload?.subscription;
  const nftID = payload?.nftID;
  const trakID = payload?.trakID;

  switch (method) {
    case 'raffle':
      return `${base}/traklist/user/trak/trx_00/raffle/${subscription}`;
    case 'bank':
      return `${base}/trx_00/trak`;
    case 'purchase_nft':
      return `${base}/trx_00/nft/${nftID}/purchase`;
    case 'get_user_wallet':
      return `${base}/traklist/user/wallet`;
    case 'exchange_trak':
      return `${base}/trx_00/trak/exchange`;
    case 'get_trak':
      return `${base}/trx_00/trak/${trakID}`;
    case 'get_trending':
      return `${base}/traklite/admin/trending`;
    case 'get_news':
      return `${base}/traklite/admin/news`;
    case 'genre-collections':
      return `${base}/trx_00/genre`;
    case 'get_genre':
      return `${base}/spotify/genre/${trakID}`;
    default:
      alert('Invalid Method');
      return '';
  }
};
