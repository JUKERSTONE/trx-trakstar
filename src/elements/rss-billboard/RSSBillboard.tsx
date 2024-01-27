import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  ImageBackground,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

export const RSSBillboardElement = ({handleSourceNavigation}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'POP'},
    {key: 'second', title: 'CULTURE'},
    {key: 'third', title: 'ROCK'},
    {key: 'fourth', title: 'KPOP'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={({route}) => {
        switch (route.key) {
          case 'first':
            return (
              <View style={{backgroundColor: '#cecece', flex: 1}}>
                {/* <FlatList
                  listKey="TRAK"
                  data={seed?.missingProviders}
                  renderItem={({item}: any) => <View></View>}
                /> */}
              </View>
            );
          case 'second':
            return (
              <View style={{backgroundColor: '#cecece', flex: 1}}>
                {/* <FlatList
                  listKey="TRAK"
                  data={seed?.missingProviders}
                  renderItem={({item}: any) => <View></View>}
                /> */}
              </View>
            );
          case 'third':
            return (
              <View style={{backgroundColor: '#cecece', flex: 1}}>
                {/* <FlatList
                  listKey="TRAK"
                  data={seed?.missingProviders}
                  renderItem={({item}: any) => <View></View>}
                /> */}
              </View>
            );
          case 'fourth':
            return (
              <View style={{backgroundColor: '#cecece', flex: 1}}>
                {/* <FlatList
                  listKey="TRAK"
                  data={seed?.missingProviders}
                  renderItem={({item}: any) => <View></View>}
                /> */}
              </View>
            );
          default:
            return <View />;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={{backgroundColor: '#1a1a1a'}}
          // tabStyle={[
          //   tabStyles.tabBarWrapper,
          //   tabStyles.tabBarFirst(
          //     //temporary set to 0 since current tabs fit on one screen
          //     0,
          //   ),
          // ]}
          // activeColor={tabStyles.tabActive.color}
          // inactiveColor={tabStyles.tabInActive.color}
          // renderLabel={TabBarLabel}
          // indicatorContainerStyle={tabStyles.indicatorStyle}
          indicatorStyle={{backgroundColor: '#fff'}}
        />
      )}
    />
  );
};
