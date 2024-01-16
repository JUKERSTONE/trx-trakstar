import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

export const useAPI = () => {
  const useGET = ({route, token}: any) => {
    return axios.get(route, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  };

  const usePOST = ({route, token, payload}: any) => {
    return axios.post(route, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  };

  return {
    useGET,
    usePOST,
  };
};
