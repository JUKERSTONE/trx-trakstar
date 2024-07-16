import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {
  initConnection,
  getSubscriptions,
  RequestSubscription,
  requestSubscription,
} from 'react-native-iap';

interface TSwipeCard {
  // card: any;
  handleNavigateTrack: any;
  recommendation: any;
  recommendations: any;
  index: any;
  handleSetPlayer: any;
  size: any;
  handleLoadRecommendations: any;
  handleNavigationPaywall: any;
}

export const SwipeCard: React.FC<TSwipeCard> = ({
  // card,
  recommendation,
  recommendations,
  index,
  handleSetPlayer,
  size,
  handleLoadRecommendations,
  handleNavigationPaywall,
  // handleNavigateTrack,
}) => {
  const player = useSelector((state: any) => state.player);
  const profile = useSelector((state: any) => state.profile.TRX);
  const [loading, setLoading] = useState(true);

  console.log(
    '🚀 ~ file: SwipeCard.tsx ~ line 34 ~ recommendations',
    recommendations,
  );
  useEffect(() => {
    if (index > size - 4) {
      if (profile.userPackage) {
        handleLoadRecommendations();
      } else
        Alert.alert(
          `Upgrade to MUSICHEAD subscription`,
          `Upgrade to find more music...`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Upgrade',
              onPress: async () => {
                await handleNavigationPaywall();
              },
            },
          ],
        );
    }
  }, [index]);

  const [cardIndex, setCardIndex] = useState(0);

  const card = recommendations[index === 0 ? 0 : index - 1];
  console.log('🚀 ~ file: SwipeCard.tsx ~ line 40 ~ card', card);
  if (card) {
    // handleSetPlayer(card);

    return (
      <Animatable.View animation={'bounceIn'}>
        <ImageBackground
          source={{
            uri: !player.hidden
              ? player?.players?.spotify?.item?.album?.images[0]?.url
              : recommendations[index].cover_art,
          }}
          style={{
            height: 300,
            margin: 30,
            justifyContent: 'flex-end',
            backgroundColor: '#cecece',
            borderRadius: 25,
          }}
          imageStyle={{
            borderRadius: 25,
          }}>
          <View
            style={{
              height: 60,
              backgroundColor: '#fff',
              padding: 5,
              opacity: 0.9,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
              marginBottom: 7,
              marginRight: 7,
            }}>
            <Image
              style={{height: 50, width: 50, borderRadius: 15}}
              source={{
                uri:
                  player?.players?.spotify?.item && !player.hidden
                    ? recommendations[index].cover_art
                    : recommendations[index].artist_art,
              }}
            />
          </View>
        </ImageBackground>
      </Animatable.View>
    );
  } else return <ActivityIndicator size="large" color="#1a1a1a" />;
};

const styles = StyleSheet.create({
  container: {},
  card: {
    height: 280,
    width: 280,
    // borderRadius: 25,
    // marginTop: 20,
  },
});
