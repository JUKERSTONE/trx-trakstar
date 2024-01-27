export const handleM3DIAAPI = ({method, payload}: any) => {
  const base = 'https://j3m2f.sse.codesandbox.io';

  switch (method) {
    case 'payment_intent':
      return `${base}/payment-intent`;
    default:
      alert('no such api for m3dia');
  }
};
