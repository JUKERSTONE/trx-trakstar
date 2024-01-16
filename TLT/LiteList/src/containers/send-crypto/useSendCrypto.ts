import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
  appendTransaction,
} from '../../stores';
import {
  useGenerate,
  useFirebase,
  useLITELISTState,
  handleSearchUsers,
  handleSetTransaction,
} from '../../app';

export const useCrypto = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();

  const [selectedValue, setSelectedValue] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const [recipient, setRecipient] = useState({
    key: null,
    label: null,
    id: null,
  });
  const [users, setUsers] = useState([
    {
      key: 'kenya',
      label: 'Kenya',
    },
    {
      key: 'uganda',
      label: 'Uganda',
    },
    {
      key: 'libya',
      label: 'Libya',
    },
    {
      key: 'morocco',
      label: 'Morocco',
    },
    {
      key: 'estonia',
      label: 'Estonia',
    },
  ]);

  const profile = handleGetState({index: 'profile'});

  const stacks_keys = profile.TRX.stacks_keys;

  const senderKey = stacks_keys.private;
  const publicKey = stacks_keys.public;

  const TRXProfile = profile.TRX;
  const trakName = TRXProfile.trak_name;
  const userId = TRXProfile.id;

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    const usersData = await handleSearchUsers('');
    const users = usersData.map((user: any) => {
      return {
        key: user.stacks_public_key,
        label: user.trak_name,
        id: user.id,
      };
    });
    console.log('🚀 ~ file: useSendCrypto.ts ~ line 33 ~ users ~ users', users);
    setUsers(users);
  };

  const currency = [{label: 'stx', value: 'STX'}];

  const options = users;

  const handleCancel = () => setIsVisible(false);
  const handleChooseRecipient = () => setIsVisible(true);

  const handleSelectReceipient = (picked: any) => {
    setRecipient(picked);
    setIsVisible(false);
  };

  const handleSubmitTransaction = () => {
    alert('Submit Transaction');
  };

  const handleTransaction = async (event: any) => {
    console.log(
      '🚀 ~ file: useSendCrypto.ts ~ line 85 ~ handleTransaction ~ event',
      event.nativeEvent.data,
    );
    alert(event.nativeEvent.data);

    if (event.nativeEvent.data === 'err') {
      alert('error with tx');
      return;
    }

    const {success} = await handleSetTransaction({
      txId: event.nativeEvent.data,
      recipientURI: `stx:${recipient.label}:${recipient.key}`,
      senderURI: `stx:${trakName}:${publicKey}`,
      receipt_time_iso: new Date().toString(),
      senderId: userId,
      recipientId: recipient.id,
    });

    const action = appendTransaction({
      txId: event.nativeEvent.data,
      recipientURI: `stx:${recipient.label}:${recipient.key}`,
      senderURI: `stx:${trakName}:${publicKey}`,
      receipt_time_iso: new Date().toString(),
      senderId: userId,
      recipientId: recipient.id,
    });
    store.dispatch(action);

    // alert(event.nativeEvent.data);
    if (success) {
      alert('success - navigating');
      // navigation.navigate('ACTIVITY', {screen: 'TRANSACTIONS'});
    } else {
      alert('false');
    }

    alert(event.nativeEvent.data);
  };

  return {
    currency,
    selectedValue,
    setSelectedValue,
    options,
    handleCancel,
    handleChooseRecipient,
    handleSelectReceipient,
    isVisible,
    recipient,
    handleSubmitTransaction,
    publicKey,
    senderKey,
    handleTransaction,
  };
};
