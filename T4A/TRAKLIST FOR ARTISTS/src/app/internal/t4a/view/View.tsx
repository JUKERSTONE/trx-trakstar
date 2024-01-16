import React, {useState} from 'react';
import {View, StatusBar, useColorScheme} from 'react-native';
import {colors} from '../../../../core';
// import {TRXModal} from '../../../../elements';
// import {useTRAKLISTState} from '../../../';
import {toggleExchangeView, store} from '../../../../stores';

export const T4AView = ({isDarkMode, children, ...props}: any) => {
  const [modalState, setModalState] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  };
  // const {handleGetState} = useTRAKLISTState();
  // const modalState = handleGetState({index: 'modal'});
  // console.log(
  //   '🚀 ~ file: View.tsx ~ line 15 ~ TRAKLISTView ~ modalState',
  //   modalState,
  // );

  store.subscribe(() => {
    const state = store.getState();
    const modalState = state.modal;
    console.log(
      '🚀 ~ file: View.tsx ~ line 24 ~ store.subscribe ~ modalState',
      modalState,
    );
    setModalState(modalState);
    console.log('T4A APP STATE : ', state);
  });

  return (
    <View style={[{flex: 1}, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {children}
      {/* <TRXModal
        {...props}
        handleRequestClose={() => {
          let modal;
          if (modalState?.type === 'exchange') {
            modal = {
              type: '',
              exchange: {
                active: false,
              },
            };
          } else if (modalState?.type === 'wallet-exchange') {
            modal = {
              type: '',
              exchange: {
                active: false,
              },
            };
          }
          const action = toggleExchangeView(modal);
          store.dispatch(action);
        }}
        type={modalState?.type}
        state={modalState}
        modalVisible={modalState?.exchange?.active}
        setModalVisible={setModalVisible}
      /> */}
    </View>
  );
};
