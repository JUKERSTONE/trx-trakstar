import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  ImageBackground,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {VHeader} from '../typography';

export const SponsoredPreviewElement = ({
  handleAddItem,
  products,
  handleProduct,
  handleUploadImage,
  handleRemoveProduct,
  handleSubmitMerchandise,
  loadingImage,
  nftPayload,
  handleUploadBannerImage,
  handleSendPlacement,
}: any) => {
  console.log('🚀 ~ file: NFTProduct.tsx:26 ~ nftPayload:', nftPayload);
  console.log('🚀 ~ file: NFTProduct.tsx ~ line 25 ~ products', products);
  return (
    <>
      <Text>Preview</Text>
      <Button title="Finalize" onPress={handleSendPlacement} />
    </>
  );
};
