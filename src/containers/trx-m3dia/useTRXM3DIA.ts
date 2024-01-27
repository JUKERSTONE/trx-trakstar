import {
  PlayerContext,
  setPiPPlayer,
  setTraklistNext,
  setYoutubeOff,
  store,
} from '../../stores';
import {useLITELISTState} from '../../app';
import {useContext, useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

export const useTRXM3DIA = ({isTraklist}: any) => {
  const [trxUrl, setTRXUrl] = useState(''); // Initialize with your default URL if any
  const [isPlayerInitialized, setPlayerInitialized] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const webViewRef = useRef(null);

  const fetchVideoTimeJS = `
    // ... your existing JavaScript code for video manipulation
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
      // ... handle other message types here

      default:
        console.warn(`Unhandled event type: ${message.eventType}`);
        break;
    }
  };

  return {};
};
