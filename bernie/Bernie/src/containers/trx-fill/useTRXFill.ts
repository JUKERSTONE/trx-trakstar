import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import {useBERNIEState, handleRequests} from '../../app';
import {handleTRX00SpotifyDependancies} from '../../app/handlers/trx00SpotifyDependencies';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {handleAddTRX00} from '../../app/hooks/addTRX00';
import {handleLikeMigration} from '../../app/firebase/hooks/likeMigration';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.spotify.bernie.access_token;
console.log('🚀 ~ file: useTRXFill.ts:12 ~ accessToken:', accessToken);

export const useTRXFill = ({navigation, route}: any) => {
  const [trakTemplate, setTrakTemplate] = useState(route.params.trak);
  const [mintLoading, setMintLoading] = useState(route.params.trak);
  console.log('🚀 ~ file: useTRXFill.ts:12 ~ useTRXFill ~ trak:', trakTemplate);
  const missingProviders = trakTemplate.missingProviders;

  // const {handleGetState} = useBERNIEState();
  // const suggestion = handleGetState({index: 'trak'});
  const suggestion = useSelector((state: any) => {
    console.log('🚀 ~ file: useTRXFill.ts:22 ~ useTRXFill ~ state:', state);
    return state.trak;
  });
  // console.log('🚀 ~ file: useTRXFill.ts:25 ~ state ~ state:', state);
  console.log('🚀 ~ file: TokencyText.tsx:20 ~ suggestion:', suggestion);

  const isPreview = route.params?.isPreview;
  const reference = route.params?.reference;
  console.log(
    '🚀 ~ file: useTRXFill.ts:33 ~ useTRXFill ~ reference:',
    reference,
  );

  const {spotify, apple_music, soundcloud, youtube} = suggestion.fill;

  const {POST} = useAPI();

  const handleSubmitTRX = async () => {
    console.log(
      '🚀 ~ file: useTRXFill.ts:68 ~ handleSubmitTRX ~ trakTemplate:',
      trakTemplate,
    );

    if (isPreview) {
      console.log(
        '🚀 ~ file: useTRXFill.ts:12 ~ useTRXFill ~ trak:',
        trakTemplate,
        reference,
      );

      const extraData: any = await handleTRX00SpotifyDependancies({
        // id: hasSpotify.id,
        accessToken,
        isrc: reference.isrc,
      });
      console.log(
        '🚀 ~ file: useTRXFill.ts:56 ~ handleSubmitTRX ~ extraData:',
        extraData,
      );

      console.log({
        ...trakTemplate,
        ...extraData,
        trak: {
          ...trakTemplate.trak,
          spotify: {id: extraData?.spotifyId},
          apple_music: !apple_music?.id
            ? trakTemplate.trak.apple_music
            : {
                id: apple_music?.id,
              },
          soundcloud: !soundcloud?.id
            ? trakTemplate.trak.soundcloud
            : {
                url: soundcloud?.id,
              },
          youtube: !youtube?.id
            ? trakTemplate.trak.youtube
            : {url: youtube?.id},
        },
      });

      return await handleAddTRX00({
        trak: {
          ...trakTemplate,
          ...extraData,
          trak: {
            ...trakTemplate.trak,
            spotify: {id: extraData.spotifyId},
            apple_music: !apple_music?.id
              ? trakTemplate.trak.apple_music
              : {
                  id: apple_music?.id,
                },
            soundcloud: !soundcloud?.id
              ? trakTemplate.trak.soundcloud
              : {
                  url: soundcloud?.id,
                },
            youtube: !youtube?.id
              ? trakTemplate.trak.youtube
              : {url: youtube?.id},
          },
        },
      }).then(() => {
        handleLikeMigration({
          reference,
          trak: {
            ...trakTemplate.trak,
            spotify: {id: extraData.spotifyId},
            apple_music: !apple_music?.id
              ? trakTemplate.trak.apple_music
              : {
                  id: apple_music?.id,
                },
            soundcloud: !soundcloud?.id
              ? trakTemplate.trak.soundcloud
              : {
                  url: soundcloud?.id,
                },
            youtube: !youtube?.id
              ? trakTemplate.trak.youtube
              : {url: youtube?.id},
          },
        }).then(() => {
          navigation.navigate('ADMIN_DASHBOARD');
          alert('success');
        });

        // CREATE NEW LIKE
        // DELETE OLD LIKE
      });
    } else {
      const hasSpotify = spotify;

      switch (!!hasSpotify?.id) {
        case true:
          const extraData = await handleTRX00SpotifyDependancies({
            id: hasSpotify.id,
            accessToken,
          });

          return await handleAddTRX00({
            trak: {
              ...trakTemplate,
              ...extraData,
              trak: {
                ...trakTemplate.trak,
                spotify: !spotify?.id
                  ? trakTemplate.trak.spotify?.id
                  : {id: spotify?.id},
                apple_music: !apple_music?.id
                  ? trakTemplate.trak.apple_music
                  : {
                      id: apple_music?.id,
                    },
                soundcloud: !soundcloud?.id
                  ? trakTemplate.trak.soundcloud
                  : {
                      url: soundcloud?.id,
                    },
                youtube: !youtube?.id
                  ? trakTemplate.trak.youtube
                  : {url: youtube?.id},
              },
            },
          }).then(() => {
            alert('success');
          });
        default:
          // const secondaryTRAKRoute = routes.traklist({
          //   method: 'set_trak',
          // });

          // const secondaryTRAKResponse = POST({
          //   route: secondaryTRAKRoute,
          //   token: accessToken,
          //   tokenType: 'Bearer',
          //   body: {
          //     protocol: `trx-04`,
          //     TRAK: {
          //       ...trakTemplate,
          //       trak: {
          //         ...trakTemplate.trak,
          //         spotify: !spotify?.id
          //           ? trakTemplate.trak.spotify?.id
          //           : {id: spotify?.id},
          //         apple_music: !apple_music?.id
          //           ? trakTemplate.trak.apple_music
          //           : {
          //               id: apple_music?.id,
          //             },
          //         soundcloud: !soundcloud?.id
          //           ? trakTemplate.trak.soundcloud
          //           : {
          //               url: soundcloud?.id,
          //             },
          //         youtube: !youtube?.id
          //           ? trakTemplate.trak.youtube
          //           : {url: youtube?.id},
          //       },
          //     },
          //   },
          //   ContentType: 'application/json',
          // });

          // const doc = firestore()
          //   .collection(`fundamentals/BERNIE/requests`)
          //   .where('trak.artist', '==', trakTemplate.trak.artist)
          //   .get();

          // const docId = (await doc).docs[0].id;

          // console.log(
          //   '🚀 ~ file: useTRXFill.ts:94 ~ handleSubmitTRX ~ doc:',
          //   doc,
          // );
          // Promise.resolve(secondaryTRAKResponse)
          //   .then((res: any) => {
          //     const data = res.data;
          //     const {success, trakToken} = data;
          //     console.log(
          //       '🚀 ~ file: useMineToken.ts ~ line 243 ~ Promise.resolve ~ trakToken',
          //       trakToken,
          //     );

          //     setMintLoading(false);
          //     if (success) {
          //       // @ts-ignore
          //       alert('SECONDARY minted');

          //       console.log(
          //         '🚀 ~ file: useTRXFill.ts:110 ~ .then ~ trakTemplate.trak.artist:',
          //         trakTemplate.trak.artist,
          //       );

          //       firestore()
          //         .doc(`fundamentals/BERNIE/requests/${docId}`)
          //         .delete()
          //         .then(() => {
          //           navigation.goBack();
          //         })
          //         .catch(() => navigation.goBack());
          //       // @ts-ignore
          //     } else {
          //       alert('ERROR: Cannot mine secondary TRAK');
          //       setMintLoading(false);
          //     }
          //   })
          //   .catch(err => {
          //     console.log(
          //       '🚀 ~ file: useTRXFill.ts:112 ~ handleSubmitTRX ~ err:',
          //       err,
          //     );
          //     alert('ERROR: Cannot mine secondary TRAK');
          //     setMintLoading(false);
          //   });
          alert('Attemped to mint secondary TRAK - check if spotifyId exists');
          break;
      }
    }
  };

  return {
    missingProviders,
    handleSubmitTRX,
    isPreview,
  };
};
