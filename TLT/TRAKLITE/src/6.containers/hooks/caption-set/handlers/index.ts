import axios from 'axios';
import {NEW_POST_ROUTE} from '../../../../1.api';

export const makePost = (token: string, body: any) => {
  return axios
    .post(NEW_POST_ROUTE, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    .then(response => {
      return {
        success: true,
        response,
      };
    })
    .catch(error => {
      return {
        success: false,
        response: error,
      };
    });
};
