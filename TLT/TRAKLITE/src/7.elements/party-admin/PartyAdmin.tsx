import React from 'react';
import {View, Text, SafeAreaView, Button, FlatList} from 'react-native';
import {TrendingCard} from '../trending-card/TrendingCard';

export const PartyAdmin = ({handleRequestTrack, requests}: any) => {
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{minHeight: 100, width: '100%', backgroundColor: '#1a1a1a'}}>
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
