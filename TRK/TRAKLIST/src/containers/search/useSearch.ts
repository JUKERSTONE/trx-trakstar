import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  handleMediaPlayerAction,
  setYoutubeId,
  store,
  toggleExchangeView,
} from '../../stores';
import {useTRAKLISTState} from '../../app';
import {IStore} from '../../stores';
import axios from 'axios';
import {searchYouTube} from '../../core/searchYoutube';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useSearch = ({navigation}: any) => {
  const {useGET} = useAPI();
  const [nft, setNFT] = useState(null);
  const [trak, setTRAK] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>('');

  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);

  const handleExchange = ({item}: any) => {
    console.log('🚀 ~ file: useSearch.ts:31 ~ handleExchange ~ item:', item);
    const action1 = handleMediaPlayerAction({
      playbackState: 'pause:force',
    });
    store.dispatch(action1);
    const action = setYoutubeId({
      youtubeId: item.id,
      player: {
        // geniusId: trak.trak.genius.id,
        title: item.title,
        artist: 'item.artist',
        cover_art: item.thumbnails,
      },
    });
    store.dispatch(action);
  };

  const handleTextInputChange = (text: any) => {
    setQuery(text);

    IStore.index.push(text.length);
    setCount(count + 1);
    setTimeout(() => {
      setCaughtCount(caughtCount + 1);
      handleRequest(text);
    }, 300);
  };

  const handleReload = () => {
    // handleGetBank();
  };

  const handleRequest = (query: any) => {
    const index = query.length;
    if (caughtCount === count && caughtCount != 0 && count != 0) {
      // TIME TO MAKE A REQUEST
      // ENGINE DOES NOT MAKE REQUEST IF THE USER IS ALREADY IN CACHE
      // if (!IndexStore.cache.has(query)) {
      //   setTerm(query);
      // }
      setCalled(true);
    } else {
      setCalled(false);
      // USER IS TYPING TOO FAST. NO NEED TO MAKE A REQUEST
      setTimeout(() => {
        if (!called) {
          if (index === IStore.index[IStore.index.length - 1]) {
            // TIME TO MAKE A REQUEST
            // setRequestSignal(requestSignal + 1);

            handleSearch();
            // ENGINE DOES NOT MAKE REQUEST IF THE USER IS ALREADY IN CACHE
            // if (!IndexStore.cache.has(query)) {
            //   setTerm(query);
            // }
          }
        }
      }, 1000);
    }
  };

  const handleSearch = async () => {
    if (query === '') {
      setSearchResults(null);
    } else {
      const results = await searchYouTube(query);
      console.log(
        '🚀 ~ file: useSearch.ts:85 ~ handleSearch ~ results:',
        results,
      );
      setSearchResults(results);
    }
  };

  return {
    trak,
    nft,
    handleExchange,
    handleTextInputChange,
    handleReload,
    searchResults,
  };
};
