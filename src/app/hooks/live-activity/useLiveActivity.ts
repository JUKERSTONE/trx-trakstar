import {useCallback, useEffect, useRef} from 'react';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import {useSelector} from 'react-redux';
// import {OrderStatusLogStatus as OrderStatus} from '../../Gateway/Types/gateway-types';
// import {logWarning} from '../../Log/helpers/logWarning';
// import {useMobx} from '../../State/StateProvider';
// import {useTranslation} from '../../Translation/TranslationProvider';
// import {useEta} from './useEta';

// Live Activities only work on iOS.
const TRXLiveModuleModuleEventEmitter = (() =>
  Platform.OS === 'ios'
    ? new NativeEventEmitter(NativeModules.TRXLiveModule)
    : undefined)();

const ON_PUSH_TOKEN_EVENT = 'onPushToken';

type UseOrderLiveActivityOptions = {
  /**
   * How long to wait for live activity APNS token to be returned.
   */
  timeout?: number;
  /**
   * Do **not** clear event listeners on unmount (prevent abort waiting for APNS token).
   */
  preventCleanUpOnUnmount?: boolean;
};

/**
 * Creates a function to request an iOS Live Activity. That function returns an APNS push token
 * that must be added to an order by including it in the basket/checkout. When the Live Activity
 * is dismissed by the user and should be restarted, the new APNS token must be stored on the order.
 */
export function useOrderLiveActivity(
  options: UseOrderLiveActivityOptions = {},
) {
  //   const {t} = useTranslation();
  //   const {feature} = useMobx();
  //   const {etaShort, etaLong} = useEta();

  const player = useSelector((state: any) => state.player);
  console.log('🚀 ~ file: useLiveActivity.ts:30 ~ player:', player);
  const resolvedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestLiveActivity = useCallback(
    /**
     * @param liveActivityId Unique ID for the Live Activity, e.g. the basket ID.
     * @returns Promise<string> of the APNS token.
     */
    (liveActivityId: string, opts: any) => {
      return new Promise<string | undefined>(resolve => {
        if (!TRXLiveModuleModuleEventEmitter) {
          return resolve(undefined);
        }
        // if (!feature.isIosLiveActivityEnabled) {
        //   return resolve(undefined);
        // }

        // First, remove any old listeners.
        TRXLiveModuleModuleEventEmitter.removeAllListeners(ON_PUSH_TOKEN_EVENT);
        // The APNS token will be returned asynchronously by the native module.
        TRXLiveModuleModuleEventEmitter.addListener(
          ON_PUSH_TOKEN_EVENT,
          (apnsToken: string) => {
            if (!resolvedRef.current) {
              resolvedRef.current = true;
              resolve(apnsToken);
            } else {
              //   logWarning('received APNS token after the timeout');
            }
          },
        );
        // If the callback of the native module is not called (soon enough), complete the checkout anyway.
        timeoutRef.current = setTimeout(() => {
          if (!resolvedRef.current) {
            resolvedRef.current = true;
            // logWarning(
            //   `${ON_PUSH_TOKEN_EVENT} not called in time, completing checkout without APNS token`,
            // );
            resolve(undefined);
          }
        }, options.timeout ?? 1500);
        // Call the native module to request the live activity.
        NativeModules.TRXLiveModule.request(
          liveActivityId,
          opts ?? {
            playerImage: player.image.uri,
            playerTitle: player.title,
            playerArtist: player.artist,
            merchandiseImage: 'ee',
            merchandiseTitle: 'ee',
            merchandisePromotion: '', // The order ID will be provided later by APNS push updates.
            isPlaying: false, // The order ID will be provided later by APNS push updates.
          },
        );
      });
    },
    [player.image.uri, player.title, player.artist, options.timeout],
  );

  // Clean up listeners on unmount.
  useEffect(
    () => () => {
      if (options.preventCleanUpOnUnmount) {
        return;
      }
      if (TRXLiveModuleModuleEventEmitter) {
        TRXLiveModuleModuleEventEmitter.removeAllListeners(ON_PUSH_TOKEN_EVENT);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [options.preventCleanUpOnUnmount],
  );

  const stopLiveActivityById = useCallback((liveActivityId: string) => {
    if (Platform.OS !== 'ios') {
      return;
    }
    NativeModules.TRXLiveModule.endActivityById(liveActivityId);
  }, []);

  const stopAllLiveActivities = useCallback(() => {
    if (Platform.OS !== 'ios') {
      return;
    }
    NativeModules.TRXLiveModule.endAll();
  }, []);

  const updateActivity = (contentState: any) => {
    if (Platform.OS !== 'ios') {
      return;
    }
    NativeModules.TRXLiveModule.updateActivity(contentState);
  };

  return {
    requestLiveActivity,
    updateActivity,
    stopLiveActivityById,
    stopAllLiveActivities,
  } as const;
}
