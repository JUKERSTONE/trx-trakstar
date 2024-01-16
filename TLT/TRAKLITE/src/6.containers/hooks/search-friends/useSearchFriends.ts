import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {USERS} from '../../../1.api';
import {store} from '../../../3.stores';
import * as actions from '../../../3.stores';

export const useSearchFriends = () => {
  const [query, setQuery] = useState();
  const [users, setUsers] = useState();
  useEffect(() => {
    axios
      .get(USERS, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response: any) => {
        console.log(
          '🚀 ~ file: useSearchFriends.ts ~ line 14 ~ .then ~ response',
          response.data,
        );
        setUsers(response.data);
      })
      .catch((error: any) => {
        alert('error');
      });
  }, []);

  const handlePopModal = (data: any) => {
    const modal = {
      type: 'profile',
      profile: {
        active: true,
        data,
      },
    };
    store.dispatch(actions.POP_PROFILE('toggle full screen.', modal));
  };

  return {
    setQuery,
    users,
    handlePopModal,
  };
};
