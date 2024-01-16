import {useState, useContext, useEffect} from 'react';

import {useProvider} from '../../../3.stores';
import {IStore} from '../../../3.stores';
import {SPOTIFY_SEARCH} from '../../../1.api';
import axios from 'axios';
import {SOUNDCLOUD_SEARCH_TRACKS} from '../../../1.api/soundcloud';
import {SOUNDCLOUD_OAUTH_KEY} from '../../../2.auth/';

export const useContentSearch = ({
  initialQuery,
  modeProp,
  type,
  isNavigation,
}: any) => {
  const [query, setQuery] = useState(initialQuery ?? '');
  const [option, setOption] = useState('track');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any>([]);
  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const {state} = useContext(useProvider);
  const [searchType, setSearchType] = useState('spotify');
  const [visible, setVisible] = useState(false);

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

            switch (option) {
              case 'track':
                if (searchType === 'spotify') {
                  axios
                    .get(SPOTIFY_SEARCH(query, option), {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                          'Bearer ' + state.keys.spotify.s_client_token,
                      },
                    })
                    .then(response => {
                      setResults(response.data.tracks.items);
                    });
                } else if (searchType === 'soundcloud') {
                  setResults([]);
                  axios
                    .get(SOUNDCLOUD_SEARCH_TRACKS(query), {
                      headers: {
                        Authorization: 'Bearer ' + SOUNDCLOUD_OAUTH_KEY,
                      },
                    })
                    .then(res => {
                      res.data.collection.map((track: any) => {
                        let trackQuery = {
                          id: track.id,
                          urn: track.urn,
                          title: track.title,
                          user_or_artist: track.user.username,
                          verified: track.user.verified,
                          image: track.artwork_url,
                          // releaseDate: track.album.release_date,
                        };

                        // get into right shape
                        setResults((oldArray: any) => [
                          ...oldArray,
                          trackQuery,
                        ]);
                        // setQueryList(oldArray => [...oldArray, trackQuery]);
                      });
                      console.log(results, 'vrihb');
                    })
                    .catch(err => alert('no work'));
                }
                // console.log(JSON.stringify(results));
                break;
            }
            // ENGINE DOES NOT MAKE REQUEST IF THE USER IS ALREADY IN CACHE
            // if (!IndexStore.cache.has(query)) {
            //   setTerm(query);
            // }
          }
        }
      }, 1000);
    }
  };

  const handleInputChange = (text: string, type: string) => {
    setQuery(text);
    switch (type) {
      case 'Song':
        setOption('track');
        break;
    }
    IStore.index.push(query.length);
    setCount(count + 1);
    setTimeout(() => {
      setCaughtCount(caughtCount + 1);
      handleRequest(query);
    }, 300);
  };

  const content = () => {
    const search_results = results.map((track: any, key: any) => {
      return {
        id: track.id,
        artwork:
          searchType === 'soundcloud' ? track.image : track.album.images[0].url,
        title: searchType === 'soundcloud' ? track.user_or_artist : track.name,
        artist:
          searchType === 'soundcloud' ? track.title : track.artists[0].name,
        preview: track.preview_url ? track.preview_url : null,
        service: searchType,
      };
    });

    return {
      isDefault: query.length > 0 ? false : true,
      recents: state.user_data.services.spotify.recently_played,
      search_results,
      user: {
        username: state.user_data.username,
        profile_picture: state.user_data.image,
      },
    };
  };

  const handleSearchSettings = (type: string) => {
    // setSearchType(type);
  };

  const setVisibleWithProps = (
    visible: boolean,
    type: 'spotify' | 'soundcloud',
  ) => {
    alert('search mode : ' + type);
    setVisible(visible);
    setSearchType(type);
  };

  return {
    handleSearchSettings,
    handleInputChange,
    content,
    visible,
    setVisible,
    setVisibleWithProps,
    searchType,
    query,
    option,
    mode: modeProp,
    type,
    isNavigation,
  };
};

export default useContentSearch;
