import React from 'react';
import {View} from 'react-native';
import SearchInput from '../search-container';
import SearchHistory from '../search-history';
import {SearchResults} from '../search-results';

interface SearchLandingProps {
  handleTabChange: any;
  handleSearchInputChange: any;
  tab: string;
  searchResults: any;
  isLanding: any;
}

export const Search: React.FC<SearchLandingProps> = ({
  handleTabChange,
  handleSearchInputChange,
  tab,
  searchResults,
  isLanding,
}) => {
  console.log(searchResults ? searchResults.artists : [], 'fummy boy');

  return (
    <>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SearchInput handleChange={handleSearchInputChange} />
      </View>
      <View style={{flex: 5}}>
        {isLanding ? (
          <SearchHistory />
        ) : (
          <SearchResults
            handleTabChange={handleTabChange}
            tab={tab}
            searchResults={searchResults}
          />
        )}
      </View>
    </>
  );
};
