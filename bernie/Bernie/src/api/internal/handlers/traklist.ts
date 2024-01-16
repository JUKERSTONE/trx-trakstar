import {APIKeys} from '../..';

export const traklist = ({method, payload}: any) => {
  const base = !__DEV__
    ? 'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST_API'
    : 'https://europe-west1-trakstar-36cc4.cloudfunctions.net/TRAKLIST_API';

  const trakID = payload?.trakID;

  switch (method) {
    case 'news':
      return `${base}/traklite/admin/news`;
    case 'trending':
      return `${base}/traklite/admin/trending`;
    case 'duplicate_trak':
      return `${base}/trx_00/trak/verify/duplicate`;
    case 'set_trak':
      return `${base}/trx_00/trak`;
    case 'get-genre':
      return `${base}/spotify/genre/${trakID}`;
    default:
      alert('Invalid Route');
  }
};
