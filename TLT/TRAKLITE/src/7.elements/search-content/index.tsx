import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Search from '../inputs/content-search';
import Recents from '../recents';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IStore, DSStore} from '../../3.stores';
import {useInvestment} from '../../0.app';
interface ContentSearchProps {
  handleInputChange: any;
  handleSearchSettings: any;
  content: any;
  navigation: any;
  route: any;
  visible: any;
  setVisible: any;
  setVisibleWithProps: any;
  query: string;
  option: string;
  isNavigation?: boolean;
  discoverContent?: any;
  isDiscover: boolean;
}

export const ContentSearch: React.FC<ContentSearchProps> = ({
  handleInputChange,
  handleSearchSettings,
  content,
  navigation,
  route,
  setVisible,
  setVisibleWithProps,
  visible,
  query,
  option,
  isNavigation,
  discoverContent,
  isDiscover = false,
}) => {
  console.log(
    '🚀 ~ file: index.tsx ~ line 16 ~ DSStore',
    DSStore.searchResults,
  );
  const {handleTrackNavigation} = useInvestment({navigation});
  return (
    <>
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <>
            {!isDiscover && (
              <View
                style={{
                  flex: 0.5,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Search
                  query={query}
                  type={option}
                  handleInputChange={handleInputChange}
                  handleSearchSettings={() => setVisible(true)}
                />
              </View>
            )}
            <View
              style={{flex: 4, backgroundColor: 'transparent', paddingTop: 8}}>
              <Recents
                handleInvestment={(prop: any) => handleTrackNavigation(prop)}
                content={isNavigation ? content : discoverContent}
                navigation={navigation}
                route={route}
                color={'#fff'}
                isDiscover={isDiscover}
              />
            </View>
          </>
        </TouchableWithoutFeedback>
      </>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setVisible(!visible);
        }}>
        <View style={styles_.centeredView}>
          <View style={styles_.modalView}>
            <Text style={styles_.modalText}>Choose a service!</Text>
            <Pressable
              style={[
                styles_.button,
                styles_.buttonClose,
                styles_.spotify,
                {marginBottom: 15},
              ]}
              onPress={() => setVisibleWithProps(!visible, 'spotify')}>
              <Text style={styles_.textStyle}>
                <MaterialCommunityIcons
                  name="spotify"
                  size={22}
                  color={'whitesmoke'}
                />
              </Text>
            </Pressable>
            <Pressable
              style={[styles_.button, styles_.buttonClose, styles_.soundcloud]}
              onPress={() => setVisibleWithProps(!visible, 'soundcloud')}>
              <Text style={styles_.textStyle}>
                <MaterialCommunityIcons
                  name="soundcloud"
                  size={22}
                  color={'whitesmoke'}
                />
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ContentSearch;

const styles_ = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  spotify: {
    backgroundColor: '#1DB954',
  },
  soundcloud: {
    backgroundColor: '#FE5000',
  },
});
