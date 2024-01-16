import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TokencyScreen,
  SetTokenScreen,
  TLTNewsScreen,
  MineTokenScreen,
  AdminDashboardScreen,
  TLTTrendingScreen,
  OriginalsRankerScreen,
  TRX00MatchScreen,
  MerchandiseShopScreen,
  RecordsShopScreen,
  TRXRequestsScreen,
  AppendTokenScreen,
  FindScreen,
} from '../../screens';
import {GeniusMatchContainer, TRXFillContainer} from '../../containers';

const Stack = createStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333333',
        },
        headerTintColor: '#FFF',
      }}>
      <Stack.Screen
        name="ADMIN_DASHBOARD"
        component={AdminDashboardScreen}
        options={{
          title: 'BERNTIONS',
        }}
      />
      <Stack.Screen
        name="TLT_TRENDING"
        component={TLTTrendingScreen}
        options={{
          title: 'TLT Trending',
        }}
      />
      <Stack.Screen
        name="TLT_NEWS"
        component={TLTNewsScreen}
        options={{
          title: 'TLT News',
        }}
      />
      <Stack.Screen
        name="OG_RANKER"
        component={OriginalsRankerScreen}
        options={{
          title: 'TLT OG_RANKER',
        }}
      />
      <Stack.Screen
        name="TRX00MATCH"
        component={TRX00MatchScreen}
        options={{
          title: 'TRX-00',
        }}
      />
      <Stack.Screen
        name="MerchandiseShop"
        component={MerchandiseShopScreen}
        options={{
          title: 'MerchandiseShop',
        }}
      />
      <Stack.Screen
        name="RecordsShop"
        component={RecordsShopScreen}
        options={{
          title: 'RecordsShop',
        }}
      />
      <Stack.Screen
        name="TRXRequests"
        component={TRXRequestsScreen}
        options={{
          title: 'TRX-04',
        }}
      />
      <Stack.Screen
        name="GeniusMatch"
        component={GeniusMatchContainer}
        options={{
          title: 'MATCH',
        }}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="TRXFill"
          component={TRXFillContainer}
          options={{
            title: 'TRXFill',
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="TOKENCY"
        component={TokencyScreen}
        options={{
          title: 'TRX PROTOCOLS',
        }}
      />
      <Stack.Screen
        name="MINE_TOKEN"
        component={MineTokenScreen}
        options={{
          title: '.trx',
        }}
      />
      <Stack.Screen
        name="SET_TOKEN"
        component={SetTokenScreen}
        options={{
          title: 'Set Token',
        }}
      />
      <Stack.Screen
        name="APPEND_TOKEN"
        component={AppendTokenScreen}
        options={{
          title: 'Append Token',
        }}
      />
      <Stack.Screen
        name="FIND"
        component={FindScreen}
        options={{
          title: 'Search',
        }}
      />
    </Stack.Navigator>
  );
};
