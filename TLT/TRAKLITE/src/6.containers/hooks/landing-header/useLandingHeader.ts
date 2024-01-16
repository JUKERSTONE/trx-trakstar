import React, {useEffect, useState, useContext} from 'react';
import {useProvider} from '../../../3.stores';
import {IStore, DSStore} from '../../../3.stores';
import {SPOTIFY_SEARCH} from '../../../1.api';
import axios from 'axios';
import {SOUNDCLOUD_SEARCH_TRACKS} from '../../../1.api/soundcloud';
import {SOUNDCLOUD_OAUTH_KEY} from '../../../2.auth/';

export const useLandingHeader = () => {
  const {state} = useContext(useProvider);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery]: any = useState('');

  const [option, setOption] = useState('track');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any>([]);
  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [searchType, setSearchType] = useState('spotify');

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
    } else setIsSearching(false);
  }, [query]);

  const headerLeft = () => {
    alert(state.loggedIn);
    return state.loggedIn ? 'menu' : 'login';
  };

  return {
    isSearching,
    headerLeft,
  };
};
