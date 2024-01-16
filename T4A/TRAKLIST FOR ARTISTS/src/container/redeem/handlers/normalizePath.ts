import {Platform} from 'react-native';

export const handleNormalizePath = (path: string) => {
  if (Platform.OS === 'ios') {
    const filePrefix = 'file://';
    if (path.startsWith(filePrefix)) {
      path = path.substring(filePrefix.length);
      try {
        path = decodeURI(path);
      } catch (e) {}
    }
    return path;
  }
};
