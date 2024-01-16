import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  DatePickerIOS,
} from 'react-native';
import {VHeader, Body} from '../typography';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {TouchableHighlight} from 'react-native-gesture-handler';
import moment from 'moment';
import {genres} from '../../core/genres';

export const SponsoredStrategyElement = ({
  strategyData,
  handleNavigatePreview,
  formParams,
  camapignLimit,
  setCampaignLimit,
  setMaxCostPerImpression,
  maxCostPerImpression,
}: any) => {
  return (
    <>
      <FlatList
        data={strategyData}
        renderItem={({item, index}: any) => {
          switch (item.section) {
            case 'strategy-wallet':
              return (
                <View style={{padding: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text>{item.header}</Text>
                    <Text style={{color: 'blue', fontSize: 10}}> (change)</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#cecece',
                      padding: 8,
                      borderWidth: 1.1,
                      borderRadius: 7,
                      margin: 5,
                    }}>
                    <Text style={{color: 'grey'}}>
                      {`${
                        formParams.settings['campaign-wallet']
                      } : GBP - ${'$223.00'} Available`}
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: '#232323'}}>
                      {`Available balance: ${'$223.00'}`}
                    </Text>
                  </View>
                </View>
              );
            case 'campaign-spend-limit':
              return (
                <View style={{padding: 10}}>
                  <Text>{item.header}</Text>
                  <View style={{margin: 5}}>
                    <TextInput
                      onChangeText={setCampaignLimit}
                      style={{borderWidth: 1, padding: 8, borderRadius: 7}}
                      value={camapignLimit}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{margin: 10}}>
                    <Text style={{color: 'grey'}}> {item.body} </Text>
                  </View>
                </View>
              );
            case 'strategy-cost-per-impression':
              return (
                <View style={{padding: 10}}>
                  <Text>{item.header}</Text>
                  <View style={{margin: 5}}>
                    <TextInput
                      onChangeText={setMaxCostPerImpression}
                      style={{borderWidth: 1, padding: 8, borderRadius: 7}}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{margin: 10}}>
                    <Text style={{color: 'grey'}}> {item.body} </Text>
                  </View>
                </View>
              );
            default:
              return <></>;
          }
        }}
        keyExtractor={(item, index) => '' + index}
      />
      <Button onPress={handleNavigatePreview} title="Next" />
    </>
  );
};
