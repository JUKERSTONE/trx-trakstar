import {createSlice} from '@reduxjs/toolkit';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {action} from 'mobx';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    queue: [],
    index: 0,
    paused: true,
    muted: false,
    repeat: false,
    source: {},
    image: {},
    artist: '',
    title: '',
    chatURI: '',
    hidden: true, //playerType
    isFeed: false,
    id: {
      spotify: '',
      apple_music: '',
    },
    isrc: null,
    isMMS: false,
    service: 'traklist',
    device: null,
    players: {
      spotify: null,
      apple_music: null,
      youtube: {
        paused: true,
        geniusId: null,
      },
      local: {
        paused: true,
        path: null,
        title: null,
        artist: null,
        cover_art: null,
        uri: null,
      },
    },
    feedTrack: null,
    youtubeId: null,
    youtubeMinimize: true,
    isTraklist: false,
    traklistIndex: 0,
    traklist: null,
    isPrimaryPlayer: true,
    youtubeLoop: false,
  },
  reducers: {
    setYoutubeLoop: (state, action) => {
      state.youtubeLoop = !state.youtubeLoop;
    },
    setPiPPlayer: (state, action) => {
      const isPrimaryPlayer = action.payload;
      state.isPrimaryPlayer = isPrimaryPlayer;
    },
    setTraklistNext: (state: any, action) => {
      if (state.youtubeId && state.traklist) {
        if (state.traklistIndex !== state.traklist.length - 1)
          state.traklistIndex = state.traklistIndex + 1;
        const trak = state.traklist[state.traklistIndex];
        console.log('🚀 ~ file: player.ts:53 ~ trak:', trak);
        switch (trak.service.provider) {
          case 'youtube':
            state.isrc = null;
            state.youtubeId = trak.service.url;
            state.players.youtube = {...trak.player, paused: false};
            break;
          default:
            break;
        }

        if (state.traklistIndex === state.traklist.length - 1) {
          state.youtubeId = null;
          state.players.youtube = {paused: true};
          state.isTraklist = null;
          state.traklist = null;
        }
      } else {
        const nextIndex = state.index + 1;
        console.log('🚀 ~ file: player.ts ~ line 90 ~ newIndex', nextIndex);
        const nextTrak = state.queue[nextIndex];
        console.log('🚀 ~ file: player.ts:197 ~ nextTrak:', nextTrak);
        // console.log('🚀 ~ file: player.ts ~ line 91 ~ traklist', traklist);

        if (nextTrak) {
          state.source = {uri: nextTrak.web.spotify.preview};
          state.image = {uri: nextTrak.cover_art};
          state.artist = nextTrak.artist;
          state.title = nextTrak.title;
          state.id = nextTrak.web.spotify.id;
          state.index = nextIndex;
          state.service = 'traklist';
          state.device = null;
          state.isrc = nextTrak.isrc;
        } else state.index = state.index + 1;

        state.players.youtube.paused = state.paused;
        state.youtubeId = null;
      }
    },
    setTraklist: (state, action) => {
      const {traklist, activeIndex} = action.payload;
      state.traklistIndex = activeIndex ?? 0;
      console.log('🚀 ~ file: player.ts:47 ~ media:', traklist);
      state.isTraklist = true;
      state.traklist = traklist;

      const trak = traklist[state.traklistIndex];
      console.log('🚀 ~ file: player.ts:53 ~ trak:', trak);
      switch (trak.service.provider) {
        case 'youtube':
          state.isrc = null;
          state.youtubeId = trak.service.url;
          state.players.youtube = {...trak.player, paused: false};
          break;
        default:
      }
    },
    setYotubeTogglePause: (state, action) => {
      if (state.youtubeId)
        state.players.youtube.paused = !state.players.youtube.paused;
      else if (state.players.local.path) {
        state.players.local.paused = !state.players.local.paused;
      } else {
        state.paused = !state.paused;
        Toast.show({
          type: 'info',
          text1: 'TRY TRAKSTAR™ - BROWSE THE M3DIA SHOP!',
          text2: `Previewing '${state.title}' by ${state.artist}.`,
        });
      }
    },
    setYoutubeOff: (state, action) => {
      state.youtubeId = null;
      state.players.youtube.geniusId = null;
      state.players.local.path = null;
    },
    setYoutubeId: (state, action) => {
      const {youtubeId, player} = action.payload;

      state.players.local.path = null;
      state.youtubeId = youtubeId;
      state.youtubeMinimize = true;
      state.players.youtube = player;
    },
    handleMediaPlayerAction: (state: any, action) => {
      const {
        playbackState,
        uri,
        url,
        artist,
        title,
        chatURI,
        id,
        isMMS,
        repeat,
        imageBase64,
        isrc,
      } = action.payload;

      switch (playbackState) {
        case 'pause':
          state.paused = !state.paused;
          break;
        case 'pause:force':
          state.paused = true;
          state.isrc = null;
          break;
        case 'pause:force:off':
          state.paused = false;
          break;
        case 'mute':
          state.muted = !state.muted;
          break;
        case 'repeat':
          state.repeat = !state.repeat;
          Toast.show({
            type: 'info',
            text1: state.repeat
              ? 'TRAKLIST is looping...'
              : 'TRAKLIST in queue...',
            text2: state.repeat
              ? 'UP NEXT : ' + state.artist + ' - ' + state.title
              : 'UP NEXT : ' +
                state.queue[state.index + 1].artist +
                ' - ' +
                state.queue[state.index + 1].title,
          });
          break;
        case 'repeat:force':
          state.repeat = true;
          break;
        case 'repeat:force:off':
          state.repeat = false;

          break;
        case 'toggle-view':
          const isAppleMusic = state.players.apple_music;
          const isSpotify = state.players.spotify;

          state.hidden = !state.hidden;
          break;
        case 'chat-uri':
          state.chatURI = chatURI;
          state.isMMS = isMMS;
          break;
        case 'sent':
          state.isMMS = isMMS;
          state.repeat = false;
          break;
        case 'source':
          state.source = {uri};
          state.paused = false;
          state.image = {uri: url};
          state.artist = artist;
          state.title = title;
          state.id = id;
          state.service = 'traklist';
          state.isrc = isrc;
          state.players.local.path = null;
          state.youtubeId = null;
          // state.queue.splice(state.index, 1, { QUEUING
          //   artist,
          //   artist_art: url,
          //   cover_art: url,
          //   // isrc: '',
          //   // player: '',
          //   title,
          //   // web: {},
          // });
          break;
        case 'view-only':
          state.image = {uri: url};
          state.artist = artist;
          state.title = title;
          state.id = id;
          state.service = 'youtube';
          state.isrc = null;
          // state.queue.splice(state.index, 1, { QUEUING
          //   artist,
          //   artist_art: url,
          //   cover_art: url,
          //   // isrc: '',
          //   // player: '',
          //   title,
          //   // web: {},
          // });
          break;
        case 'share':
          const options: any = {
            title: 'TRAKLITE',
            message:
              "TRAKLIST | Have you heard '" +
              state.title +
              "' by " +
              state.artist +
              '?\n Discover this and much more on TRAKSTAR.\n',
            urls: [
              `data:image/png;base64,${imageBase64}`,
              'https://apps.apple.com/gb/app/trakstar/id1636470089',
            ],
          };
          Share.open(options)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              err && console.log(err);
            });

          break;
      }
    },
    handleQueueControlsAction: (state, action) => {
      const {playbackState, uri, url, artist, title, chatURI, id, isMMS} =
        action.payload;

      const traklist = state.queue;
      console.log('🚀 ~ file: player.ts:191 ~ traklist:', traklist);

      switch (playbackState) {
        case 'next':
          const nextIndex = state.index + 1;
          console.log('🚀 ~ file: player.ts ~ line 90 ~ newIndex', nextIndex);
          const nextTrak = traklist[nextIndex];
          console.log('🚀 ~ file: player.ts:197 ~ nextTrak:', nextTrak);
          console.log('🚀 ~ file: player.ts ~ line 91 ~ traklist', traklist);

          if (nextTrak) {
            state.source = {uri: nextTrak.web.spotify.preview};
            // state.paused = false;
            state.image = {uri: nextTrak.cover_art};
            state.artist = nextTrak.artist;
            state.title = nextTrak.title;
            state.id = nextTrak.web.spotify.id;
            state.index = nextIndex;
            state.service = 'traklist';
            state.device = null;
            state.isrc = nextTrak.isrc;
          } else state.index = state.index + 1;
          break;
        case 'back':
          const previousIndex = state.index - 1;
          console.log(
            '🚀 ~ file: player.ts ~ line 90 ~ newIndex',
            previousIndex,
          );
          const previousTrak = traklist[previousIndex];
          console.log('🚀 ~ file: player.ts ~ line 91 ~ traklist', traklist);

          state.paused = false;
          state.source = {uri: previousTrak.web.spotify.preview};
          state.paused = false;
          state.image = {uri: previousTrak.cover_art};
          state.artist = previousTrak.artist;
          state.title = previousTrak.title;
          state.id = previousTrak.web.spotify.id;
          state.index = previousIndex;
          state.isrc = previousTrak.isrc;

          break;
        case 'restart':
          state.source = state.source;
        case 'index:down':
          state.index = state.index - 1 !== -1 ? state.index - 1 : state.index;
        case 'index:up':
          state.index =
            state.index + 1 !== state.queue.length
              ? state.index + 1
              : state.index;
          break;
      }
    },
    setREGEN: (state, action) => {
      const {traklist} = action.payload;
      state.index = 0;
      state.queue = traklist;
      state.source = {uri: traklist[state.index].web.spotify.preview};
      state.image = {uri: traklist[state.index].cover_art};
      state.artist = traklist[state.index].artist;
      state.title = traklist[state.index].title;
      state.id = traklist[state.index].web.spotify.id;
      state.isrc = traklist[state.index].isrc;
    },
    setTRAKLIST: (state, action) => {
      const {traklist, isReloading} = action.payload;

      const jointTRAKLIST = [...state.queue, ...traklist];
      const trak001 = jointTRAKLIST[state.index];
      const playerType = trak001.player;
      console.log('🚀 ~ file: player.ts ~ line 84 ~ trak001', trak001);

      switch (playerType) {
        case 'primary':
          state.queue = state.queue.concat(traklist);
          state.source = {uri: trak001.web.spotify.preview};
          state.image = {uri: trak001.cover_art};
          state.artist = trak001.artist;
          state.title = trak001.title;
          state.id = trak001.web.spotify.id;
          state.isrc = trak001.isrc;
          state.paused = state.youtubeId ? true : false;
          break;
        case 'secondary:spotify':
          state.queue = state.queue.concat(traklist);
          state.source = {uri: trak001.web.spotify.preview};
          state.image = {uri: trak001.cover_art};
          state.artist = trak001.artist;
          state.title = trak001.title;
          state.id = trak001.web.spotify.id;
          state.isrc = trak001.isrc;
          state.paused = state.youtubeId ? true : false;
          break;
        case 'secondary:apple_music':
          state.queue = state.queue.concat(traklist);
          state.source = {uri: trak001.web.spotify.preview};
          state.image = {uri: trak001.cover_art};
          state.artist = trak001.artist;
          state.title = trak001.title;
          state.id = trak001.web.spotify.id;
          state.isrc = trak001.isrc;
          state.paused = state.youtubeId ? true : false;
          break;
        default:
          console.log('1');
      }
    },
    setSpotifyPlayer: (state, action) => {
      const {title, artist, image, device} = action.payload;

      state.title = title;
      state.artist = artist;
      state.image = image;
      state.device = device;
      state.service = 'spotify';
    },
    setPlayers: (state, action) => {
      const {spotify, apple_music, youtube} = action.payload;
      console.log(
        '🚀 ~ file: player.ts ~ line 300 ~ action.payload',
        action.payload,
      );
      console.log(
        '🚀 ~ file: player.ts ~ line 300 ~ spotify, apple_music',
        spotify,
        apple_music,
      );

      if (spotify) {
        state.players.spotify = spotify;
      }

      if (apple_music) {
        state.players.apple_music = apple_music;
      }

      if (youtube) {
        state.players.youtube = youtube;
      }
    },
    setChatPlayer: (state, action) => {
      state.hidden = false;
    },
    setSwipePlayer: (state, action) => {
      state.hidden = true;
    },
    setFeed: (state, action) => {
      const isFeed = action.payload;
      state.isFeed = isFeed;
    },
    selectFeedTrack: (state, action) => {
      const {item} = action.payload;
      state.feedTrack = item;
    },
    setLocalPlayer: (state, action) => {
      const {localTrak} = action.payload;
      state.players.youtube.paused = true;
      state.youtubeId = null;
      state.players.local.paused = false;
      state.players.local.path = localTrak.trakPath;
      state.players.local.title = localTrak.title;
      state.players.local.artist = localTrak.artist;
      state.players.local.path = localTrak.trakPath;
      state.players.local.cover_art = localTrak.cover_art;
      state.players.local.uri = localTrak.uri;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleMediaPlayerAction,
  setTRAKLIST,
  handleQueueControlsAction,
  setSpotifyPlayer,
  setPlayers,
  setChatPlayer,
  setREGEN,
  setFeed,
  setSwipePlayer,
  selectFeedTrack,
  setYoutubeId,
  setYoutubeOff,
  setYotubeTogglePause,
  setTraklist,
  setTraklistNext,
  setLocalPlayer,
  setPiPPlayer,
  setYoutubeLoop,
} = playerSlice.actions;

export const playerReducer = playerSlice.reducer;
