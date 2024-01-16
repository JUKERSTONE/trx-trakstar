import {View, Text} from 'react-native';
import React from 'react';
import {AdminDashboardElement} from '../../elements';
import {useAdminDashboard} from './useAdminDashboard';

export const AdminDashboardContainer = ({navigation, ...props}: any) => {
  const {...useAdminDashboardProps} = useAdminDashboard({navigation});
  return (
    <AdminDashboardElement
      {...useAdminDashboardProps}
      navigation={navigation}
      {...props}
    />
  );
};
