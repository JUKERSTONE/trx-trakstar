import React from 'react';
import {
  View,
  Text,
  Modal,
  ImageBackground,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';
import {
  TokencyPicker,
  TokencyForm,
  TokencyAction,
  ContentView,
} from '../../../mine-token/internal';

export const MineModal = ({
  modalVisible,
  setModalVisible,
  selectedValueLabel,
  setSelectedValueLabel,
  handleMintTRAK,
  mintLoading,
  selectedValueTier,
  setSelectedValueTier,
  seed,
  isRare,
  setIsRare,
  handleIDChange,
  navigation,
  ...props
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'WEB'},
    {key: 'second', title: 'TRAK'},
    {key: 'third', title: 'PREVIEW'},
  ]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <ScrollView contentContainerStyle={styles.centeredView}>
        <View style={styles.modalView}>
          <ImageBackground
            source={{uri: seed?.trak?.thumbnail}}
            style={{
              height: 100,
              backgroundColor: 'grey',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              justifyContent: 'space-between',
            }}
            imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <View style={{alignItems: 'flex-end'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                <FontAwesome5 name="window-close" color={'#fff'} size={20} />
              </Pressable>
            </View>

            <View
              style={{
                backgroundColor: '#1a1a1a',
                opacity: 0.7,
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{color: '#fff'}} numberOfLines={1}>
                {seed?.trak?.title}
              </Text>
              <Text
                style={{color: '#fff', fontWeight: 'bold'}}
                numberOfLines={1}>
                {seed?.trak?.artist}
              </Text>
            </View>
          </ImageBackground>
          <View style={{backgroundColor: 'transparent', flex: 1}}>
            {/*  */}
            <View style={{backgroundColor: '#cecece', flex: 1}}>
              <FlatList
                listKey="TRAK"
                data={seed?.missingProviders}
                renderItem={({item}: any) => {
                  if (item === 'spotify') return null;
                  return (
                    <>
                      <TokencyForm
                        name={item + ' ID'}
                        provider={item}
                        {...props}
                        action="SET"
                        handleInputChange={(text: string) =>
                          handleIDChange({text, provider: item})
                        }
                        hasAction={false}
                        isLink
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate('FIND', {provider: item});
                        }}
                      />
                    </>
                  );
                }}
              />
            </View>
          </View>
          <Pressable
            style={[
              styles.button,
              styles.buttonMint,
              {backgroundColor: mintLoading ? 'yellow' : 'green'},
            ]}
            onPress={() => handleMintTRAK({seed})}
            disabled={mintLoading}>
            <Text style={styles.textStyle}>MINT</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 300,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '90%',
  },
  button: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#1a1a1a',
    opacity: 0.7,
  },
  buttonMint: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
