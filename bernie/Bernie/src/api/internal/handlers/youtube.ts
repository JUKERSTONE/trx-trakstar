import {APIKeys} from '../..';

export const youtube = ({method}: any) => {
  const base = ';';

  switch (method) {
    case 'news':
      return `${base}/traklite/admin/news`;
    case 'trending':
      return `${base}/traklite/admin/trending`;
    case 'duplicate_trak':
      return `${base}/trx_00/trak/verify/duplicate`;
    case 'set_trak':
      return `${base}/trx_00/trak`;
    default:
      return alert('Invalid Route');
  }
};
