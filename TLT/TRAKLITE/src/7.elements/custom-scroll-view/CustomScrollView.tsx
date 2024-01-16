import React from 'react';
import {FlatList, ViewStyle} from 'react-native';

/**
 * TE CustomScrollView component. Based on a FlatList,
 * created to replace a default ScrollView component
 * which doesn't allow to use a FlatList inside it.
 * @param {style} - style of a FlatList
 * @param {contentContainerStyle} - style of a FlatList container
 * @param {listKey} - string, unique value required if a few FlatLists of the same orientation are nested
 * @param {children} - content which is wrapped in a FlatList
 */

interface CustomScrollViewProps {
  listKey: string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const CustomScrollView: React.FC<CustomScrollViewProps> = ({
  style,
  contentContainerStyle,
  listKey,
  children,
}) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    style={style}
    contentContainerStyle={contentContainerStyle}
    data={[]}
    keyExtractor={() => 'key'}
    listKey={listKey}
    renderItem={null}
    ListEmptyComponent={<>{children}</>}
  />
);
