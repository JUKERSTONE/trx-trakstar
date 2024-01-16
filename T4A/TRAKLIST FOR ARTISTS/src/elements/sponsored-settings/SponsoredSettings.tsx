import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
} from 'react-native';
import {VHeader, Body} from '../typography';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import {TouchableHighlight} from 'react-native-gesture-handler';
import moment from 'moment';
import {genres} from '../../core/genres';

export const SponsoredSettingsElement = ({
  settingsData,
  selectedValue,
  setSelectedValue,
  setOpen,
  open,
  setDate,
  date,
  campaignName,
  setCampaignName,
  placement,
  setPlacement,
  campaignType,
  setCampaignType,
  handleStartDT,
  handleEndDT,
  setActiveAlways,
  activeAlways,
  handleNavigateNext,
  activeStart,
  setActiveStart,
  activeEnd,
  setActiveEnd,
  campaignGenre,
  setCampaignGenre,
}: any) => {
  console.log(
    '🚀 ~ file: SponsoredSettings.tsx:49 ~ settingsData:',
    settingsData,
  );
  return (
    <>
      <FlatList
        data={settingsData}
        renderItem={({item, index}: any) => {
          // const trak = JSON.parse(item.serialized_trak);
          // console.log('🚀 ~ file: NFTRequests.tsx:70 ~ trak:', trak);
          switch (item.section) {
            case 'campaign-type':
              return (
                <View style={{padding: 10}}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#1a1a1a'}
                    text={item.header}
                  />
                  <View style={{flexDirection: 'row'}}>
                    {item.body.map((item: any) => (
                      <TouchableOpacity
                        onPress={() => setCampaignType(item.name)}>
                        <View
                          style={{
                            margin: 10,
                            backgroundColor:
                              campaignType === item.name
                                ? '#1db954'
                                : '#232323',
                            padding: 7,
                            borderRadius: 4,
                            paddingHorizontal: 30,
                          }}>
                          <Text style={{color: '#cecece', fontWeight: 'bold'}}>
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            case 'campaign-placement':
              return (
                <View style={{padding: 10}}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#1a1a1a'}
                    text={item.header}
                  />
                  <View>
                    {item.body.map((item: any) => {
                      return (
                        <TouchableOpacity
                          onPress={() => setPlacement(item.name)}>
                          <View
                            style={{
                              margin: 10,
                              backgroundColor:
                                placement === item.name ? '#1db954' : '#232323',
                              padding: 8,
                              borderRadius: 4,
                            }}>
                            <Text
                              style={{color: '#cecece', fontWeight: 'bold'}}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            case 'campaign-name':
              return (
                <View style={{padding: 10}}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#1a1a1a'}
                    text={item.header}
                  />
                  <TextInput
                    value={campaignName}
                    onChangeText={setCampaignName}
                    style={{
                      borderWidth: 1,
                      padding: 8,
                      borderRadius: 7,
                      marginTop: 8,
                    }}
                  />
                </View>
              );
            case 'campaign-genres':
              if (settingsData['campaign-placement'] === 'Search') return null;
              console.log(
                '🚀 ~ file: SponsoredSettings.tsx:124 ~ settingsData:',
                settingsData,
              );

              return (
                <View style={{padding: 10}}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#1a1a1a'}
                    text={item.header}
                  />
                  <Picker
                    key={index}
                    itemStyle={{height: 150, fontSize: 10}}
                    selectedValue={campaignGenre ?? 'hip-hop'}
                    onValueChange={(itemValue, itemIndex) =>
                      setCampaignGenre(itemValue)
                    }
                    style={{flex: 1}}>
                    {genres.map((item: any) => {
                      return <Picker.Item label={item} value={item} />;
                    })}
                  </Picker>
                </View>
              );
            case 'campaign-active-period':
              return (
                <View style={{padding: 10}}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#1a1a1a'}
                    text={item.header}
                  />
                  {!activeAlways && (
                    <DatePickerIOS date={date} onDateChange={setDate} />
                  )}
                  {!activeAlways && (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#cecece',
                            alignSelf: 'center',
                            padding: 5,
                            borderRadius: 8,
                          }}>
                          <Text>{`${moment(activeStart).calendar()}`}</Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: '#cecece',
                            alignSelf: 'center',
                            padding: 5,
                            borderRadius: 8,
                          }}>
                          <Text>{`${moment(activeEnd).calendar()}`}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <Button
                          onPress={() => setActiveStart(date.toString())}
                          title="Start Period"
                        />
                        <Button
                          onPress={() => setActiveEnd(date.toString())}
                          title="End Period"
                        />
                      </View>
                    </View>
                  )}
                  <View
                    style={{
                      margin: 10,
                      height: 40,
                      borderWidth: 2,
                      borderRadius: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (activeAlways) {
                          setActiveStart(null);
                          setActiveEnd(null);
                        }
                        setActiveAlways(!activeAlways);
                      }}>
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          borderWidth: 2,
                          borderColor: 'green',
                          backgroundColor: activeAlways ? 'green' : 'white',
                        }}
                      />
                    </TouchableOpacity>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>
                      ALWAYS ON
                    </Text>
                  </View>
                </View>
              );
            case 'campaign-wallet':
              return (
                <View style={{padding: 10}}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#1a1a1a'}
                    text={item.header}
                  />
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }>
                    {item.body.map((item: any) => {
                      return (
                        <Picker.Item
                          label={`${item.name}, ${item.amount}${item.currency}`}
                          value={item.name}
                        />
                      );
                    })}
                  </Picker>
                </View>
              );
            default:
              return <></>;
          }
        }}
        keyExtractor={(item, index) => '' + index}
      />
      <Button onPress={handleNavigateNext} title="Next" />
    </>
  );
};
