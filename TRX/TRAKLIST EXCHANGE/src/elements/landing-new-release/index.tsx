import React from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Caption, BHeader, Paragraph} from '../typography';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <View
            style={{
              // marginLeft: 5,
              marginTop: 2,
              padding: 10,
              alignItems: 'center',
            }}>
            <VHeader
              type="four"
              color="whitesmoke"
              text={item.artists[0].name}
              numberOfLines={1}
            />
            <Paragraph
              type="two"
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
          <View
            style={{
              alignSelf: 'flex-end',

              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
              marginBottom: 10,
              // width: '50%',
              backgroundColor: 'yellow',
              padding: 10,
              paddingVertical: 15,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginRight: 10,
                backgroundColor: '#1a1a1a',
                borderRadius: 20,
                padding: 4,
              }}>
              <MaterialIcons name="trending-up" size={20} color={'#fff'} />
            </View>
            <VHeader type="four" color="#1a1a1a" text={'NEW THIS WEEK.'} />
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
