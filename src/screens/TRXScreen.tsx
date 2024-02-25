import React, {useState} from 'react';
import {
  FlatList,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import algoliasearch from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../auth';
import {TRAKCard} from '../elements/trak-card/TRAKCard';
import {appendLike} from '../stores';
import {useTRX} from '../app/hooks/useTRX';
import {useLITELISTState} from '../app';

export const TRXScreen = ({...props}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>([]);
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const {handlePlayTRX} = useTRX({
    ...props.navigation,
    ...props,
  });
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const keys = handleGetState({index: 'keys'});
  const index = client.initIndex('trx');

  const handleQuery = (text: string) => {
    if (text == '') {
      index.search('').then(({hits}) => {
        console.log('🚀 ~ index.search ~ hits:', hits);

        const results = hits.map((hit: any) => {
          const serializedTrak = hit.serialized_trak;
          console.log('🚀 ~ results ~ serializedTrak:', serializedTrak);
          if (!JSON.parse(serializedTrak).TRAK) return;
          return JSON.parse(serializedTrak).TRAK;
        });
        console.log('🚀 ~ results ~ results:', results);
        setResults(results);
      });
    }
    setQuery(text);
  };

  const handleSubmit = () => {
    index.search(query).then(({hits}) => {
      console.log('🚀 ~ index.search ~ hits:', hits);

      const results = hits.map((hit: any) => {
        const serializedTrak = hit.serialized_trak;
        console.log('🚀 ~ results ~ serializedTrak:', serializedTrak);
        if (!JSON.parse(serializedTrak).TRAK) return;
        return JSON.parse(serializedTrak).TRAK;
      });
      console.log('🚀 ~ results ~ results:', results);
      setResults(results);
    });
  };

  const handleTRAK = async (trak: any) => {
    // handlePlayTRX({
    //   navigation: props.navigation,
    //   geniusId: result.TRAK.trak.genius.id.replace(/["\\]/g, ''),
    //   spotifyAccessToken: appToken,
    // });

    await handlePlayTRX({
      navigation: props.navigation,
      trx: trak,
      spotifyAccessToken: keys.spotify.accessToken,
    });
  };

  return (
    <View>
      <View
        style={{flexDirection: 'row', margin: 10, justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <TextInput
            style={{
              // color: props.color,
              flex: 1,
              backgroundColor: '#cecece',
              fontSize: 14,
              fontWeight: '500',
              paddingLeft: 16,
            }}
            onChangeText={handleQuery}
            // value={text}
          />
        </View>
        <View>
          <TouchableHighlight onPress={handleSubmit}>
            <View style={{height: 50, width: 50, backgroundColor: 'red'}} />
          </TouchableHighlight>
        </View>
      </View>
      <FlatList
        listKey="Trending"
        data={results}
        renderItem={({index, item}) => {
          return (
            <TouchableOpacity onPress={() => handleTRAK(item)}>
              <View style={{flex: 3, flexDirection: 'column'}}>
                <TRAKCard
                  rank={++index}
                  artwork={item.trak.thumbnail}
                  artist={item.trak.title}
                  title={item.trak.artist}
                  isDynamic
                  colors={{background: '#fff'}}
                  status={'rising'}
                  // hasLiked={hasLiked}
                  trak={item.trak}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
