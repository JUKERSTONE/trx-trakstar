import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {TrackCardView} from '../../6.containers';
import {VHeader, Body, Paragraph, BHeader} from '../../7.elements/typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useInvestment} from '../../0.app';
interface TTrackSelect {
  releases: any;
  handleTrackPress: any;
  handleTrackNavigation: any;
  handleAlbumNavigation: any;
}

export const TrackSelect: React.FC<TTrackSelect> = ({
  releases,
  handleTrackPress,
  handleTrackNavigation,
  handleAlbumNavigation,
}) => {
  const renderItem = ({item, index}: any) => {
    console.log(
      '🚀 ~ file: TrackSelect.tsx ~ line 30 ~ renderItem ~ item',
      item,
    );
    return (
      <TouchableOpacity onPress={() => handleAlbumNavigation(item)}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 8,
            backgroundColor: '#fff',
            marginHorizontal: 25,
            borderRadius: 10,
            // opacity: 0.75,
            paddingRight: 10,
            borderWidth: 4,
            borderColor: '#fff',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                // height: 70,
                flex: 1,
                width: '100%',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: '#cecece',
              }}
              source={{uri: item.images[0].url}}
            />
          </View>
          <View
            style={{flexDirection: 'row', paddingLeft: 20, maxWidth: '80%'}}>
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  // backgroundColor: '#fff',
                  marginBottom: 0,
                  padding: 4,
                  // opacity: 0.8,
                }}>
                <VHeader
                  type="four"
                  color={'#1db954'}
                  text={item.name}
                  numberOfLines={1}
                  textAlign={'right'}
                />
                <View style={{marginTop: 2}}>
                  <VHeader
                    type="four"
                    color={'#1a1a1a'}
                    text={item.artists[0].name}
                    numberOfLines={1}
                    textAlign={'right'}
                  />
                </View>
                <View
                  style={{
                    marginTop: 3,
                    backgroundColor: '#1db954',
                    padding: 2,
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: '#1db954',
                  }}>
                  <VHeader
                    type="five"
                    color={'#fff'}
                    text={item.album_type}
                    numberOfLines={1}
                    textAlign={'right'}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <ParallaxScrollView
    //   backgroundColor={'#fff'}
    //   parallaxHeaderHeight={300}
    //   stickyHeaderHeight={150}
    //   renderBackground={() => (
    //     // <ImageBackground source={track.album.images} style={{height: 300}}>
    //     <LinearGradient colors={['#1a1a1a', '#000']}>
    //       <View
    //         style={{
    //           height: 300,
    //           alignItems: 'center',
    //           justifyContent: 'space-around',
    //         }}>
    //         <Image
    //           style={{height: 200, width: 300, marginTop: 3, borderRadius: 8}}
    //           source={{
    //             uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media',
    //           }}
    //         />
    //       </View>
    //     </LinearGradient>
    //   )}>
    <View
      style={{
        backgroundColor: '#1a1a1a',
        borderTopWidth: 1,
        borderTopColor: 'grey',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 15,
        }}>
        <VHeader
          type="four"
          color="#cecece"
          text={'here are this weeks releases'}
        />
        <VHeader
          type="five"
          color="#cecece"
          text={'like at least 6 traks and submit above to use the app'}
        />
      </View>
      <FlatList
        data={releases}
        renderItem={renderItem}
        // showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => '' + index}
        listKey="TrackSelect"
      />
    </View>
    // </ParallaxScrollView>
  );
};
