import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, Alert} from 'react-native';
import {useTRAKLISTState} from '../../app';
import {VHeader, Body} from '..';
import {FamzViewContainer, WalletExchangeContainer} from '../../containers';
import {ExchangeViewBodyComponent} from '../../components';

export const ExchangeView = ({state, mode, item, ...props}: any) => {
  console.log(
    '🚀 ~ file: ExchangeView.tsx ~ line 9 ~ ExchangeView ~ props',
    props,
  );

  const isNFT = item?.isNFT;

  let cover_art, title: any, artist: any, id: any, uri: any, price: any;

  switch (isNFT) {
    case true:
      cover_art = item?.nft.trakIMAGE;
      title = item?.nft.trakTITLE;
      artist = item?.nft.trakARTIST;
      id = item?.nftID;
      uri = item?.nftURI;
      price = item?.nft.trakPRICE;
      break;
    case false:
      cover_art = item?.cover_art;
      title = item?.title;
      artist = item?.artist;
      id = item?.trakID;
      uri = item?.trakURI;
      break;
  }

  const {handleGetState} = useTRAKLISTState();
  const [wallet, setWallet] = useState();
  const [trak, setTRAK] = useState();
  useEffect(() => {
    const profile: any = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    const wallet = TRXProfile.wallet;
    const trak = wallet.trak;

    const trakWallet = trak?.map((item: any) => ({
      value: item.isNFT ? item.nft.trakTITLE : item.title,
      key: item.isNFT ? `NFT:${item.nftID}` : `TRX:${item.trakID}`,
    }));

    setWallet(trakWallet);
    setTRAK(trak);
  }, []);

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            margin: 10,
          }}>
          <View
            style={{
              height: 80,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'flex-end',
                marginRight: 20,
                flex: 1,
              }}>
              <Image
                source={{uri: cover_art}}
                style={{
                  backgroundColor: '#1B4F26',
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                marginRight: 25,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '60%',
              }}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={title}
              />
              <Body
                numberOfLines={1}
                type="one"
                color={'#fff'}
                text={artist}
                textAlign="right"
              />
              {/* <Body
                numberOfLines={1}
                type="one"
                color={'#fff'}
                text={price.toFixed(2) + ' TRX'}
                textAlign="right"
              /> */}
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: '#1a1a1a',
        }}>
        <ExchangeViewBodyComponent
          mode={mode}
          isNFT={isNFT}
          wallet={wallet}
          trak={trak}
          item={item}
          title={title}
          artist={artist}
          id={id}
          {...props}
        />
      </View>
    </View>
  );
};
