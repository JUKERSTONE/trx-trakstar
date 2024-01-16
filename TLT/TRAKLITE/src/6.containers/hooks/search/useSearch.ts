import {useContext, useState, useEffect} from 'react';
import {MUSIXMATCH_GET_LYRICS} from '../../../1.api';

import axios from 'axios';
import algoliasearch from 'algoliasearch';

import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../../../2.auth';
import {SPOTIFY_SEARCH} from '../../../1.api';
import {useProvider} from '../../../3.stores';

import {IStore} from '../../../3.stores';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex('users');
// SEARCH
index
  .search('T')
  .then(({hits}) => {
    console.log(hits);
  })
  .catch(err => {
    console.log(err);
  });

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('tracks');
  const {state} = useContext(useProvider);

  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

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

  /**
   * song - d
   * album - d
   * artist - d
   * lyrics - d
   * posts
   * users
   */

  const handleSearch = () => {
    if (searchQuery === '') {
      setSearchResults(null);
    } else {
      //
      return axios
        .all([
          axios.get(SPOTIFY_SEARCH(searchQuery, 'track'), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.access_token,
            },
          }),
          axios.get(SPOTIFY_SEARCH(searchQuery, 'artist'), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.access_token,
            },
          }),
          axios.get(SPOTIFY_SEARCH(searchQuery, 'album'), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.access_token,
            },
          }),
        ])
        .then(
          axios.spread((data1, data2, data3, data4, data5) => {
            const tracks = data1.data.tracks.items;
            const artists = data2.data.artists.items;
            const albums = data3.data.albums.items;
            let lyrics: any = [];
            tracks.map(async (track: any, key: any) => {
              const isrc = track.external_ids.isrc;

              const lyric = await axios
                .get(MUSIXMATCH_GET_LYRICS(isrc))
                .then(res => {
                  // console.log(res.data, 'poi');
                  console.log(res.data.message.body.lyrics.lyrics_body);
                  const lyrics_body = res.data.message.body
                    ? res.data.message.body.lyrics.lyrics_body
                    : null;

                  return {
                    track_info: track,
                    lyrics_body,
                  };
                });

              // console.log(lyric);

              lyrics = [...lyrics, lyric];

              if (key === tracks.length - 1) {
                const response = {
                  tracks,
                  artists,
                  albums,
                  lyrics,
                };
                // console.log(response, 'yuh');
                setSearchResults(response);
              }
            });
          }),
        )
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleTrendingSearches = () => {
    //
  };

  const handleHistorySearches = () => {
    //
  };

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);

    IStore.index.push(searchQuery.length);
    setCount(count + 1);
    setTimeout(() => {
      setCaughtCount(caughtCount + 1);
      handleRequest(searchQuery);
    }, 300);
  };

  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  const isLanding = () => {
    console.log(searchResults, 'search results');
    return searchResults === null ? true : false;
  };

  // const handleSearchResults = () => {
  //   return searchResults.map((item: any, key: any) => ({
  //     title: item.name,
  //     artist: item.artists[0].name,
  //     artwork: item.artwork,
  //   }));
  // };

  return {
    handleSearchInputChange,
    handleTrendingSearches,
    handleHistorySearches,
    handleTabChange,
    isLanding,
    searchResults,
    tab,
  };
};
