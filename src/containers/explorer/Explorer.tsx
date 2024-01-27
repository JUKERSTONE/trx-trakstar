import {View, Text} from 'react-native';
import React from 'react';
import {useExplorer} from './useExplorer';
import {ExplorerElement} from '../../elements';

export const ExplorerContainer = ({...props}: any) => {
  const {...useExplorerProps} = useExplorer({...props});
  return <ExplorerElement {...useExplorerProps} {...props} />;
};
