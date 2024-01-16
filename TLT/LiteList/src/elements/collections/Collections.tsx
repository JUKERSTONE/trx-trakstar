import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {Caption, VHeader} from '../typography';
import {ActivityIndicator} from 'react-native-paper';

export const CollectionsElement = ({
  data = ['data', 'fee', 'ferwfer'],
  headerText = 'Explore TRAKSTAR collections...',
  height = 200,
  itemWidth = 200,
  onPress,
  startIndex = 2,
  headerIcon,
}: any) => {
  const {width} = useWindowDimensions();

  const _renderItem = ({item, index}: any) => (
    <Pressable onPress={() => onPress(item)}>
      <Image
        source={{uri: item.uri}}
        style={{
          backgroundColor: '#1db954',
          height,
          borderRadius: 10,
          flex: 1,
        }}
      />
      <Caption
        numberOfLines={2}
        type="two"
        color={'#fff'}
        text={item.captionTop}
      />
      <Caption
        numberOfLines={2}
        type="two"
        color={'#fff'}
        text={item.captionBottom}
      />
    </Pressable>
  );

  if (!data || !data.length) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <View style={{padding: 0}}>
      <View
        style={{
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flexDirection: 'row',
          marginLeft: 20,
        }}>
        <View
          style={{
            marginRight: 10,
            // backgroundColor: '#1db954',
            borderRadius: 20,
            padding: 4,
          }}>
          <MaterialCommunityIcons name={headerIcon} size={18} color={'#FFF'} />
        </View>
        <VHeader type="five" color="#FFF" text={headerText} />
      </View>

      <Carousel
        // layout={'stack'}
        // layoutCardOffset={0}
        // data={data}
        data={data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={itemWidth}
        firstItem={startIndex}
      />
    </View>
  );
};
