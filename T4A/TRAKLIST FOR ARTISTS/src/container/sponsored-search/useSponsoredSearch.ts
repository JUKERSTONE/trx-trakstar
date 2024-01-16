import {useEffect, useState} from 'react';
import {SStore} from '../../stores';
import axios from 'axios';
import {api} from '../../api';
import {APIKeys} from '../../api/constants/keys';

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

export const useSponsoredSearch = (props: any) => {
  console.log(
    '🚀 ~ file: useSponsoredTracks.ts:17 ~ useSponsoredTracks ~ props:',
    props,
  );

  const params = props.route.params;

  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermForm, setSearchTermForm] = useState<any>();

  const [selectedTrack, setSelectedTrack] = useState<any[]>([]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useSponsoredSearch.ts:54 ~ useSponsoredSearch ~ searchTermForm:',
      searchTermForm,
    );
  }, [searchTermForm]);

  const handleNavigateNext = () => {
    props.navigation.navigate('Sponsored_Form_4', {
      ...params,
      search: searchTermForm,
    });
  };

  const handleMatchSearchTerm = (pendingTrackId: any) => {
    console.log(
      '🚀 ~ file: useSponsoredSearch.ts:65 ~ handleMatchSearchTerm ~ pendingTrackId:',
      pendingTrackId,
    );

    console.log(
      '🚀 ~ file: useSponsoredSearch.ts:72 ~ handleMatchSearchTerm ~ [pendingTrackId]: [...searchTermForm?.[pendingTrackId]]:',
      [pendingTrackId],
    );

    setSearchTerm('');

    setSearchTermForm({
      ...searchTermForm,
      [pendingTrackId]: searchTermForm?.[pendingTrackId]
        ? [...searchTermForm?.[pendingTrackId], searchTerm]
        : [searchTerm],
    }); // get to this.
  };

  return {
    handleNavigateNext,
    tracks: params?.targets,
    searchTerm,
    setSearchTerm,
    handleMatchSearchTerm,
    searchTermForm,
  };
};
