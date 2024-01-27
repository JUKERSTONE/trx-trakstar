import React, {useEffect, useState, useContext} from 'react';
// import {useAuthentication} from '../../authentication';
import {useAPI, api} from '../../api';
import {useEffectAsync, useLITELISTState} from '../..';
import {IStore} from '../../stores';
import axios from 'axios';
import {SPOTIFY_SEARCH, MUSIXMATCH_GET_LYRICS} from '../../api';
import {SOUNDCLOUD_SEARCH_TRACKS} from '../../api/soundcloud';
import {SOUNDCLOUD_OAUTH_KEY} from '../../auth/';
import {useSelector} from 'react-redux';

const {handleGetState} = useLITELISTState();
const keys = handleGetState({index: 'keys'});
const appToken = keys.spotify.appToken;

export const useDiscover = ({...props}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState<any>('');
  const [count, setCount] = useState<any>(0);

  const [caughtCount, setCaughtCount] = useState<any>(0);
  const [called, setCalled] = useState<any>(false);
  // const [searchResults, setSearchResults] = useState<any>([]);
  // const [option, setOption] = useState<any>('track');
  // const [searchType, setSearchType] = useState<any>('spotify');
  // const [results, setResults] = useState<any>([]);

  // const [clips, setClips] = useState<any>(null);

  // const topArtists = useSelector(
  //   (state: any) => state.profile.trakland.spotify.top_tracks,
  // );
  // const item =
  //   topArtists[Math.floor(Math.random() * topArtists.length)].artists[0].name ??
  //   'Drake';
  // console.log('🚀 ~ file: useDiscover.ts:32 ~ useDiscover ~ item:', item);

  // useEffectAsync(async () => {
  //   const clips = await fetchYouTubeClips(item);
  //   setClips(clips);
  // }, []);

  // async function fetchYouTubeClips(artistName: string) {
  //   const apiKey = 'AIzaSyBkaQmFt9UpNKZV25x8U9QRGNz8WJzlnTU';
  //   const query = `${artistName} performance`; // You can modify the search query based on your preference

  //   const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
  //     query,
  //   )}&type=video&key=${apiKey}`;

  //   try {
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();

  //     if (data.items && data.items.length > 0) {
  //       console.log(
  //         '🚀 ~ file: useDiscover.ts:56 ~ fetchYouTubeClips ~ data.items:',
  //         data.items,
  //       );
  //       // Extract the YouTube video IDs from the API response
  //       const videoIds = data.items.map((item: any) => item.id.videoId);
  //       return videoIds;
  //     } else {
  //       console.log('No YouTube clips found for the specified search query.');
  //       return [];
  //     }
  //   } catch (error) {
  //     console.error('Error fetching YouTube clips:', error);
  //     return [];
  //   }
  // }

  useEffect(() => {
    if (query.length === 0) {
      // alert('no length');
      setIsSearching(false);
    } else {
      // alert('length');
      setIsSearching(true);
    }
    // alert(isSearch);
  }, [query]);

  const handleChangeText = (text: string) => {
    IStore.index.push(text.length);
    setCount(count + 1);
    setTimeout(() => {
      setCaughtCount(caughtCount + 1);
      handleRequest(text);
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

            setQuery(query);

            // ENGINE DOES NOT MAKE REQUEST IF THE USER IS ALREADY IN CACHE
            // if (!IndexStore.cache.has(query)) {
            //   setTerm(query);
            // }
          }
        }
      }, 1000);
    }
  };

  const handleClearText = () => {
    setQuery('');
    setIsSearching(false);
  };

  return {
    // handleConnect,
    handleChangeText,
    isSearching,
    // results,
    query,
    handleClearText,
    // clips,
  };
};
