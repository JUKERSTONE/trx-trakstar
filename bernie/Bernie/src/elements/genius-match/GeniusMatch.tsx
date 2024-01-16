import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
// import {styles} from '../screen-wrapper/styles';
import {
  TokencyPicker,
  TokencyForm,
  TokencyAction,
  ContentView,
  MineModal,
} from './internal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';

export const GeniusMatchElement = ({
  TRAKCollection,
  modalVisible,
  setModalVisible,
  handleMintTRAK,
  seed,
  setSeed,
  handleSeed,
  isRare,
  setIsRare,
  selectedValueLabel,
  setSelectedValueLabel,
  selectedValueTier,
  setSelectedValueTier,
  mintLoading,
  handleInputIDChange,
  handleIDChange,
  navigation,
  ...props
}: any) => {
  return (
    <>
      <View style={{backgroundColor: 'grey'}}>
        <TokencyForm
          name="TRAK Mine Query"
          {...props}
          action="SURF THE CONTENT ENGINE"
        />
        <ContentView TRAKCollection={TRAKCollection} handleSeed={handleSeed} />
      </View>
      <MineModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedValueLabel={selectedValueLabel}
        setSelectedValueLabel={setSelectedValueLabel}
        handleMintTRAK={handleMintTRAK}
        mintLoading={mintLoading}
        selectedValueTier={selectedValueTier}
        setSelectedValueTier={setSelectedValueTier}
        seed={seed}
        isRare={isRare}
        setIsRare={setIsRare}
        handleIDChange={handleIDChange}
        navigation={navigation}
        {...props}
      />
    </>
  );
};
