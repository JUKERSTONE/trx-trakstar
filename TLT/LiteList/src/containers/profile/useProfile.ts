import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  unLike,
  setYoutubeId,
  setYoutubeOff,
  useAsyncStorage,
  setLocalPlayer,
  setDownloadQueue,
} from '../../stores';
import {
  useLITELISTState,
  useFirebase,
  handleGetTRX00,
  handleUnLikeTRAK,
} from '../../app';
import {Alert} from 'react-native';
import axios from 'axios';
import {
  SPOTIFY_GET_ARTIST,
  SPOTIFY_GET_ARTIST_TOP_TRACKS,
  SPOTIFY_GET_ARTIST_ALBUMS,
  SPOTIFY_GET_ARTIST_RELATED_ARTISTS,
  SPOTIFY_PLAYLIST_ITEMS,
} from '../../api';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {handleGetTRX04} from '../../app/firebase/hooks/getTRX04';
// @ts-ignore
import ytdl from 'react-native-ytdl';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import slugify from 'slugify';
import {useTRX} from '../../app/hooks/useTRX';

export const useProfile = ({isOwner, navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const {
    handleToggleProfileVisibility,
    handleToggleFollowUser,
    handleUpdateTransaction,
  } = useFirebase();
  const [profile, setProfile] = useState<any>();
  const [loadingArtist, setLoadingArtist] = useState<any>(0);
  const [keys, setKeys] = useState<any>();
  const [favorites, setFavorites] = useState();
  const [TRXProfile, setTRXProfile] = useState<any>();
  const [playlists, setPlaylists] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [streaming, setStreaming] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const {useGET} = useAPI();
  const {wallet, publicKeys} = useSelector((state: any) => state.crypto);

  const {handlePlayTRX} = useTRX();

  console.log(
    '🚀 ~ file: useProfile.ts ~ line 39 ~ useProfile ~ wallet, publicKeys',
    wallet,
  );

  const {handleStore} = useAsyncStorage();

  function shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    const profile = handleGetState({index: 'profile'});
    const crypto = handleGetState({index: 'crypto'});
    const keys = handleGetState({index: 'keys'});
    const TRXProfile = profile.TRX;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 52 ~ useEffect ~ TRXProfile',
      TRXProfile,
    );
    setTRXProfile(TRXProfile);

    const favorites = TRXProfile.favorites
      ? JSON.parse(TRXProfile.favorites)
      : [];
    const playlists = TRXProfile.favorites
      ? JSON.parse(TRXProfile.playlists).filter(
          (item: any) => item.images.length,
        )
      : [];
    const transactions = crypto.transactions;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 40 ~ useEffect ~ playlists',
      playlists,
    );
    handleProfile(profile, keys);
    setFavorites(favorites);
    setPlaylists(playlists);
    handleTransactions(transactions);
  }, []);

  const handleTransactions = async (transactions: any) => {
    const transacationsArray = await Promise.all(
      transactions.map(async (transaction: any) => {
        console.log(
          '🚀 ~ file: useProfile.ts ~ line 108 ~ transactions.map ~ transaction',
          transaction,
        );
        const txId = transaction.txId;

        const route = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txId}`;
        return axios
          .get(route, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res: any) => {
            // return {[transaction.id]: res.data};
            return {
              success: true,
              payload: {...res.data, recipientURI: transaction.recipientURI},
              message: '',
            };
          })
          .catch(err => {
            console.log(
              '🚀 ~ file: getWallet.ts ~ line 46 ~ Object.keys ~ err',
              err,
            );
            return {
              success: false,
              payload: transaction,
              error: 'no data for this transaction',
            };
          });
      }),
    );
    console.log(
      '🚀 ~ file: useTransactions.ts ~ line 71 ~ handleTransactions ~ transactions',
      transacationsArray,
    );

    const sortedTransactions = transacationsArray.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // @ts-ignore

      return (
        // @ts-ignore
        new Date(b.payload.receipt_time_iso) -
        // @ts-ignore
        new Date(a.payload.receipt_time_iso)
      );
    });

    setTransactions(sortedTransactions);
  };

  const handleProfile = (profile: any, keys: any) => {
    const TRXProfile = profile.TRX;
    setProfile(TRXProfile);
    setKeys(keys);
  };

  const handleNFTNavigation = async (item: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 63 ~ handleNFTNavigation ~ item',
      item,
    );
    const route = api.stacks({
      method: 'transaction',
      payload: {transactionId: item.tx_id},
    });
    console.log(
      '🚀 ~ file: useNFTStatus.ts ~ line 26 ~ handleGetTransaction ~ route',
      route,
    );

    const transaction: any = await useGET({route})
      .then(response => {
        return response.data;
      })
      .catch(() => {
        alert('Unrecognised Transaction ID');
      });
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 77 ~ handleNFTNavigation ~ transaction',
      transaction,
    );

    // const tx_status = response.tx_status;

    // alert(tx_status);
    handleUpdateTransaction({
      ...transaction,
      asset_name: item.asset_name,
      cover_art: item.cover_art,
    });
  };

  const handleNextTransaction = (tx_status: any, item: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 99 ~ handleNextTransaction ~ item',
      item,
    );
    const functionName = item.contract_call.function_name;

    if (functionName === 'user-purchase-whitelist') {
      switch (tx_status) {
        case 'pending':
          alert('Transaction state pending. Please wait');
          break;
        case 'abort_by_response':
          Alert.alert(`Transaction failed.`, `Try again?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'RETRY',
              onPress: async () => {
                alert('reloading transaction');
              },
            },
          ]);
          break;
        case 'success':
          Alert.alert(`${item.asset_name}`, `Claim Your Whitelist?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Proceed',
              onPress: async () => {
                navigation.navigate('MODAL', {
                  type: 'nft-view',
                  exchange: {
                    active: true,
                    item: {
                      status: 'claim-whitelist',
                      nft: item,
                    },
                  },
                });
              },
            },
          ]);
          break;
        default:
          alert(tx_status);
          break;
      }
    } else if ('bernard-claim-whitelist') {
      switch (tx_status) {
        case 'pending':
          alert('Transaction state pending. Please wait');
          break;
        case 'abort_by_response':
          Alert.alert(`Transaction failed.`, `Try again?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'RETRY',
              onPress: async () => {
                alert('reloading transaction');
              },
            },
          ]);
          break;
        case 'success':
          Alert.alert(`Claim Your NFT?`, ``, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Proceed',
              onPress: async () => {
                navigation.navigate('MODAL', {
                  type: 'nft-view',
                  exchange: {
                    active: true,
                    item: {
                      status: 'claim-nft',
                      nft: item,
                    },
                  },
                });
              },
            },
          ]);
          break;
        default:
          alert(tx_status);
          break;
      }
    } else if ('user-claim-nft') {
      switch (tx_status) {
        case 'pending':
          alert('Transaction state pending. Please wait');
          break;
        case 'abort_by_response':
          Alert.alert(`Transaction failed.`, `Try again?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'RETRY',
              onPress: async () => {
                alert('reloading transaction');
              },
            },
          ]);
          break;
        case 'success':
          alert('ACCESS FULL NFT');
          break;
        default:
          alert(tx_status);
          break;
      }
    }
  };

  const handleArtistNavigation = (item: any, index: any) => {
    setLoadingArtist(index);
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 264 ~ axios.get ~ TRXProfile',
      TRXProfile,
    );

    console.log('🚀 ~ file: useProfile.ts ~ line 272 ~ axios.get ~ keys', keys);

    const appToken = keys.spotify.appToken;

    console.log(
      '🚀 ~ file: useProfile.ts ~ line 241 ~ handleArtistNavigation ~ item',
      item,
    );

    return axios
      .all([
        axios.get(SPOTIFY_GET_ARTIST(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_TOP_TRACKS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_ALBUMS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_RELATED_ARTISTS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
      ])
      .then(
        axios.spread((data1, data2, data3, data4) => {
          const artist = data1.data;
          const artistTopTracks = data2.data.tracks;
          const artistAlbums = data3.data.items;
          const artistRelated = data4.data.artists;

          const artistData = {
            artist: {
              id: artist.id,
              name: artist.name,
              followers: artist.followers,
              genres: artist.genres,
              images: artist.images,
              popularity: artist.popularity,
            },
            artist_top_tracks: artistTopTracks,
            artist_albums: artistAlbums,
            artist_related: artistRelated,
          };

          // navigation.navigate('ArtistView', {artistData});

          console.log(
            '🚀 ~ file: useProfile.ts ~ line 126 ~ axios.spread ~ artistData',
            artistData,
          );

          setTimeout(() => {
            setLoadingArtist(false);
            navigation.navigate('MODAL', {
              type: 'artist-view',
              exchange: {
                active: true,
                item: {
                  artist: artistData,
                },
              },
            });
          }, 800);
        }),
      )
      .catch(error => {
        alert('errors');
        // return {
        //   success: false,
        //   data: error,
        // };
      });
  };

  const handleTRAK = (item: any) => {
    console.log('🚀 ~ file: useProfile.ts:416 ~ handleTRAK ~ item:', item);
    Alert.alert(
      `${item.artists[0].name} - ${item.name}`,
      `What would you like to do?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Preview',
          onPress: async () => {
            if (item.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.preview_url,
                url: item.album.images[0].url,
                artist: item.artists[0].name,
                title: item.name,
                id: {
                  spotify: item.id,
                  apple_music: '',
                },
                isrc: item.external_ids.isrc,
              });
              store.dispatch(action);
            } else {
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
              );
            }
          },
        },
        {
          text: 'Find',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: item.name,
                  artist: item.artists[0].name,
                },
              },
            });
          },
        },
      ],
    );
  };

  const handlePlaylistNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 394 ~ handlePlaylistNavigation ~ item',
      item,
    );
    const type = item.info;
    const appToken = keys.spotify.appToken;

    switch (type) {
      case 'playlists:spotify':
        axios
          .get(SPOTIFY_PLAYLIST_ITEMS(item.id), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + appToken,
            },
          })
          .then(response => {
            console.log(response.data, 'oiuy');
            const items = {
              tracks: [...response.data.items],
              images: item.images[0].url,
            };
            console.log(
              '🚀 ~ file: useProfile.ts ~ line 89 ~ handleView ~ items',
              items,
            );
            // navigation.navigate('TapeView', {tape: items});
            navigation.navigate('MODAL', {
              type: 'playlist-view',
              exchange: {
                active: true,
                item: items,
              },
            });
          });
        break;
    }
    // alert(JSON.stringify(item));
  };

  const handleSendCrypto = () => {
    navigation.navigate('CRYPTO');
  };

  const handleClipboard = () => {
    Clipboard.setString(TRXProfile.stacks_keys.public);
  };

  const handleNavigateSwipe = () => {
    navigation.navigate('LISTS');
  };

  const handleCatalogTRAK = (item: any) => {
    Alert.alert(
      `${item.artist} - ${item.title}`,
      `What would you like to do?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Preview',
          onPress: async () => {
            alert('WIP');
            if (item.track.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.track.preview_url,
                url: item.track.album.images[0].url,
                artist: item.track.artists[0].name,
                title: item.track.name,
                id: {
                  spotify: item.track.id,
                  apple_music: '',
                },
                isrc: item.external_ids.isrc,
              });
              store.dispatch(action);
            } else {
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
              );
            }
          },
        },
        {
          text: 'Find',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: item.title,
                  artist: item.artist,
                },
              },
            });
          },
        },
      ],
    );
  };

  const handleSelectOriginal = async ({trak, trakURI, localTrak}: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts:578 ~ handleSelectOriginal ~ trak:',
      trak,
    );
    console.log(
      '🚀 ~ file: useProfile.ts:645 ~ updatedArray ~ profile:',
      profile,
    );
    let type;
    if (trak.NFTFileName) {
      type = 'original';
    } else if (trak.isPreview) {
      type = 'preview';
    } else type = 'genius';

    if (type === 'original') {
      Toast.show({
        type: 'success',
        text1: 'Playing TRX Original Track',
        text2: `${trak.artist} - ${trak.title}`,
      });

      const action = handleMediaPlayerAction({
        playbackState: 'source',
        uri: trak.trakAUDIO,
        url: trak.cover_art,
        artist: trak.artist,
        title: trak.title,
        mode: 'header',
        id: {
          spotify: null,
          apple_music: null,
          traklist: trak.NFTFileName,
        },
        isrc: null,
      });
      store.dispatch(action);
    } else if (type === 'preview') {
      Alert.alert(`TRX ORIGINAL TRACK`, `${trak.artist} - ${trak.title}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Play Preview',
          onPress: async () => {
            console.log(
              '🚀 ~ file: useOriginals.ts:67 ~ handleTRAK ~ trak:',
              trak,
            );
            Toast.show({
              type: 'success',
              text1: 'Playing TRX Preview',
              text2: `${trak.artist} - ${trak.title}`,
            });

            const action1 = setYoutubeOff({});
            store.dispatch(action1);

            const action = handleMediaPlayerAction({
              playbackState: 'source',
              uri: trak.preview,
              url: trak.cover_art,
              artist: trak.artist,
              title: trak.title,
              mode: 'header',
              id: {
                spotify: null,
                apple_music: null,
                traklist: null,
              },
              isrc: trak.isrc,
            });
            store.dispatch(action);
          },
        },
        {
          text: 'Unsave Song',
          onPress: async () => {
            handleUnLikeTRAK({trak}).then(() => {
              const updatedArray = profile.likes.filter((track: any) => {
                return track.isrc !== trak.isrc;
              });
              const action = unLike({
                updatedArray,
              });
              store.dispatch(action);
              //
              //
            });
          },
        },
        {
          text: 'Buy Merchandise',
          onPress: async () => {
            alert('Coming soon');
          },
        },
      ]);
    } else if (type === 'genius') {
      if (localTrak) {
        console.log(
          '🚀 ~ file: useProfile.ts:758 ~ handleSelectOriginal ~ localTrak:',
          localTrak,
        );

        const action = setLocalPlayer({localTrak});
        store.dispatch(action);
        return;
      }

      console.log('🚀 ~ file: useProfile.ts:751 ~ onPress: ~ trak:', trak);
      const trxUri = trak.trxUri;

      const protocol = trxUri.split(':')[1];

      let trx, serializedTrak, trak00;
      switch (protocol) {
        case '00':
          trx = await handleGetTRX00({trakURI: trxUri});
          serializedTrak = trx.serialized_trak;
          trak = JSON.parse(serializedTrak).TRAK
            ? JSON.parse(serializedTrak).TRAK
            : JSON.parse(serializedTrak);
          console.log(
            '🚀 ~ file: useProfile.ts:736 ~ handleSelectOriginal ~ trak00:',
            trak00,
          );
          break;
        case '04':
          trx = await handleGetTRX04({trakURI: trxUri});
          serializedTrak = trx.serialized_trak;
          trak = JSON.parse(serializedTrak).TRAK
            ? JSON.parse(serializedTrak).TRAK
            : JSON.parse(serializedTrak);
          break;
        default:
          break;
      }

      console.log(
        '🚀 ~ file: useProfile.ts:749 ~ handleSelectOriginal ~ navigation:',
        navigation,
      );

      await handlePlayTRX({
        navigation,
        trx: trak,
        spotifyAccessToken: keys.spotify.accessToken,
      });
      console.log(
        '🚀 ~ file: useProfile.ts:749 ~ handleSelectOriginal ~ keys:',
        keys,
      );

      console.log(
        '🚀 ~ file: useProfile.ts:722 ~ handleSelectOriginal ~ trx:',
        {trx, serializedTrak, trak00},
      );
    }
  };

  const handleShareProfile = () => {
    Alert.alert(`Share something..`, `Select your share option`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Latest Track',
        onPress: async () => {
          alert('Coming soon');
          // console.log(
          //   '🚀 ~ file: useOriginals.ts:67 ~ handleTRAK ~ trak:',
          //   trak,
          // );
          // store.dispatch(action);
        },
      },
      {
        text: 'Top 5 Tracks',
        onPress: async () => {
          alert('Coming soon');
          // console.log(
          //   '🚀 ~ file: useOriginals.ts:67 ~ handleTRAK ~ trak:',
          //   trak,
          // );
          // store.dispatch(action);
        },
      },
      {
        text: 'Top 5 Artists',
        onPress: async () => {
          // console.log(
          //   '🚀 ~ file: useOriginals.ts:114 ~ onPress: ~ trak:',
          //   trak,
          // );
          // handleLikeTRAK({trak});
          alert('coming soon');
        },
      },
    ]);
  };

  const handleUnlikeTRAK = async ({trak}: any) => {
    await handleUnLikeTRAK({trak}).then(() => {
      console.log(
        '🚀 ~ file: useProfile.ts:658 ~ handleUnLikeTRAK ~ trak:',
        trak,
      );

      const updatedArray = profile.likes.filter((track: any) => {
        console.log(
          '🚀 ~ file: useProfile.ts:645 ~ updatedArray ~ track:',
          track,
        );

        if (trak.NFTFileName) {
          return track.NFTFileName
            ? trak.NFTFileName !== track.NFTFileName
            : true;
        }

        return track.isrc ? track.isrc !== trak.isrc : true;
      });
      const action = unLike({
        updatedArray,
      });
      store.dispatch(action);
    });
  };

  const handleDownload = async (trak: any) => {
    console.log('🚀 ~ file: useProfile.ts:866 ~ handleDownload ~ trak:', trak);
    // console.log('🚀 ~ file: useProfile.ts:865 ~ handleDownload ~ trak:', trak);
    const youtubeURL = `http://www.youtube.com/watch?v=${
      trak.trx04.split(':')[2]
    }`;
    const urls = await ytdl(youtubeURL, {
      quality: 'highest',
      filter: 'audioandvideo',
    });
    console.log('🚀 ~ file: useProfile.ts:944 ~ handleDownload ~ urls:', urls);
    const downloadableYTUrl = urls[0].url;
    console.log(
      '🚀 ~ file: useProfile.ts:890 ~ handleDownload ~ downloadableYTUrl:',
      downloadableYTUrl,
    );
    console.log('🚀 ~ file: useProfile.ts:867 ~ handleDownload ~ urls:', urls);

    // Generate a unique filename for the downloaded image
    const filename = slugify(`${trak.artist} ${trak.title}`);
    const trakPath = `${RNFS.DocumentDirectoryPath}/${filename}.mp4`;

    // downloadQueue
    const action = setDownloadQueue({
      download: [
        {
          downloadableYTUrl,
          trakPath,
          uri: trak.trx04,
          title: trak.title,
          artist: trak.artist,
          cover_art: trak.cover_art,
        },
      ],
    });
    store.dispatch(action);

    // downloadAndSaveVideo(downloadableYTUrl, 'artist', urls[0].headers);
  };

  return {
    profile,
    favorites,
    playlists,
    handleToggleProfileVisibility,
    handleToggleFollowUser,
    handleNFTNavigation,
    handleNextTransaction,
    refreshing,
    handleArtistNavigation,
    loadingArtist,
    handleTRAK,
    handlePlaylistNavigation,
    handleSendCrypto,
    TRXProfile,
    transactions,
    handleClipboard,
    handleNavigateSwipe,
    handleCatalogTRAK,
    wallet,
    publicKeys,
    handleSelectOriginal,
    handleShareProfile,
    handleUnlikeTRAK,
    handleDownload,
  };
};
