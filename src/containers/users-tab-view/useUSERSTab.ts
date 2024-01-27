import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {api, useAPI, APIKeys} from '../../api';
import algoliasearch from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../../auth';

export const useUSERSTab = ({navigation, query}: any) => {
  const {useGET} = useAPI();
  const {handleSearchUsers} = useFirebase();
  const [trak, setTRAK] = useState();
  const [users, setUsers] = useState<any>([]);
  const [usersHits, setUsersHits] = useState<any>([]);

  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = client.initIndex('users');

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleSearch = async (query: string) => {
    // const users = await handleSearchUsers(query);

    // setUsers(users);

    index
      .search(query)
      .then(({hits}) => {
        console.log('bs', hits);
        // alert(1);
        console.log(hits);

        // SAVE TRX METAVERSE TRAK

        // map

        const results = hits.map((hit: any) => {
          const id = hit.id;
          const trak_name = hit.trak_name;
          const trak_symbol = hit.trak_symbol;
          const avatarURL = hit.avatarURL;
          console.log(
            '🚀 ~ file: useNewChat.ts:85 ~ results ~ trak_name:',
            trak_name,
          );

          // remove same user

          console.log('🚀 ~ file: useNewChat.ts:87 ~ results ~ hit:', hit);
          return {id, trak_name, trak_symbol, avatarURL};
        });

        const filteredUsers = results.filter((hit: any) => hit.id !== userId);
        console.log(
          '🚀 ~ file: useNewChat.ts:104 ~ .then ~ filteredUsers:',
          filteredUsers,
        );

        console.log(
          '🚀 ~ file: useNewChat.ts:89 ~ results ~ results:',
          results,
        );

        setUsersHits(filteredUsers);
      })
      .catch(err => {
        // alert(2);
        console.log(err);
      });
  };

  const handleUserNavigation = (item: any) => {
    navigation.navigate('MODAL', {
      type: 'user-profile',
      exchange: {
        active: true,
        item,
      },
    });
  };

  return {
    trak,
    users,
    handleUserNavigation,
    usersHits,
  };
};
