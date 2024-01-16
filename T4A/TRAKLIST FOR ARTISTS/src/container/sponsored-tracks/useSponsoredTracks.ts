import {useEffect, useMemo, useState} from 'react';
import {SStore} from '../../stores';
import axios from 'axios';
import {api} from '../../api';
import {APIKeys} from '../../api/constants/keys';
import uuid from 'react-native-uuid';

interface Settings {
  section: string;
  header: string;
  icon: string;
  body: {
    name: string;
    icon: string;
    description: string;
    selected: boolean;
  }[];
}
[];

const genres = [
  'acoustic',
  'afrobeat',
  'alt-rock',
  'alternative',
  'ambient',
  'anime',
  'black-metal',
  'bluegrass',
  'blues',
  'bossanova',
  'brazil',
  'breakbeat',
  'british',
  'cantopop',
  'chicago-house',
  'children',
  'chill',
  'classical',
  'club',
  'comedy',
  'country',
  'dance',
  'dancehall',
  'death-metal',
  'deep-house',
  'detroit-techno',
  'disco',
  'disney',
  'drum-and-bass',
  'dub',
  'dubstep',
  'edm',
  'electro',
  'electronic',
  'emo',
  'folk',
  'forro',
  'french',
  'funk',
  'garage',
  'german',
  'gospel',
  'goth',
  'grindcore',
  'groove',
  'grunge',
  'guitar',
  'happy',
  'hard-rock',
  'hardcore',
  'hardstyle',
  'heavy-metal',
  'hip-hop',
  'holidays',
  'honky-tonk',
  'house',
  'idm',
  'indian',
  'indie',
  'indie-pop',
  'industrial',
  'iranian',
  'j-dance',
  'j-idol',
  'j-pop',
  'j-rock',
  'jazz',
  'k-pop',
  'kids',
  'latin',
  'latino',
  'malay',
  'mandopop',
  'metal',
  'metal-misc',
  'metalcore',
  'minimal-techno',
  'movies',
  'mpb',
  'new-age',
  'new-release',
  'opera',
  'pagode',
  'party',
  'philippines-opm',
  'piano',
  'pop',
  'pop-film',
  'post-dubstep',
  'power-pop',
  'progressive-house',
  'psych-rock',
  'punk',
  'punk-rock',
  'r-n-b',
  'rainy-day',
  'reggae',
  'reggaeton',
  'road-trip',
  'rock',
  'rock-n-roll',
  'rockabilly',
  'romance',
  'sad',
  'salsa',
  'samba',
  'sertanejo',
  'show-tunes',
  'singer-songwriter',
  'ska',
  'sleep',
  'songwriter',
  'soul',
  'soundtracks',
  'spanish',
  'study',
  'summer',
  'swedish',
  'synth-pop',
  'tango',
  'techno',
  'trance',
  'trip-hop',
  'turkish',
  'work-out',
  'world-music',
];

const placementTypeMapping = {
  banner: {
    search: 'bn-search',
    shop: 'bn-shop',
    home: 'bn-home',
  },
  ad: {
    collections: 'sp-radio',
    search: 'sp-search',
    radio: 'sp-radio',
    swipe: 'sp-radio',
    shop: 'sp-shop',
  },
};

export const useSponsoredTracks = (props: any) => {
  console.log(
    '🚀 ~ file: useSponsoredTracks.ts:17 ~ useSponsoredTracks ~ props:',
    props,
  );

  const settings = props.route.params.settingsForm;
  const [tracksForm, setTracksForm] = useState({
    settings,
  });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);

  const [selectedTrack, setSelectedTrack] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<any>(null);

  const selectedTrackWithGenre = useMemo(() => {
    return selectedTrack.map(track => ({
      ...track,
      genre: selectedGenre[track.pendingTrackId],
    }));
  }, [selectedGenre]);

  useEffect(() => {
    SStore.index.push(query.length);
    setCount(count + 1);
    setTimeout(() => {
      setCaughtCount(caughtCount + 1);
      handleRequest(query);
    }, 300);
  }, [query]);

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
          if (index === SStore.index[SStore.index.length - 1]) {
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

  const handleSearch = () => {
    if (query === '') {
      // setSearchResults(null);
    } else {
      //
      axios
        .get(api.genius({method: 'search', payload: {query}}), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + APIKeys.genius.accessToken,
          },
        })
        .then(res => {
          setResults(res.data.response.hits);
        });
    }
  };

  const handleNavigateNext = () => {
    console.log(
      '🚀 ~ file: useSponsoredTracks.ts:112 ~ handleNavigateNext ~ settings:',
      settings['campaign-placement'],
    );
    if (settings['campaign-placement'] == 'Search') {
      if (selectedTrack.length === 0) return alert('Please select a track');

      return props.navigation.navigate('Sponsored_Form_3', {
        settings,
        targets: selectedTrack,
      });
    } else if (selectedTrack.length === 0)
      return alert('Please select a track');

    return props.navigation.navigate('Sponsored_Form_4', {
      settings,
      targets: selectedTrack,
    });
  };

  const handlePickTrack = (track: any) => {
    setSelectedTrack([...selectedTrack, {...track, pendingTrackId: uuid.v4()}]);
  };

  return {
    handleNavigateNext,
    query,
    setQuery,
    results,
    setResults,
    handlePickTrack,
    selectedTrack,
    genres,
    selectedGenre,
    setSelectedGenre,
    selectedTrackWithGenre,
  };
};
