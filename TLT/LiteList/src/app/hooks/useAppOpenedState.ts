import {useAppState} from '@react-native-community/hooks';
import {useEffect, useRef, useState} from 'react';
import {AppStateStatus} from 'react-native';

/**
 * Tracks if the app is open or not.
 *
 * When the app isn't open, the state is "background". When the app is open, the state is "active".
 * The app will also enter the 'inactive' state (for iOS) just before it enters the 'background' state
 * as the app is closed, and it will also enter this state during periods of inactivity like
 * if the notification tray is pulled down
 *
 * Here we only consider the app active -> background as closing and background -> active as opening
 * so we do not fire events if the notification tray was opened and closed, for example.
 */
export const useAppOpenedState = () => {
  const appState = useAppState();

  const prevAppState = useRef<AppStateStatus>(appState);
  const [appOpened, setAppOpened] = useState<boolean | null>(null);

  useEffect(() => {
    if (
      appState === 'background' &&
      (prevAppState.current === 'active' || appOpened === null)
    ) {
      setAppOpened(false);
      prevAppState.current = appState;
    } else if (
      appState === 'active' &&
      (prevAppState.current === 'background' || appOpened === null)
    ) {
      setAppOpened(true);
      prevAppState.current = appState;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return appOpened;
};
