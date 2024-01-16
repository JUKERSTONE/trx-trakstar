import { authorize, refresh } from "react-native-app-auth";

import { userContentData } from "./handler";
import { updateRefreshToken } from "../../2.auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { spotifyRefresh } from "../../0.app";
class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: "29dec26a7f304507b4a9d9bcf0ef210b",
      clientSecret: "1d27af3b5c4946c1a411657ca50490d0",
      redirectUrl: "com.trxklist://oauthredirect/",
      scopes: [
        "user-read-private",
        "user-read-email",
        "user-read-playback-state",
        "user-library-modify",
        "user-library-read",
        "streaming",
        "user-read-recently-played",
        "user-follow-modify",
        "user-top-read",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-follow-read",
        "user-modify-playback-state",
      ],
      serviceConfiguration: {
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
      },
    };
  }

  /**
   * Spotify (3rd-Party) Log In Authentication
   * @returns
   */
  async onLogin() {
    try {
      const serilaizedRefreshToken = await AsyncStorage.getItem(
        "spotify_tokens"
      );
      const tokens = JSON.parse(serilaizedRefreshToken);

      const refreshToken = tokens?.refresh_token;

      if (refreshToken) {
        const tokens = await spotifyRefresh(refreshToken);

        const hasAuthenticatedSpotifyUser = await userContentData(tokens);

        const userDetails = {
          product: hasAuthenticatedSpotifyUser.data.product,
          email: hasAuthenticatedSpotifyUser.data.email,
          id: hasAuthenticatedSpotifyUser.data.id,
          playlists: hasAuthenticatedSpotifyUser.data.playlists,
          top_artists: hasAuthenticatedSpotifyUser.data.top_artists,
          top_tracks: hasAuthenticatedSpotifyUser.data.top_tracks,
          recently_played: hasAuthenticatedSpotifyUser.data.recently_played,
        };

        if (hasAuthenticatedSpotifyUser.success === true) {
          const spotify = {
            success: true,
            data: {
              access_token: tokens.access_token,
              access_token_expiry: tokens.access_token_expiry,
              refresh_token: tokens.refresh_token,
              spotifyID: userDetails.id,
              spotifyEmail: userDetails.email,
              product: userDetails.product,
              top_tracks: userDetails.top_tracks,
              top_artists: userDetails.top_artists,
              playlists: userDetails.playlists,
              recently_played: userDetails.recently_played,
            },
          };
          return spotify;
        }
      } else {
        const result = await authorize(this.spotifyAuthConfig);
        const tokens = {
          access_token: result.accessToken,
          access_token_expiry: result.accessTokenExpirationDate,
          refresh_token: result.refreshToken,
        };

        await AsyncStorage.setItem("spotify_tokens", JSON.stringify(tokens));

        const hasAuthenticatedSpotifyUser = await userContentData(tokens);

        const userDetails = {
          product: hasAuthenticatedSpotifyUser.data.product,
          email: hasAuthenticatedSpotifyUser.data.email,
          id: hasAuthenticatedSpotifyUser.data.id,
          playlists: hasAuthenticatedSpotifyUser.data.playlists,
          top_artists: hasAuthenticatedSpotifyUser.data.top_artists,
          top_tracks: hasAuthenticatedSpotifyUser.data.top_tracks,
          recently_played: hasAuthenticatedSpotifyUser.data.recently_played,
        };

        if (hasAuthenticatedSpotifyUser.success === true) {
          const spotify = {
            success: true,
            data: {
              access_token: tokens.access_token,
              access_token_expiry: tokens.access_token_expiry,
              refresh_token: tokens.refreshToken,
              spotifyID: userDetails.id,
              spotifyEmail: userDetails.email,
              product: userDetails.product,
              top_tracks: userDetails.top_tracks,
              top_artists: userDetails.top_artists,
              playlists: userDetails.playlists,
              recently_played: userDetails.recently_played,
            },
          };
          return spotify;
        }
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      return {
        success: false,
        data: {
          access_token: null,
          access_token_expiry: null,
          refresh_token: null,
          spotifyID: null,
          spotifyEmail: null,
          product: null,
          top_tracks: null,
          top_artists: null,
          playlists: null,
          recently_played: null,
        },
      };
    }
  }

  /**
   * Spotify (3rd-Party) Refresh Token Authentication
   * @param {*} refreshToken
   * @returns
   */
  async refreshLogin(refreshToken, traklistToken) {
    console.log(
      "🚀 ~ file: spotify.js ~ line 103 ~ AuthenticationHandler ~ refreshLogin ~ refreshToken",
      refreshToken
    );
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    console.log(
      "🚀 ~ file: spotify.js ~ line 106 ~ AuthenticationHandler ~ refreshLogin ~ result",
      result
    );

    const tokens = {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      access_token_expiry: result.accessTokenExpirationDate,
    };
    const hasUpdatedRefreshToken = await updateRefreshToken(
      traklistToken,
      tokens.refresh_token
    );

    const hasAuthenticatedSpotifyUser = await userContentData(tokens);

    const userDetails = {
      product: hasAuthenticatedSpotifyUser.data.product,
      email: hasAuthenticatedSpotifyUser.data.email,
      id: hasAuthenticatedSpotifyUser.data.id,
      playlists: hasAuthenticatedSpotifyUser.data.playlists,
      top_artists: hasAuthenticatedSpotifyUser.data.top_artists,
      top_tracks: hasAuthenticatedSpotifyUser.data.top_tracks,
      recently_played: hasAuthenticatedSpotifyUser.data.recently_played,
    };

    if (hasAuthenticatedSpotifyUser.success === true) {
      const spotify = {
        success: true,
        data: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          access_token_expiry: tokens.access_token_expiry,
          spotifyID: userDetails.id,
          spotifyEmail: userDetails.email,
          product: userDetails.product,
          top_tracks: userDetails.top_tracks,
          top_artists: userDetails.top_artists,
          playlists: userDetails.playlists,
          recently_played: userDetails.recently_played,
        },
      };
      return spotify;
    } else {
      return {
        success: false,
        data: {
          access_token: null,
          access_token_expiry: null,
          refresh_token: null,
          spotifyID: null,
          spotifyEmail: null,
          product: null,
          top_tracks: null,
          top_artists: null,
          playlists: null,
          recently_played: null,
        },
      };
    }
  }
}

export const authHandler = new AuthenticationHandler();

export const SPOTIFY_ACCOUNTS_KEY =
  "29dec26a7f304507b4a9d9bcf0ef210b:1d27af3b5c4946c1a411657ca50490d0";
