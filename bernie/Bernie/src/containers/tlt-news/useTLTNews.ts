import React, {useEffect, useState, useContext} from 'react';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {routes, useAPI} from '../../api';
import {useBERNIEState} from '../../app';
import axios from 'axios';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

const {POST, GET} = useAPI();

export const useTLTNews = ({navigation, ...props}: any) => {
  const [news, setNews] = useState<any>([
    {
      source: '',
      thumbnail: '',
      title: '',
      url: '',
    },
  ]);
  const [loadingImage, setLoadingImage] = useState<any>(false);

  useEffect(() => {
    handleGetTrends();
  }, []);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 40 ~ useTLTTrending ~ trending',
      news,
    );
  }, [news]);

  const handleGetTrends = async () => {
    const route = routes.traklist({method: 'news'});
    const news: any = await GET({
      route,
    });

    const newsTrends = news.data.news;

    console.log(
      '🚀 ~ file: useTLTNews.ts ~ line 46 ~ handleGetTrends ~ newsTrends',
      newsTrends,
    );

    setNews(newsTrends);
  };

  const handleAddItem = () => {
    setNews([
      ...news,
      {
        source: '',
        thumbnail: '',
        title: '',
        url: '',
      },
    ]);
  };

  const handleSubmit = async () => {
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 78 ~ handleSubmit ~ trending',
      news,
    );
    const route: any = routes.traklist({method: 'news'});

    // alert(route);

    const body = {
      data: news,
    };
    console.log(
      '🚀 ~ file: useTLTNews.ts ~ line 72 ~ handleSubmit ~ body',
      body,
    );

    axios
      .post(
        'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST/traklite/admin/news',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        },
      )
      .then((response: any) => {
        console.log(
          '🚀 ~ file: useTLTTrending.ts ~ line 106 ~ .then ~ response',
          response,
        );
        //
        //

        navigation.navigate('ADMIN_DASHBOARD');
      })
      .catch(error => {
        console.log(
          '🚀 ~ file: useTLTTrending.ts ~ line 105 ~ handleSubmit ~ error',
          error,
        );
        //
      });
  };

  const handleTrending = ({name, text, index}: any) => {
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 97 ~ handleTrending ~ name, text, index',
      name,
      text,
      index,
    );

    const array = news;
    const oldItem = array[index];
    console.log(
      '🚀 ~ file: useNFTProduct.ts ~ line 45 ~ handleProduct ~ oldItem',
      oldItem,
    );

    const defaultItem = {...oldItem, [name]: text};
    array.splice(index, 1, defaultItem);

    console.log(
      '🚀 ~ file: useTLTnews.ts ~ line 112 ~ handleTrending ~ trending',
      news,
      array,
    );

    setNews([...array]);
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

      const NFTFileName = `'TRAKMAG:TRENDS-${index}'`;
      console.log(
        '🚀 ~ file: useNFTProduct.ts ~ line 150 ~ handleUploadImage ~ NFTFileName',
        NFTFileName,
      );

      const upload: any = storage()
        .ref('trakmag/trx-00/news' + NFTFileName)
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
                  // alert(index);
                  const array = news;
                  const oldItem = array[index];
                  const defaultItem = {...oldItem, thumbnail: downloadURL};
                  array.splice(index, 1, defaultItem);
                  setNews([...array]);
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

  return {
    news,
    handleSubmit,
    handleAddItem,
    handleTrending,
    handleUploadImage,
  };
};
