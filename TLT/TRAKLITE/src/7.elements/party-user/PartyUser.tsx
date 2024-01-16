import React, {FC} from 'react';
import {View, Text, SafeAreaView, Button, FlatList, Image} from 'react-native';
import {TrendingCard} from '../../7.elements/trending-card/TrendingCard';

interface IPartyUser {
  requests: any;
  handleRequestTrack: any;
}

export const PartyUser: FC<IPartyUser> = ({requests, handleRequestTrack}) => {
  console.log('🚀 ~ file: PartyUser.tsx ~ line 20 ~ requestList', requests);
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{minHeight: 100, width: '100%', backgroundColor: '#1a1a1a'}}>
        <View style={{marginTop: 30}}>
          <Button title="request a track" onPress={handleRequestTrack} />
        </View>
        <FlatList
          data={requests}
          renderItem={({item, index}: any) => {
            return (
              <TrendingCard
                // rank={item.rank}
                artwork={item.artwork}
                title={item.title}
                artist={item.artist}
                // status={item.status}
              />
              // </View>
            );
          }}
          // keyExtractor={(item, index) => item.id}
          listKey="Charefcwddfts"
        />
      </View>
    </SafeAreaView>
  );
};
