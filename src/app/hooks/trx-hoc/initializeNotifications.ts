import {Linking, Alert} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

export const handleInitializeNotifications = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log(
      '🚀 ~ file: TRAKLITEInterface.tsx ~ line 85 ~ TRXInterfaceHOC ~ unsubscribe ~ remoteMessage',
      remoteMessage,
    );

    const data = remoteMessage.data;
    const type = data?.type;

    switch (type) {
      case 'chat':
        Toast.show({
          type: 'success',
          text1: data!.title,
          text2: data!.body,
        });

        // entry point to deeplinking application
        break;
      default:
        break;
    }
  });

  messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // alert('type : ' + remoteMessage.data.type);

    const type = remoteMessage.data.type;

    const path = `traklist://app/${type}`;

    const supported = await Linking.canOpenURL(path);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(path);
    } else {
      Alert.alert(`Don't know how to open this URL: ${path}`);
    }
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage: any) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        alert('deep links');

        const type = remoteMessage.data.type;

        const path = `traklist://app/${type}`;

        const supported = await Linking.canOpenURL(path);

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          setTimeout(async () => {
            await Linking.openURL(path);
          }, 1000);
        } else {
          Alert.alert(`Don't know how to open this URL: ${path}`);
        }
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });

  return unsubscribe;
};
