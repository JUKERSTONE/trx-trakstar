import {validate} from '@babel/types';
import React, {useEffect, useState, useContext} from 'react';
import {useT4AState} from '../..';
import {api, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {handleAppendTRAK} from '../../app/firebase/hooks/appendTRAK';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useNFTProduct = ({navigation, route}: any) => {
  const {usePOST} = useAPI();
  const nftPayload = route.params;
  console.log(
    '🚀 ~ file: useNFTProduct.ts ~ line 11 ~ useNFTProduct ~ nftPayload',
    nftPayload,
  );

  const {TRX} = useSelector((state: any) => state.profile);
  console.log('🚀 ~ file: useNFTProduct.ts:25 ~ useNFTProduct ~ TRX:', TRX);
  const userId = TRX?.id;

  const [value, setValue] = useState(0);
  const [loadingImage, setLoadingImage] = useState<any>(false);
  const [imageURL, setImageURL] = useState<any>();
  const [banner, setBanner] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([
    {
      type: 'merchandise',
      image: '',
    },
  ]);

  const handleAddItem = () => {
    const item = {
      image: '',
      type: 'merchandise',
    };
    setProducts([...products, item]);
  };

  const handleProduct = ({name, text, index}: any) => {
    const array = products;
    const oldItem = array[--index];
    console.log(
      '🚀 ~ file: useNFTProduct.ts ~ line 45 ~ handleProduct ~ oldItem',
      oldItem,
    );

    switch (name) {
      case 'media':
        const mediaItem = {...oldItem, type: name};
        array.splice(--index, 1, mediaItem);
        break;
      case 'tickets':
        const ticketsItem = {...oldItem, type: name};
        array.splice(--index, 1, ticketsItem);
        break;
      case 'merchandise':
        const merchItem = {...oldItem, type: name};
        array.splice(--index, 1, merchItem);
        break;
      default:
        const defaultItem = {...oldItem, [name]: text};
        array.splice(--index, 1, defaultItem);
        break;
    }
    setProducts([...array]);
  };

  const handleRemoveProduct = ({index}: any) => {
    const newArr = products;
    newArr.splice(index, 1);

    setProducts([...newArr]);
  };

  const handleSubmitMerchandise = async () => {
    navigation.navigate('Sponsored_Form_5', {
      ...nftPayload,
      uploads: {trademarks: products, banner},
    });
  };

  const handleUploadImage = ({index}: any) => {
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

      // setUploading(true);
      // setTransferred(0);

      const NFTFileName =
        nftPayload.settings['campaign-name'] + '_' + uuid.v4();

      const upload: any = storage()
        .ref('trademarks/' + NFTFileName)
        .putFile(uploadUri, {contentType: 'image/jpeg'});

      upload.on(
        'state_changed',
        (snapshot: any) => {
          console.log(
            `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
          );
          // setTransferred(
          //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );

          switch (snapshot.state) {
            case storage.TaskState.PAUSED:
              console.log('Upload Paused');
              break;
            case storage.TaskState.RUNNING:
              console.log('Upload Running');
              break;
            case storage.TaskState.SUCCESS:
              setLoadingImage(false);
              upload.snapshot.ref
                .getDownloadURL()
                .then((downloadURL: string) => {
                  console.log('File available at ', downloadURL);
                  // setImageURL(downloadURL);

                  //
                  const array = products;
                  const oldItem = array[index];
                  const defaultItem = {...oldItem, image: downloadURL};
                  array.splice(index, 1, defaultItem);
                  setProducts([...array]);
                  console.log(
                    '🚀 ~ file: useNFTProduct.ts ~ line 189 ~ .then ~ defaultItem',
                    defaultItem,
                  );
                });
              break;
            case storage.TaskState.ERROR:
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

  const handleUploadBannerImage = () => {
    console.log(
      '🚀 ~ file: useNFTProduct.ts:209 ~ handleUploadBannerImage ~ nftPayload:',
      nftPayload,
    );
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

      // setUploading(true);
      // setTransferred(0);

      const bannerName = nftPayload.settings['campaign-name'] + '_' + userId;

      const upload: any = storage()
        .ref('banners/' + bannerName)
        .putFile(uploadUri, {contentType: 'image/jpeg'});

      upload.on(
        'state_changed',
        (snapshot: any) => {
          console.log(
            `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
          );
          // setTransferred(
          //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );

          switch (snapshot.state) {
            case storage.TaskState.PAUSED:
              console.log('Upload Paused');
              break;
            case storage.TaskState.RUNNING:
              console.log('Upload Running');
              break;
            case storage.TaskState.SUCCESS:
              setLoadingImage(false);
              upload.snapshot.ref
                .getDownloadURL()
                .then((downloadURL: string) => {
                  console.log('File available at ', downloadURL);

                  setBanner(downloadURL);
                });
              break;
            case storage.TaskState.ERROR:
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

  return {
    handleAddItem,
    products,
    handleProduct,
    handleRemoveProduct,
    handleSubmitMerchandise,
    handleUploadImage,
    loadingImage,
    nftPayload,
    handleUploadBannerImage,
    banner,
  };
};
