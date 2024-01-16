import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';
import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;
export const useAddMerchandise = ({navigation, route}: any) => {
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageURL, setImageURL] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [copies, setCopies] = useState<any>();
  const [title, setTitle] = useState<any>();
  const {usePOST} = useAPI();
  const item = route.params;

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userID = TRXProfile.id;
  const minterID = profile.firebase.uid;
  const NFTFileName =
    item.nft.trakARTIST + '_' + item.nft.trakTITLE + '_' + userID;
  console.log(
    '🚀 ~ file: useAddMerchandise.ts ~ line 23 ~ useAddMerchandise ~ NFTFileName',
    NFTFileName,
  );

  const handleAddMerchandise = async () => {
    console.log(
      '🚀 ~ file: useAddMerchandise.ts ~ line 11 ~ handleAddMerchandise ~ item',
      item,
    );
    const payload = {
      minterID,
      nftID: item.nftID,
      title,
      price,
      thumbnail: imageURL,
      copies,
      proof: 'proof',
    };
    console.log(
      '🚀 ~ file: useAddMerchandise.ts ~ line 38 ~ handleAddMerchandise ~ payload',
      payload,
    );
    const route = api.bernie({
      method: 'add_merchandise',
    });
    const response = await usePOST({route, payload, token: accessToken});
    console.log(
      '🚀 ~ file: useAddMerchandise.ts ~ line 21 ~ handleAddMerchandise ~ response',
      response,
    );
  };

  const handleUploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;

      if (imageUri == null) {
        return null;
      }

      const uploadUri: any = imageUri;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');

      filename = name + Date.now() + '.' + extension;

      setUploading(true);
      setTransferred(0);

      const upload: any = storage()
        .ref('nft/trx-00/' + NFTFileName + '/merchandise/item1')
        .putFile(uploadUri, {contentType: 'image/jpeg'});

      upload.on('state_changed', (snapshot: any) => {
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
            upload.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
              console.log('File available at ', downloadURL);
              setImageURL(downloadURL);
            });
            break;
          case storage.TaskState.ERROR:
            alert('ERROR : Try again');
        }
      });
    });
  };
  const handleMerchandiseValueInput = (text: string) => {
    console.log(
      '🚀 ~ file: useAddMerchandise.ts ~ line 107 ~ handleMerchandiseValueInput ~ text',
      text,
    );
    setPrice(text);
  };
  const handleMerchandiseCopiesInput = (text: string) => {
    setCopies(text);
  };
  const handleMerchandiseTitleInput = (text: string) => {
    setTitle(text);
  };

  return {
    item,
    handleAddMerchandise,
    handleUploadImage,
    handleMerchandiseValueInput,
    handleMerchandiseCopiesInput,
    handleMerchandiseTitleInput,
  };
};
