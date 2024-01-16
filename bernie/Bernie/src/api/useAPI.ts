import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

export const useAPI = () => {
  const GET = ({route, token}: any) => {
    const hasAuthorization = token;
    let authorizationLiteral: string = 'Bearer ' + token;

    const Authorization = hasAuthorization ? authorizationLiteral : '';
    return axios
      .get(route, {
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
      })
      .catch(error => {
        return false;
      });
  };

  const POST = ({
    route,
    token,
    tokenType = 'Basic',
    body,
    ContentType = 'application/x-www-form-urlencoded',
  }: any) => {
    const hasAuthorization = token;
    let authorizationLiteral: string =
      (tokenType !== 'Basic' ? 'Bearer ' : 'Basic ') + token;
    // alert(hasAuthorization);
    console.log(
      '🚀 ~ file: useAPI.ts ~ line 31 ~ useAPI ~ authorizationLiteral',
      authorizationLiteral,
    );

    const Authorization = hasAuthorization ? authorizationLiteral : '';

    return axios.post(route, body, {
      headers: {
        'Content-Type': ContentType,
        Authorization,
      },
    });
  };

  return {
    GET,
    POST,
  };
};
