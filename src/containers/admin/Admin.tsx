import {View, Text} from 'react-native';
import React from 'react';
import {useAdmin} from './useAdmin';
import {AdminElement} from '../../elements';

export const AdminContainer = ({...props}: any) => {
  const {...useAdminProps} = useAdmin({...props});
  return <AdminElement {...useAdminProps} {...props} />;
};
