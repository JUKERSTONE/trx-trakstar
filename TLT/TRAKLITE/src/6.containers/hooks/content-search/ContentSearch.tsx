import React from 'react';

import useContentSearch from './useContentSearch';
import ContentSearch from '../../../7.elements/search-content';

interface ViewProps {
  navigation: any;
  route: any;
  type?: string;
  modeProp?: string;
  isNavigation?: boolean;
  discoverQuery?: string;
  discoverContent?: any;
  isDiscover: boolean;
}

export const ContentSearchView: React.FC<ViewProps> = ({...props}) => {
  const route = props.route;
  const {modeProp, isNavigation = true, type, discoverQuery} = props;
  const initialQuery = route.params?.query;
  const {...useProps} = useContentSearch({
    discoverQuery,
    initialQuery,
    modeProp,
    type,
    isNavigation,
  });
  return <ContentSearch {...props} {...useProps} />;
};
