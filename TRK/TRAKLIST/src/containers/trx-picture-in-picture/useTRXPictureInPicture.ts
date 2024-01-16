import {
  PlayerContext,
  setPiPPlayer,
  setTraklistNext,
  setYoutubeOff,
  store,
} from '../../stores';
import {useTRAKLISTState} from '../../app';
import {useContext, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useSelector} from 'react-redux';
// import {handleStream} from '../../app/firebase/hooks/stream';

export const useTRXPictureInPicture = ({isTraklist}: any) => {
  const {userData, setUserData} = useContext(PlayerContext);
  const [isPlayerInitialized, setPlayerInitialized] = useState(false);
  const [isPrimaryWebViewLoaded, setPrimaryWebViewLoaded] = useState(true);
  const [isSecondaryWebViewLoaded, setSecondaryWebViewLoaded] = useState(false);
  const [songEnded, setSongEnded] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [hasStreamed, setHasStreamed] = useState(false);

  // const {handleGetState} = useTRAKLISTState();

  const player = useSelector((state: any) => state.player);
  const queue = player.traklist;
  const index = player.traklistIndex;
  const isPrimaryPlayer = player.isPrimaryPlayer;

  console.log(
    '🚀 ~ file: useTRXPictureInPicture.ts:24 ~ useTRXPictureInPicture ~ player:',
    player,
  );
  const [trxUrl1, setTRXUrl1] = useState(
    `https://www.youtube.com/watch?v=${
      player.youtubeId?.split('=')[1]
    }?playsinline=1&fs=0`,
  );
  const [trxUrl2, setTRXUrl2] = useState(
    `https://www.youtube.com/watch?v=${
      queue?.[index + 1]?.service?.url?.split('=')[1]
    }?playsinline=1&fs=0`,
  );

  useEffect(() => {
    // This function will be called whenever the app state changes
    function handleAppStateChange(nextAppState: any) {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // The app has just come to the foreground
        console.log('App has come to the foreground!');
        // Here you can trigger any code you want to execute when coming to the foreground
      }
      setAppState(nextAppState);
    }

    // Add the event listener
    AppState.addEventListener('change', handleAppStateChange);

    // Remove the event listener when the component is unmounted
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [appState]);

  useEffect(() => {
    if (!songEnded) {
      setPlayerInitialized(false);
      if (isPrimaryPlayer) {
        setTRXUrl1(
          `https://www.youtube.com/watch?v=${
            player.youtubeId?.split('=')[1]
          }?playsinline=1&fs=0`,
        );

        setTimeout(() => {
          userData.PiP1Ref.current?.injectJavaScript(`
      if (!window.trakStarVideo) {
        window.trakStarVideo = document.getElementsByTagName('video')[0];
      }
      
      if (window.trakStarVideo) {
        window.trakStarVideo.requestPictureInPicture().then(() => {
          const message = {
            eventType: 'enablePiP',
            data: 'PiP initiated successfully.'
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        }).catch(error => {
          const message = {
            eventType: 'enablePiP',
            data: 'PiP initiation failed: ' + error.message
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        });
      } else {
        const message = {
          eventType: 'enablePiP',
          data: 'No video element found.'
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
      true;  
    `);
        }, 1000);
      } else {
        setTRXUrl2(
          `https://www.youtube.com/watch?v=${
            player.youtubeId?.split('=')[1]
          }?playsinline=1&fs=0`,
        );

        setTimeout(() => {
          userData.PiP2Ref.current?.injectJavaScript(`
      if (!window.trakStarVideo) {
        window.trakStarVideo = document.getElementsByTagName('video')[0];
      }
      
      if (window.trakStarVideo) {
        window.trakStarVideo.requestPictureInPicture().then(() => {
          const message = {
            eventType: 'enablePiP',
            data: 'PiP initiated successfully.'
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        }).catch(error => {
          const message = {
            eventType: 'enablePiP',
            data: 'PiP initiation failed: ' + error.message
          };
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        });
      } else {
        const message = {
          eventType: 'enablePiP',
          data: 'No video element found.'
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
      true;  
    `);
        }, 1000);
      }
    }
  }, [player.youtubeId]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useTRXPictureInPicture.ts:170 ~ useEffect ~ player:',
      player,
    );

    if (isPrimaryPlayer && appState === 'active') {
      console.log(
        '🚀 ~ file: useTRXPictureInPicture.ts:219 ~ useEffect ~ primary:',
      );
      setTimeout(() => {
        userData.PiP1Ref.current?.injectJavaScript(`
    if (!window.trakStarVideo) {
      window.trakStarVideo = document.getElementsByTagName('video')[0];
    }
    
    if (window.trakStarVideo) {
      window.trakStarVideo.requestPictureInPicture().then(() => {
        const message = {
          eventType: 'enablePiP',
          data: 'PiP initiated successfully.'
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }).catch(error => {
        const message = {
          eventType: 'enablePiP',
          data: 'PiP initiation failed: ' + error.message
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      });
    } else {
      const message = {
        eventType: 'enablePiP',
        data: 'No video element found.'
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
    true;  
  `);
      }, 500);
    } else if (!isPrimaryPlayer && appState === 'active') {
      console.log(
        '🚀 ~ file: useTRXPictureInPicture.ts:251 ~ useEffect ~ secondary:',
        isPrimaryPlayer,
      );
      setTimeout(() => {
        userData.PiP2Ref.current?.injectJavaScript(`
    if (!window.trakStarVideo) {
      window.trakStarVideo = document.getElementsByTagName('video')[0];
    }
    
    if (window.trakStarVideo) {
      window.trakStarVideo.requestPictureInPicture().then(() => {
        const message = {
          eventType: 'enablePiP',
          data: 'PiP initiated successfully.'
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }).catch(error => {
        const message = {
          eventType: 'enablePiP',
          data: 'PiP initiation failed: ' + error.message
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      });
    } else {
      const message = {
        eventType: 'enablePiP',
        data: 'No video element found.'
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
    true;  
  `);
      }, 500);
    }
  }, [
    isPrimaryWebViewLoaded,
    isSecondaryWebViewLoaded,
    trxUrl1,
    trxUrl2,
    queue,
    index,
    isPlayerInitialized,
    isPrimaryPlayer,
    appState,
  ]);

  useEffect(() => {
    if (!isPrimaryPlayer && isPlayerInitialized) {
      userData.PiP1Ref.current?.injectJavaScript(`
      if (window.trakStarVideo) {
        window.trakStarVideo.pause();
        window.trakStarVideo.muted = false;
      };
      true;
      `);

      userData.PiP2Ref.current?.injectJavaScript(`
      if (window.trakStarVideo) {
        window.trakStarVideo.play();
        window.trakStarVideo.muted = false;
      };
      true;
      `);
    } else if (isPrimaryPlayer && isPlayerInitialized) {
      userData.PiP2Ref.current?.injectJavaScript(`
      if (window.trakStarVideo) {
        window.trakStarVideo.pause();
        window.trakStarVideo.muted = false;
      };
      true;
      `);
      userData.PiP1Ref.current?.injectJavaScript(`
      if (window.trakStarVideo) {
        window.trakStarVideo.play();
        window.trakStarVideo.muted = false;
      };
      true;
      `);
    }
  }, [isPrimaryPlayer, isPlayerInitialized]);

  useEffect(() => {
    if (isPrimaryPlayer && !player.players.youtube.paused) {
      userData.PiP1Ref.current?.injectJavaScript(`
        if (window.trakStarVideo) {
          window.trakStarVideo.play();
        };
        true;
        `);
    } else if (!isPrimaryPlayer && !player.players.youtube.paused) {
      userData.PiP2Ref.current?.injectJavaScript(`
        if (window.trakStarVideo) {
          window.trakStarVideo.play();
        };
        true;
        `);
    }
  }, [player.players.youtube.paused]);

  const fetchVideoTimeJS = (active: boolean) => `
  if (!window.trakStarVideo) {
    window.trakStarVideo = document.getElementsByTagName('video')[0];
    window.trakStarVideo.addEventListener('loadedmetadata', () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
          eventType: 'videoReady',
          data: true
      }));
    });
    window.trakStarVideo.addEventListener('ended', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        eventType: 'videoEnded',
        data: 100
      }));
    });
    window.trakStarVideo.addEventListener('timeupdate', () => {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        eventType: 'videoCurrentTime',
        data: (window.trakStarVideo.currentTime / window.trakStarVideo.duration) * 100
      }));
    });
    window.trakStarVideo.addEventListener('error', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
          eventType: 'videoError',
          data: 'An error occurred while trying to load the video.'
      }));
    });
    window.trakStarVideo.muted = ${active ? 'false' : 'true'};
    ${active ? 'window.trakStarVideo.play()' : 'window.trakStarVideo.pause()'};
    true;
  }
`;

  const handleMessage = (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);

    switch (message.eventType) {
      case 'videoReady':
        setPlayerInitialized(true);
        break;
      case 'videoError':
        alert('video unavailable');
        break;
      case 'enablePiP':
        if (message.data === 'PiP initiated successfully.') {
        } else if (message.data.startsWith('PiP initiation failed: ')) {
          const errorMessage = message.data.replace(
            'PiP initiation failed: ',
            '',
          );
          console.error(errorMessage);
        } else if (message.data === 'No video element found.') {
          // Handle scenario where no video element is found.
        }
        console.log(
          '🚀 ~ file: useTRXPictureInPicture.ts:356 ~ handleMessage ~ message.data:',
          message.data,
        );
        break;
      case 'videoCurrentTime':
        const progress = message.data;
        setUserData({...userData, trxProgress: progress / 100});

        // if (35 <= progress && !hasStreamed) {
        //   setHasStreamed(true);
        //   handleStream({
        //     uri: `trx:04:${player.youtubeId.split('=')[1]}`,
        //     title: player.players.youtube.title,
        //     artist: player.players.youtube.artist,
        //     cover_art: player.players.youtube.cover_art,
        //     geniusId: player.players.youtube.geniusId,
        //   });
        // }

        if (progress)
          if (player.players.youtube.paused) {
            if (isPrimaryPlayer) {
              userData.PiP1Ref.current?.injectJavaScript(`
            if (window.trakStarVideo) {
              window.trakStarVideo.pause();
            };
            true;
            `);
            } else {
              userData.PiP2Ref.current?.injectJavaScript(`
            if (window.trakStarVideo) {
              window.trakStarVideo.pause();
            };
            true;
            `);
            }
          }

        if (progress >= 0 && songEnded) {
          setSongEnded(false);
          if (isPrimaryPlayer) {
            userData.PiP1Ref.current?.injectJavaScript(`
            if (window.trakStarVideo) {
              window.trakStarVideo.play();
              window.trakStarVideo.muted = false;
            };
            true;
            `);
          } else {
            userData.PiP2Ref.current?.injectJavaScript(`
            if (window.trakStarVideo) {
              window.trakStarVideo.play();
              window.trakStarVideo.muted = false;
            };
            true;
            `);
          }
        }

        if (progress >= 80 && !isSecondaryWebViewLoaded && isPrimaryPlayer) {
          setTRXUrl2(
            `https://www.youtube.com/watch?v=${
              queue?.[index + 1]?.service?.url?.split('=')[1]
            }?playsinline=1&fs=0`,
          );
          setSecondaryWebViewLoaded(true);
          console.log(
            `https://www.youtube.com/watch?v=${
              queue?.[index + 1]?.service?.url?.split('=')[1]
            }?playsinline=1&fs=0`,
            'poop1',
          );
        } else if (
          progress >= 80 &&
          !isPrimaryWebViewLoaded &&
          !isPrimaryPlayer
        ) {
          setTRXUrl1(
            `https://www.youtube.com/watch?v=${
              queue?.[index + 1]?.service?.url?.split('=')[1]
            }?playsinline=1&fs=0`,
          );
          setPrimaryWebViewLoaded(true);
          console.log(
            `https://www.youtube.com/watch?v=${
              queue?.[index + 1]?.service?.url?.split('=')[1]
            }?playsinline=1&fs=0`,
            'poop2',
          );
        }
        break;
      case 'videoEnded':
        setHasStreamed(false);
        if (player.youtubeLoop) {
          isPrimaryPlayer
            ? userData.PiP1Ref.current.injectJavaScript(`
           if (!window.trakStarVideo) {
            window.trakStarVideo = document.getElementsByTagName('video')[0];
          }
          window.trakStarVideo.currentTime = ${0};
          true;  
        `)
            : userData.PiP2Ref.current.injectJavaScript(`
          if (!window.trakStarVideo) {
            window.trakStarVideo = document.getElementsByTagName('video')[0];
          }
          window.trakStarVideo.currentTime = ${0};
          true;  
        `);
        } else {
          setSongEnded(true);
          if (isPrimaryPlayer) {
            setPrimaryWebViewLoaded(false);
            if (isTraklist) {
              // if foreground
              const action = setTraklistNext({});
              store.dispatch(action);
              /* 
              if background
             */
            } else {
              const action = setYoutubeOff({});
              store.dispatch(action);
              setPlayerInitialized(false);
            }
            const action = setPiPPlayer(false);
            store.dispatch(action);
          } else if (!isPrimaryPlayer) {
            setSecondaryWebViewLoaded(false);
            if (isTraklist) {
              const action = setTraklistNext({});
              store.dispatch(action);
            } else {
              const action = setYoutubeOff({});
              store.dispatch(action);
              setPlayerInitialized(false);
            }
            const action = setPiPPlayer(true);
            store.dispatch(action);
          }
        }

        break;
      default:
        console.warn(`Unhandled event type: ${message.eventType}`);
        break;
    }
  };

  return {
    picture1: trxUrl1,
    picture2: trxUrl2,
    handleMessage,
    PiP1Ref: userData.PiP1Ref,
    PiP2Ref: userData.PiP2Ref,
    isPrimaryPlayer,
    isPrimaryWebViewLoaded,
    isSecondaryWebViewLoaded,
    fetchVideoTimeJS,
  };
};
