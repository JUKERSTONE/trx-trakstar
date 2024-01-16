import React from 'react';
import {View, Text} from 'react-native';
import {useLibrary} from './useLibrary';
import {LibraryElement} from '../../elements';

export const LibraryContainer = ({navigation, ...props}: any) => {
  const {...useProps} = useLibrary(navigation);
  return <LibraryElement {...useProps} />;
};
