import React, {useEffect, useState, useContext} from 'react';
import {Platform} from 'react-native';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';
import {
  useFirebase,
  handleAppendSubscription,
  useLITELISTState,
} from '../../app';
import {useAsyncStorage, asyncStorageIndex} from '../../stores';
// import Purchases from 'react-native-purchases';
import {
  initConnection,
  getSubscriptions,
  RequestSubscription,
  requestSubscription,
} from 'react-native-iap';

export const usePaywallModal = ({navigation, route}: any) => {
  console.log('🚀 ~ file: usePayWall.ts ~ line 9 ~ usePayWall ~ route', route);
  const {handleRegister} = useFirebase();
  const {useGET} = useAPI();
  const {handleStore} = useAsyncStorage();
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'}).TRX;

  const [loading, setLoading] = useState<any>(false);
  const [data, setData] = useState<any>([]);

  console.log(
    '🚀 ~ file: usePayWall.ts ~ line 14 ~ usePayWall ~ profile',
    profile,
  );

  useEffect(() => {
    setTimeout(() => {
      const data = [
        // {
        //   id: 'basic',
        //   packageId: ['com.bernie.tlt.trakstar1m'],
        //   title: 'TRAKLIST',
        //   imageURL:
        //     'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man.png?alt=media',
        //   TRAK: {
        //     tier: {
        //       tier1: null,
        //       tier2: 5,
        //       tier3: 15,
        //       tier4: 40,
        //     },
        //     trak: {
        //       track: 45,
        //       artist: 10,
        //       album: 5,
        //     },
        //   },
        //   price: 4.33,
        //   currency: 'GBP',
        // },
        // {
        //   id: 'pro',
        //   title: 'TRAKLIST+',
        //   imageURL:
        //     'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man%402x.png?alt=media',
        //   TRAK: {
        //     tier: {
        //       tier1: null,
        //       tier2: 10,
        //       tier3: 20,
        //       tier4: 60,
        //     },
        //     trak: {
        //       track: 65,
        //       artist: 15,
        //       album: 10,
        //     },
        //   },
        //   price: 9.33,
        //   currency: 'GBP',
        // },
        {
          id: 'musichead',
          packageId: ['com.bernie.tlt.trakstar1m'],
          title: 'TRAKSTAR',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
          TRAK: {
            tier: {
              tier1: 5,
              tier2: 10,
              tier3: 25,
              tier4: 60,
            },
            trak: {
              track: 70,
              artist: 15,
              album: 15,
            },
          },
          features: [
            '- Unlimited recommendations',
            '- Monthly newsletter',
            '- Ad free',
          ],
          price: 3.99,
          currency: 'GBP',
        },
      ];
      setData(data);
    }, 400);
  }, []);

  const handleSubscribe = async ({id, packageId}: any) => {
    setLoading(true);
    console.log(
      '🚀 ~ file: usePayWall.ts ~ line 116 ~ handleSubscribe ~ id',
      id,
    );

    const {...profileObject} = profile;

    const TRXProfile = {
      ...profileObject,
      subscription: id,
    };
    console.log(
      '🚀 ~ file: usePayWall.ts:140 ~ handleSubscribe ~ TRXProfile:',
      TRXProfile,
    );
    switch (id) {
      case 'musichead':
        try {
          await initConnection();
          const subscriptions = await getSubscriptions({
            skus: packageId,
          });
          console.log(
            '🚀 ~ file: usePayWall.ts:125 ~ handleSubscribe ~ subscriptions:',
            subscriptions,
          );
          let requestPayload: any = {sku: packageId}; // for ios
          if (Platform.OS === 'android')
            requestPayload = {
              // maybe we need to set offerToken from values inside selectedSubscription on line 134
              subscriptionOffers: [{sku: packageId, offerToken: ''}],
            };
          console.log({requestPayload});
          const purchase: any = await requestSubscription({
            sku: subscriptions[0].productId,
          })
            .then(async purchase => {
              if (purchase) {
                console.log(
                  '🚀 ~ file: usePayWall.ts:263 ~ handleSubscribe ~ purchase:',
                  purchase,
                );

                await handleRegister({
                  TRXProfile,
                  userPackage: id,
                  purchase,
                }).then(async () => {
                  // userPackage, user_subscribed_at
                  const key = asyncStorageIndex.stacks_keys;
                  handleStore({key: key, value: TRXProfile.stacks_keys});
                });
              }

              return purchase;
            })
            .catch(error => {
              console.log(
                '🚀 ~ file: usePayWall.ts:260 ~ handleSubscribe ~ error:',
                error,
              );
              setLoading(false);
            });
          console.log(
            '🚀 ~ file: usePayWall.ts:263 ~ handleSubscribe ~ purchase:',
            purchase,
          );

          setLoading(false);
          console.log('here 1');
          const transactionReceipt =
            Platform.OS === 'android' ? purchase?.[0] : purchase;
          console.log(
            '🚀 ~ file: usePayWall.ts:147 ~ handleSubscribe ~ transactionReceipt:',
            transactionReceipt,
          );
          console.log(
            '🚀 ~ file: usePayWall.ts ~ line 167 ~ handleSubscribe ~ purchase',
            purchase,
          );
          navigation.goBack();

          // if (typeof purchaserInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
          //   // Unlock that great "pro" content
          // }
        } catch (e) {
          if (!e.userCancelled) {
            showError(e);
          }
          setLoading(false);
        }
        break;
      default:
        alert('Coming soon. Please select MUSICHEAD version in the meantime.');
        setLoading(false);
        break;
    }
  };

  const handleNaviagetEULA = () => {
    navigation.navigate('GENIUS', {
      url: 'https://tsb.media/trakstar/eula',
    });
  };

  const handleNaviagetPrivacyPolicy = () => {
    navigation.navigate('GENIUS', {
      url: 'https://tsb.media/trakstar/privacy',
    });
  };

  return {
    data,
    handleSubscribe,
    loading,
    handleNaviagetEULA,
    handleNaviagetPrivacyPolicy,
  };
};
