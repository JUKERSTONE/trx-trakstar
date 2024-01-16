import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Caption} from '../typography';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface LandingNewReleaseProps {
  releases: any;
  // handleAlbumNavigation: any;
}

export const LandingNewRelease: React.FC<LandingNewReleaseProps> = ({
  releases,
  // handleAlbumNavigation,
}) => {
  console.log('🚀 ~ file: index.tsx ~ line 24 ~ releases', releases);
  dayjs.extend(relativeTime);

  const renderItem = ({item}: any) => {
    return (
      // <Pressable onPress={() => handleAlbumNavigation(item)}>
      <Pressable onPress={() => alert('handle album nav')}>
        <View style={{justifyContent: 'space-between', margin: 5}}>
          <Image
            source={{uri: item.images[0].url}}
            style={{
              backgroundColor: '#fff',
              borderRadius: 8,
              height: 200,
              width: '100%',
              justifyContent: 'flex-end',
            }}
          />
          <View style={{marginLeft: 5, marginTop: 2}}>
            <VHeader
              type="five"
              color="whitesmoke"
              text={item.artists[0].name}
              numberOfLines={1}
            />
            <Caption
              type="one"
              color="#cececece"
              text={item.name}
              numberOfLines={1}
            />
            <Caption
              type="two"
              color="#cecece"
              text={dayjs(item.release_date).fromNow()}
              numberOfLines={1}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    // Within your render function
    <LinearGradient colors={['#1A1A1A', '#1B3926']}>
      <View style={{marginLeft: 15, marginVertical: 10}}>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <View style={{marginBottom: 1, marginRight: 15}}>
            <Caption type="one" color="yellow" text={'NEW THIS WEEK...'} />
          </View>

          {releases ? (
            <FlatList
              data={releases}
              renderItem={renderItem}
              horizontal={true}
              // showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => '' + index}
              listKey="NewRelease"
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};
