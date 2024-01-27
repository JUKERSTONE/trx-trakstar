import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {TRAKCard} from '../trak-card/TRAKCard';

export const ForYouElement = ({
  trak,
  metaTRAK,
  handleTRAK,
  modal,
  results,
  item = null,
  TRXProfile,
  ...props
}: any) => {
  // TRA
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 24 ~ modal', modal);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 24 ~ results', results);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 23 ~ metaTRAK', metaTRAK);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 14 ~ TRAKTabElement ~ trak', trak);

  const hasTRX = true;

  const artist = modal ? item.artist : null;
  const title = modal ? item.title : null;

  if (trak && metaTRAK) return <View />;

  if (!modal) {
    return (
      <FlatList
        style={{backgroundColor: '#1a1a1a'}}
        data={metaTRAK}
        ListHeaderComponent={() => (
          <>
            {modal && (
              <>
                <View
                  style={{
                    backgroundColor: '#ffff64',
                    padding: 3,
                    paddingHorizontal: 8,
                  }}>
                  <VHeader
                    type="four"
                    color="#1a1a1a"
                    text={`TRX™ METAVERSE `}
                    textAlign="center"
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#ffff64',
                    padding: 3,
                    paddingHorizontal: 8,
                  }}>
                  <VHeader
                    type="five"
                    color="#232323"
                    text={`POWERED BY`}
                    textAlign="center"
                  />
                </View>

                <View
                  style={{
                    paddingBottom: 5,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Genius_Logo.png',
                    }}
                    style={{
                      backgroundColor: '#000',
                      height: 70,
                      width: '100%',
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      padding: 20,
                    }}>
                    <VHeader
                      type="three"
                      color="#ffff64"
                      text={`FIND RESULTS FOR THE MEANING AND THE KNOWLEDGE BEHIND :`}
                      textAlign="left"
                    />
                    <View
                      style={{
                        marginTop: 10,
                        backgroundColor: '#ffff64',
                        alignSelf: 'flex-end',
                        padding: 10,
                        borderRadius: 5,
                      }}>
                      <VHeader
                        type="four"
                        color="#1a1a1a"
                        text={`'${title}' by ${artist}`}
                        textAlign="right"
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          </>
        )}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            item,
          );
          const result = item.result;

          const serialized_trak = item?.serialized_trak;
          // console.log(
          //   '🚀 ~ file: TRAKTab.tsx ~ line 138 ~ serialized_trak',
          //   serialized_trak,
          // );

          const trak = serialized_trak ? JSON.parse(serialized_trak) : null;
          console.log('🚀 ~ file: TRAKTab.tsx ~ line 185 ~ trak', trak);

          switch (item.type) {
            case null:
              return <View />;
            case 'TRK':
              console.log('🚀 ~ file: TRAKTab.tsx ~ line 169 ~ item', item);
              return (
                <TouchableOpacity onPress={() => handleTRAK(item?.result)}>
                  <View style={{flex: 3, flexDirection: 'column'}}>
                    <TrendingCard
                      // rank={++index}
                      artwork={item?.result.song_art_image_url}
                      title={item.result.artist_names}
                      artist={item.result.title}
                      isDynamic
                      colors={{background: '#fff'}}
                      status={'same'}
                    />
                  </View>
                </TouchableOpacity>
              );
            default:
              if (!trak) return null;
              console.log('🚀 ~ file: ForYou.tsx:170 ~ hasLiked ~ trak:', trak);
              const hasLiked = trak?.TRAK?.Likes?.some((item: any) => {
                console.log(
                  '🚀 ~ file: TRAK.tsx ~ line 78 ~ test ~ item',
                  item,
                );
                return item.id == TRXProfile.trak_name;
              });
              return (
                // <TouchableOpacity onPress={() => handleTRAK(result)}>
                <TouchableOpacity
                  onPress={() => handleTRAK({...trak, isrc: item.isrc})}>
                  <View style={{flex: 3, flexDirection: 'column'}}>
                    <TRAKCard
                      rank={++index}
                      artwork={trak?.TRAK.trak.thumbnail}
                      artist={trak?.TRAK.trak.title}
                      title={trak?.TRAK.trak.artist}
                      isDynamic
                      colors={{background: '#fff'}}
                      status={'rising'}
                      hasLiked={hasLiked}
                      trak={trak}
                    />
                  </View>
                </TouchableOpacity>
              );
          }
        }}
        keyExtractor={item => item.id}
      />
    );
  }
  return (
    <ParallaxScrollView
      backgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={150}
      renderBackground={() => (
        <LinearGradient colors={['#1a1a1a', '#000']}>
          <FlatList
            style={{backgroundColor: '#1a1a1a'}}
            scrollEnabled={false}
            data={results}
            ListHeaderComponent={() => (
              <>
                {modal && (
                  <>
                    <View
                      style={{
                        backgroundColor: '#ffff64',
                        padding: 3,
                        paddingHorizontal: 8,
                      }}>
                      <VHeader
                        type="four"
                        color="#1a1a1a"
                        text={`TRX™ METAVERSE `}
                        textAlign="center"
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: '#ffff64',
                        padding: 3,
                        paddingHorizontal: 8,
                      }}>
                      <VHeader
                        type="five"
                        color="#232323"
                        text={`POWERED BY`}
                        textAlign="center"
                      />
                    </View>

                    <View
                      style={{
                        paddingBottom: 5,
                        borderRadius: 10,
                      }}>
                      <Image
                        source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Genius_Logo.png',
                        }}
                        style={{
                          backgroundColor: '#000',
                          height: 70,
                          width: '100%',
                        }}
                      />

                      <View
                        style={{
                          flexDirection: 'column',
                          padding: 20,
                        }}>
                        <VHeader
                          type="three"
                          color="#ffff64"
                          text={`FIND RESULTS FOR THE MEANING AND THE KNOWLEDGE BEHIND :`}
                          textAlign="left"
                        />
                        <View
                          style={{
                            marginTop: 10,
                            backgroundColor: '#ffff64',
                            alignSelf: 'flex-end',
                            padding: 10,
                            borderRadius: 5,
                          }}>
                          <VHeader
                            type="four"
                            color="#1a1a1a"
                            text={`'${title}' by ${artist}`}
                            textAlign="right"
                          />
                        </View>
                      </View>
                    </View>
                  </>
                )}
              </>
            )}
            renderItem={({item, index}) => {
              console.log(
                '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
                item,
              );
              const result = item.result;

              const serialized_trak = item?.serialized_trak;
              // console.log(
              //   '🚀 ~ file: TRAKTab.tsx ~ line 138 ~ serialized_trak',
              //   serialized_trak,
              // );

              const trak = serialized_trak ? JSON.parse(serialized_trak) : null;
              console.log('🚀 ~ file: TRAKTab.tsx ~ line 185 ~ trak', trak);

              switch (item.type) {
                case null:
                  return <View />;
                case 'TRK':
                  console.log('🚀 ~ file: TRAKTab.tsx ~ line 169 ~ item', item);
                  return (
                    <TouchableOpacity onPress={() => handleTRAK(item?.result)}>
                      <View style={{flex: 3, flexDirection: 'column'}}>
                        <TrendingCard
                          // rank={++index}
                          artwork={item?.result.song_art_image_url}
                          title={item.result.artist_names}
                          artist={item.result.title}
                          isDynamic
                          colors={{background: '#fff'}}
                          status={'same'}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                default:
                  const hasLiked = trak.TRAK.likes.some((item: any) => {
                    console.log(
                      '🚀 ~ file: TRAK.tsx ~ line 78 ~ test ~ item',
                      item,
                    );
                    return item.id == TRXProfile.trak_name;
                  });
                  return (
                    // <TouchableOpacity onPress={() => handleTRAK(result)}>
                    <TouchableOpacity
                      onPress={() => handleTRAK({...trak, isrc: item.isrc})}>
                      <View style={{flex: 3, flexDirection: 'column'}}>
                        <TrendingCard
                          // rank={++index}
                          artwork={trak?.TRAK.trak.thumbnail}
                          artist={trak?.TRAK.trak.title}
                          title={trak?.TRAK.trak.artist}
                          isDynamic
                          colors={{background: '#fff'}}
                          status={'rising'}
                          hasLiked={hasLiked}
                          trak={trak}
                        />
                      </View>
                    </TouchableOpacity>
                  );
              }
            }}
            keyExtractor={item => item.id}
          />
        </LinearGradient>
      )}>
      <FlatList
        scrollEnabled={false}
        data={results}
        style={{backgroundColor: '#1a1a1a', height: '100%'}}
        ListHeaderComponent={() => (
          <>
            {modal && (
              <>
                <View
                  style={{
                    backgroundColor: '#ffff64',
                    padding: 3,
                    paddingHorizontal: 8,
                  }}>
                  <VHeader
                    type="four"
                    color="#1a1a1a"
                    text={`TRX™ METAVERSE `}
                    textAlign="center"
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#ffff64',
                    padding: 3,
                    paddingHorizontal: 8,
                  }}>
                  <VHeader
                    type="five"
                    color="#232323"
                    text={`POWERED BY`}
                    textAlign="center"
                  />
                </View>

                <View
                  style={{
                    paddingBottom: 5,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Genius_Logo.png',
                    }}
                    style={{
                      backgroundColor: '#000',
                      height: 70,
                      width: '100%',
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      padding: 20,
                    }}>
                    <VHeader
                      type="three"
                      color="#ffff64"
                      text={`FIND RESULTS FOR THE MEANING AND THE KNOWLEDGE BEHIND :`}
                      textAlign="left"
                    />
                    <View
                      style={{
                        marginTop: 10,
                        backgroundColor: '#ffff64',
                        alignSelf: 'flex-end',
                        padding: 10,
                        borderRadius: 5,
                      }}>
                      <VHeader
                        type="four"
                        color="#1a1a1a"
                        text={`'${title}' by ${artist}`}
                        textAlign="right"
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          </>
        )}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            item,
          );
          const result = item.result;

          const serialized_trak = item?.serialized_trak;
          // console.log(
          //   '🚀 ~ file: TRAKTab.tsx ~ line 138 ~ serialized_trak',
          //   serialized_trak,
          // );

          const trak = serialized_trak ? JSON.parse(serialized_trak) : null;
          console.log('🚀 ~ file: TRAKTab.tsx ~ line 185 ~ trak', trak);

          switch (item.type) {
            case null:
              return <View />;
            case 'TRK':
              console.log('🚀 ~ file: TRAKTab.tsx ~ line 169 ~ item', item);
              return (
                <TouchableOpacity onPress={() => handleTRAK(item?.result)}>
                  <View style={{flex: 3, flexDirection: 'column'}}>
                    <TrendingCard
                      // rank={++index}
                      artwork={item?.result.song_art_image_url}
                      title={item.result.artist_names}
                      artist={item.result.title}
                      isDynamic
                      colors={{background: '#fff'}}
                      status={'same'}
                    />
                  </View>
                </TouchableOpacity>
              );
            default:
              const hasLiked = trak.TRAK.likes.some((item: any) => {
                console.log(
                  '🚀 ~ file: TRAK.tsx ~ line 78 ~ test ~ item',
                  item,
                );
                return item.id == TRXProfile.trak_name;
              });
              return (
                // <TouchableOpacity onPress={() => handleTRAK(result)}>
                <TouchableOpacity
                  onPress={() => handleTRAK({...trak, isrc: item.isrc})}>
                  <View style={{flex: 3, flexDirection: 'column'}}>
                    <TrendingCard
                      // rank={++index}
                      artwork={trak?.TRAK.trak.thumbnail}
                      artist={trak?.TRAK.trak.title}
                      title={trak?.TRAK.trak.artist}
                      isDynamic
                      colors={{background: '#fff'}}
                      status={'rising'}
                      hasLiked={hasLiked}
                      trak={trak}
                    />
                  </View>
                </TouchableOpacity>
              );
          }
        }}
        keyExtractor={item => item.id}
      />
    </ParallaxScrollView>
  );
};
