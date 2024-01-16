import {View, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage} from '../../stores';

export const AdminDashboardElement = ({
  handleNavigateTrending,
  handleNavigateNews,
  handleNavigateOriginalRanker,
  handleNavigateTRX00Match,
  handleNavigateMerchandise,
  handleNavigateRecords,
  handleNavigateTRXRequests,
  ...props
}: any) => {
  const {handleClear} = useAsyncStorage();
  return (
    <View>
      <Button title="TRX-00 (isrc)" onPress={handleNavigateTRX00Match} />
      <Button title="TRX-04 (youtube)" onPress={handleNavigateTRXRequests} />
      <Button
        title="Mine / Mint TRX"
        onPress={() => props.navigation.navigate('MINE_TOKEN')}
      />

      <Button
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              handleClear();
            });
        }}
        title="Sign Out"
      />
    </View>
  );
};
