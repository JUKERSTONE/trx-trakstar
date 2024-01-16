import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
// import {VHeader, Body} from '../../elements';

export const VerifyNFTElement = ({
  NFTRequest,
  handleVerifyNFT,
  handleDeclineNFT,
  verifyData,
  setVerifyData,
  ...props
}: any) => {
  console.log('🚀 ~ file: VerifyNFT.tsx:20 ~ NFTRequest:', NFTRequest);
  return (
    <View style={{paddingLeft: 20}}>
      <View>
        <Text style={{margin: 5}}>Artist :</Text>
        <TextInput
          value={verifyData.artist}
          style={{
            backgroundColor: 'grey',
            padding: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onChangeText={text => setVerifyData({...verifyData, artist: text})}
        />
      </View>
      <View>
        <Text style={{margin: 5}}>Title :</Text>
        <TextInput
          value={verifyData.title}
          style={{
            backgroundColor: 'grey',
            padding: 10,
            width: '80%',
            borderRadius: 10,
          }}
          onChangeText={text => setVerifyData({...verifyData, title: text})}
        />
      </View>
      <View>
        <Text style={{margin: 5}}>Audio :</Text>
        <TextInput
          value={verifyData.trakAUDIO}
          style={{
            backgroundColor: 'grey',
            padding: 10,
            width: '80%',
            borderRadius: 10,
          }}
          multiline={true}
          onChangeText={text => setVerifyData({...verifyData, trakAUDIO: text})}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Button title={'replace song'} />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Button title={'replace cover art'} />
        </View>
      </View>

      <Button title="VERIFY" onPress={() => handleVerifyNFT({NFTRequest})} />
      <Button title="DECLINE" onPress={() => handleDeclineNFT({NFTRequest})} />
    </View>
  );
};
