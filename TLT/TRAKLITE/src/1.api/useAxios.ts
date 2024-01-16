import {useState} from 'react';

import axios from 'axios';

export const useAxios = (
  method: 'get' | 'post',
  url: string,
  data: {
    [key: string]: any;
  },
) => {
  const [response, setResponse] = useState(null as any);

  axios({
    method,
    url,
    data,
  })
    .then(res => setResponse(res))
    .catch(err => setResponse(err));

  return response;
};

export default useAxios;
