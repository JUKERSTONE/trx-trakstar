// @ts-ignore
import AppleMusic from "@bouncyapp/react-native-apple-music";

export const signInWithAppleMusic = async () => {
  const playlists = await AppleMusic.getUserPlaylists();
  const recents = await AppleMusic.recentPlayed();
  const heavyRotation = await AppleMusic.getHeavyRotation();
  const recommendations = await AppleMusic.getRecommendations();

  if (recommendations.length == 0) {
    return {
      data: [],
      success: false,
    };
  }

  return {
    data: {
      services: {
        apple_music: {
          playlists,
          recents,
          heavyRotation,
          recommendations,
        },
      },
    },
    success: true,
  };
};
