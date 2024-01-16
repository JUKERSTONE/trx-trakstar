import React, {useEffect, useState, useContext} from 'react';
import {colors} from '../core';
import axios from 'axios';
import {IStore, store, storeSearch} from '../stores';
import {useAPI, api} from '../api';
import {useLITELISTState} from './useLITELISTState';

const {spotify} = api;
const {handleGetState} = useLITELISTState();

export const useLITELISTApp = () => {
  const {useGET} = useAPI();

  const [caughtCount, setCaughtCount] = useState<any>(0);
  const [called, setCalled] = useState<any>(false);
  const [count, setCount] = useState<any>(0);
  const [searchResults, setSearchResults] = useState<any>(null);

  const handleTheme = () => {
    const isDarkMode = false;
    const theme = {
      dark: isDarkMode,
      colors: {
        primary: colors.dark.primary,
        background: isDarkMode ? colors.dark.primary : colors.light.primary,
        card: colors.dark.primary,
        text: '#fff',
        border: 'whitesmoke',
        notification: 'purple',
      },
    };
    return theme;
  };

  const handleSearch = async (query: any) => {
    return new Promise(function (resolve, reject) {
      const state = handleGetState({index: 'keys'});
      const {
        spotify: {accessToken},
      } = state;

      IStore.index.push(query.length);
      setCount(count + 1);

      // setTimeout(function () {
      //   resolve('anything');
      // }, 5000);

      setTimeout(() => {
        setCaughtCount(caughtCount + 1);

        const index = query.length;
        if (caughtCount === count && caughtCount != 0 && count != 0) {
          // TIME TO MAKE A REQUEST
          setCalled(true);
        } else {
          setCalled(false);
          // USER IS TYPING TOO FAST. NO NEED TO MAKE A REQUEST
          const calledTimeout = setTimeout(() => {
            if (!called) {
              if (index === IStore.index[IStore.index.length - 1]) {
                // TIME TO MAKE A REQUEST
                // alert(caughtCount);
                const route = spotify({
                  method: 'search',
                  payload: {
                    type: 'track',
                    query,
                  },
                });
                const response = useGET({route, token: accessToken});

                // alert('test');
                // setSearchResults(response);
                resolve(response);

                // Promise.resolve(response).then(payload => {
                //   const serializedPayload = JSON.stringify(payload);
                //   const action = storeSearch(serializedPayload);
                //   store.dispatch(action);
                // });
              }
            } else {
              // clear timeout
              clearTimeout(calledTimeout);
            }
          }, 1000);
        }
      }, 300);
    });
  };

  return {
    handleTheme,
    handleSearch,
  };
};
