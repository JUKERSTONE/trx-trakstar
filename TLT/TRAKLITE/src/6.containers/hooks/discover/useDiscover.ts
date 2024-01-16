import React, {useEffect, useState, useContext} from 'react';
import {IStore, useProvider} from '../../../3.stores';
import axios from 'axios';
import {SPOTIFY_SEARCH, MUSIXMATCH_GET_LYRICS} from '../../../1.api';
import {SOUNDCLOUD_SEARCH_TRACKS} from '../../../1.api/soundcloud';
import {SOUNDCLOUD_OAUTH_KEY} from '../../../2.auth/';

export const useDiscover = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState<any>('');
  const [caughtCount, setCaughtCount] = useState<any>(0);
  const [called, setCalled] = useState<any>(false);
  const [count, setCount] = useState<any>(0);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [option, setOption] = useState<any>('track');
  const [searchType, setSearchType] = useState<any>('spotify');
  const [results, setResults] = useState<any>([]);

  const {state} = useContext(useProvider);

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
    } else setIsSearching(false);
  }, [query]);

  const handleSearchQuery = (text: string, type: string = 'Song') => {
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

  const content = () => {
    const search_results = results.map((track: any, key: any) => {
      console.log(
        '🚀 ~ file: useDiscover.ts ~ line 121 ~ constsearch_results=results.map ~ track',
        track,
      );
      return {
        id: track.id,
        artistId: track.artists[0].id,
        artwork:
          searchType === 'soundcloud' ? track.image : track.album.images[0].url,
        title: searchType === 'soundcloud' ? track.user_or_artist : track.name,
        artist:
          searchType === 'soundcloud' ? track.title : track.artists[0].name,
        preview: track.preview_url ? track.preview_url : null,
        service: searchType,
        track,
      };
    });

    return {
      isDefault: query.length > 0 ? false : true,
      recents: state.user_data?.services?.spotify?.recently_played,
      search_results,
      user: {
        username: state.user_data.username,
        profile_picture: state.user_data.image,
      },
    };
  };

  const handleSearch = () => {
    if (query === '') {
      setSearchResults(null);
    } else {
      //
      return axios
        .all([
          axios.get(SPOTIFY_SEARCH(query, 'track'), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.access_token,
            },
          }),
          axios.get(SPOTIFY_SEARCH(query, 'artist'), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.access_token,
            },
          }),
          axios.get(SPOTIFY_SEARCH(query, 'album'), {
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

  return {
    handleSearchQuery,
    handleRequest,
    handleSearch,
    isSearching,
    content,
  };
};
