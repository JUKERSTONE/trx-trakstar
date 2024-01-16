export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  switch (method) {
    case 'bank':
      return `${base}/trx_00/trak`;
    case 'request_nft':
      return `${base}/trx_00/nft/request`;
    case 'get_artist_portfolio':
      return `${base}/traklist/artist/portfolio`;
    default:
      alert('Invalid Method');
  }
};
