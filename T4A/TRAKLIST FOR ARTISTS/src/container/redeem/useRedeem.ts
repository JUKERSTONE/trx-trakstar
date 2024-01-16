import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../../app';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {handleNormalizePath, handleStoreAudio} from './handlers';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import uuid from 'react-native-uuid';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useRedeem = ({navigation, route}: any) => {
  const [audioURL, setAudioURL] = useState<any>();
  const [imageURL, setImageURL] = useState<any>();
  const [nftValue, setNFTValue] = useState<any>();
  const [nftCopies, setNFTCopies] = useState<any>({
    stx: 0,
    btc: 0,
    ada: 0,
    sol: 0,
  });
  const [nftType, setNFTType] = useState<any>('classic');
  const [possible, setPossible] = useState<any>({
    btc: null,
    ada: null,
    sol: null,
  });
  const [hasBTC, setHasBTC] = useState<any>(false);
  const [hasSOL, setHasSOL] = useState<any>(false);
  const [hasADA, setHasADA] = useState<any>(false);
  const [loadingAudio, setLoadingAudio] = useState<any>(false);
  const [loadingImage, setLoadingImage] = useState<any>(false);
  const [audioComplete, setAudioComplete] = useState<any>(false);
  const [imageComplete, setImageComplete] = useState<any>(false);
  const [assetName, setAssetName] = useState<any>(null);
  const {useGET, usePOST} = useAPI();

  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: useRedeem.ts:55 ~ useRedeem ~ TRXProfile',
    TRXProfile,
  );
  const userID = TRXProfile.id;
  const trakArtist = TRXProfile.trak_name;
  console.log('🚀 ~ file: useRedeem.ts ~ line 13 ~ useRedeem ~ userID', userID);

  const trakID = uuid.v4();
  const NFTFileName = assetName + '_' + trakID;
  '_' + userID;

  useEffect(() => {
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 64 ~ useRedeem ~ possible',
      possible,
    );
  }, [possible]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 56 ~ useRedeem ~ nftCopies',
      nftCopies,
    );

    if (nftType === 'classic') {
      const possibleBTC = Math.floor(nftCopies['stx'] / 10);
      const possibleSOL = Math.floor(nftCopies['stx'] / 5);
      const possibleADA = Math.floor(nftCopies['stx'] / 5);

      if (possibleSOL > 0) {
        setHasSOL(true);
      } else {
        setHasSOL(false);
      }
      if (possibleADA > 0) {
        setHasADA(true);
      } else {
        setHasADA(false);
      }
      if (possibleBTC > 0) {
        setHasBTC(true);
      } else {
        setHasBTC(false);
      }

      setPossible({btc: possibleBTC, sol: possibleSOL, ada: possibleADA});

      console.log(
        '🚀 ~ file: useRedeem.ts ~ line 59 ~ useEffect ~ possibleBTC',
        possibleBTC,
      );
    }
  }, [nftCopies]);

  const handleUploadAudio = async () => {
    setLoadingAudio(true);
    try {
      const file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [DocumentPicker.types.audio],
      });

      let path = file.uri;
      const normalizedPath: any = handleNormalizePath(path);
      const result = await RNFetchBlob.fs.readFile(normalizedPath, 'base64');

      const upload: any = storage()
        .ref('nft/trx-00/' + NFTFileName + '/audio')
        .putString(result, 'base64', {contentType: 'audio/mp3'});
      await upload.on('state_changed', (snapshot: any) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload ' + progress + '% done');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED:
            console.log('Upload Paused');
            break;
          case storage.TaskState.RUNNING:
            console.log('Upload Running');
            break;
          case storage.TaskState.SUCCESS:
            setLoadingAudio(false);
            setAudioComplete(true);
            upload.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
              console.log('File available at ', downloadURL);
              setAudioURL(downloadURL);
            });
            break;
          case storage.TaskState.ERROR:
            setLoadingAudio(false);
            alert('ERROR : Try again');
        }
      });
    } catch (e) {
      console.log(
        '🚀 ~ file: useRedeem.ts ~ line 72 ~ handleUploadAudio ~ e',
        e,
      );
    }
  };

  const handleUploadImage = async () => {
    setLoadingImage(true);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async image => {
      const imageUri = Platform.OS === 'ios' ? image.path : image.path;
      console.log(
        '🚀 ~ file: useRedeem.ts ~ line 127 ~ handleUploadImage ~ imageUri',
        imageUri,
      );

      if (imageUri == null) {
        return null;
      }

      // const uploadUri: any = imageUri;
      const uploadUri: any =
        Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');

      filename = name + Date.now() + '.' + extension;

      setUploading(true);
      setTransferred(0);

      const upload: any = storage()
        .ref('nft/trx-00/' + NFTFileName + '/image')
        .putFile(uploadUri, {contentType: 'image/jpeg'});

      upload.on(
        'state_changed',
        (snapshot: any) => {
          console.log(
            `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
          );
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          switch (snapshot.state) {
            case storage.TaskState.PAUSED:
              console.log('Upload Paused');
              break;
            case storage.TaskState.RUNNING:
              console.log('Upload Running');
              break;
            case storage.TaskState.SUCCESS:
              upload.snapshot.ref
                .getDownloadURL()
                .then((downloadURL: string) => {
                  console.log('File available at ', downloadURL);
                  setImageURL(downloadURL);
                });
              setLoadingImage(false);
              setImageComplete(true);
              break;
            case storage.TaskState.ERROR:
              setLoadingImage(false);
              alert('ERROR : Try again');
          }
        },
        function (error: any) {
          // Handle unsuccessful uploads
          alert(error);
        },
      );
    });
  };

  const handleNFTCopiesInput = ({market, text}: any) => {
    if (nftType === 'exclusive') {
      if (text <= possible[market]) {
        setNFTCopies({...nftCopies, [market]: Number(text)});
      } else alert("Sumn don't add up son");
      setNFTCopies({...nftCopies, [market]: Number(text)});
    } else {
      if (market === 'stx') {
        setNFTCopies({...nftCopies, [market]: Number(text)});
      } else {
        if (text <= possible[market]) {
          setNFTCopies({...nftCopies, [market]: Number(text)});
        } else alert("Sumn don't add up son");
      }
    }
  };

  const handleNavigateProduct = () => {
    if (
      nftCopies['btc'] > possible['btc'] ||
      nftCopies['ada'] > possible['ada'] ||
      nftCopies['sol'] > possible['sol']
    ) {
      alert('correct your copies');
    } else {
      navigation.navigate('NFT_PRODUCT', {
        userID,
        trakID,
        NFTFileName,
        proof: 'test',
        type: 'track',
        trakIMAGE: imageURL,
        trakAUDIO: audioURL,
        trakIPO: nftValue,
        trakCOPIES: nftCopies,
        trakASSET: assetName,
        title: assetName,
        artist: trakArtist,
        cover_art: imageURL,
      });
    }
  };

  const handleNFTType = ({name}: any) => {
    setNFTType(name);
    if (name == 'exclusive') {
      setPossible({btc: '33'});
    }
  };

  const handleAssetName = (text: string) => {
    setAssetName(text);
  };

  return {
    handleUploadAudio,
    handleUploadImage,
    handleNFTCopiesInput,
    handleNavigateProduct,
    loadingAudio,
    audioComplete,
    loadingImage,
    imageComplete,
    nftCopies,
    hasBTC,
    hasSOL,
    hasADA,
    possible,
    nftType,
    handleNFTType,
    handleAssetName,
  };
};
