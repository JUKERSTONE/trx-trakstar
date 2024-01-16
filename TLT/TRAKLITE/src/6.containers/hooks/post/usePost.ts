import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {
  LIKE_POST_ROUTE,
  UNLIKE_POST_ROUTE,
  SAVE_POST_ROUTE,
  UNSAVE_POST_ROUTE,
  SPOTIFY_TRACKS,
  USER,
  SPOTIFY_DELETE_TRACKS,
  GET_ANY_USER_ROUTE,
} from '../../../1.api';
import {useProvider, store} from '../../../3.stores';
import * as actions from '../../../3.stores';
import Share from 'react-native-share';
import moment from 'moment';
import {authHandler} from '../../../2.auth';

export const usePost = (navigation: any, item: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState([]);
  const {state} = useContext(useProvider);
  const [avatar, setAvatar] = useState('');
  const [lines, setLines] = useState(2);

  useEffect(() => {
    // get auth user and set isLiked
    axios
      .get(USER, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys?.traklist?.access_token,
        },
      })
      .then(response => {
        response.data.likes.map((like: any, index: number) => {
          if (like.postID === item.id) {
            setIsLiked(true);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleLike = async () => {
    // if not logged in, give notice
    if (!state.loggedIn) navigation.navigate('START', {screen: 'REGISTER.'});

    if (isLiked) {
      setIsLiked(false);
      axios
        .get(UNLIKE_POST_ROUTE(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.traklist.access_token,
          },
        })
        .then(response => {})
        .catch(err => {
          setIsLiked(true);
        });
    } else {
      setIsLiked(true);
      axios
        .get(LIKE_POST_ROUTE(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + state.keys.traklist.access_token,
          },
        })
        .then(response => {})
        .catch(err => {
          setIsLiked(false);
          console.log(err);
        });
    }
  };
  const handleSave = async () => {
    // if not logged in, give notice
    if (!state.loggedIn) {
      navigation.navigate('START', {screen: 'REGISTER.'});
    } else {
      if (isSaved) {
        setIsSaved(false);

        if (moment(store.getState()?.keys?.spotify?.expires).isAfter()) {
          // be careful of traklist expiration
          alert('spotify sesh expired');
          const spotify = await authHandler.refreshLogin(
            state.keys.spotify.refresh_token,
            state.kets.traklist.access_token,
          );
          console.log(
            '🚀 ~ file: usePost.ts ~ line 94 ~ handleSave ~ spotify',
            spotify,
          );

          const tokens = {
            access_token: spotify.data.access_token,
            expires: moment(spotify?.data.access_token_expiry).format('LTS'),
          };

          store.dispatch(
            actions.SET_SPOTIFY_ACCESS_TOKEN(
              'set spotify user access token.',
              tokens,
            ),
          );

          // persist access token
        }
        axios
          .delete(SPOTIFY_DELETE_TRACKS(item.sId), {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.access_token,
            },
          })
          .then(response => {
            axios
              .get(UNSAVE_POST_ROUTE(item.id), {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + state.keys.traklist.access_token,
                },
              })
              .then(response => {})
              .catch(err => {
                setIsSaved(true);
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err, ' - track not saved');
          });
      } else {
        setIsSaved(true);

        //
        axios
          .put(SPOTIFY_TRACKS('save', item.sId), [item.sId], {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + state.keys.spotify.access_token,
            },
          })
          .then(response => {
            axios
              .get(SAVE_POST_ROUTE(item.id), {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + state.keys.traklist.access_token,
                },
              })
              .then(res => {})
              .catch(err => {
                setIsSaved(false);
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err, ' - track not saved');
          });
      }
    }
  };

  const handleComment = () => {
    alert('feature available in the next release!');
  };

  const handleShare = () => {
    const options = {
      title: 'TRAKLIST',
      message:
        "TRAKLIST | Have you heard '" +
        item.title +
        "' by " +
        item.artist +
        '? Discover this and much more on TRAKLIST.',
      url: 'www.example.com',
    };

    Share.open(options)
      .then(res => {})
      .catch(err => {
        err && console.log(err);
      });
  };

  const handleUserNavigation = (username: string) => {
    axios
      .get(GET_ANY_USER_ROUTE(username), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + state.keys.traklist.access_token,
        },
      })
      .then(response => {
        navigation.navigate('PROFILE', {
          screen: 'UserProfile',
          params: {
            userDetails: response.data.users[0],
          },
        });
      });
  };

  const handleImagePress = (info: any) => {
    store.dispatch(actions.SET_PLAYER('set player.', info));
  };

  return {
    handleLike,
    isLiked,
    handleSave,
    isSaved,
    handleComment,
    handleShare,
    handleUserNavigation,
    handleImagePress,
    state,
    avatar,
    setAvatar,
    lines,
    setLines,
  };
};
