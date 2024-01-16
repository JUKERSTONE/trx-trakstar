import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LottieView from 'lottie-react-native';
import {VHeader, Body, LandingHeader} from '..';
import {CollectionsContainer} from '../../containers';

export const LandingTrendingElement = ({data, handleTRAK}: any) => {
  console.log(
    '🚀 ~ file: LandingTRX01.tsx:23 ~ LandingTRX01Element ~ data:',
    data,
  );

  return (
    <View style={{alignItems: 'center', flex: 1, padding: 20}}>
      <CollectionsContainer
        data={data}
        height={80}
        itemWidth={90}
        headerText="TRX TRENDS"
        headerIcon={'trending-up'}
        onPress={handleTRAK}
      />
    </View>
  );
};
