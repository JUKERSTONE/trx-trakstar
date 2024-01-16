import React, {useCallback, useContext} from 'react';

import {useProvider} from '../../3.stores';
import {TraklistApp} from '../../6.containers/hooks/traklist-app/TraklistApp';
import {DiscoverView} from '../../6.containers/hooks/discover';

const [refreshing, setRefreshing] = React.useState(false);

interface DiscoverProps {
  navigation: any;
}

export const Discover: React.FC<DiscoverProps> = ({...props}) => {
  const {navigation} = props;
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // get new tl
  }, [refreshing]);

  const {state} = useContext(useProvider);

  return (
    <TraklistApp navigation={navigation} hasPlayer={false}>
      <DiscoverView {...props} />
    </TraklistApp>
  );
};
