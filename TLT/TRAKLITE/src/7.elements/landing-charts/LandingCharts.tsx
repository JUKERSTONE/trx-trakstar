import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {VHeader, BHeader, Body} from '../../7.elements/typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

interface LandingChartsProps {
  charts: any;
}

export const LandingCharts: React.FC<LandingChartsProps> = ({charts}) => {
  // console.log(charts, 'charts');
  const renderItem = ({item}: any) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'transparent',
          margin: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <VHeader type="five" color="white" text={'1'} />
          </View>
          <View style={{flex: 3}}>
            <VHeader type="five" color="white" text={item.artist} />
            <Body type="two" color="#cecece" text={item.title} />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <MaterialIcons name="arrow-drop-up" size={30} color={'#1db954'} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}} />
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Text>x</Text>
            <Text>x</Text>
            <Text>x</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#1B3926', '#1A1A1A']}>
      <View style={{padding: 30}}>
        <View
          style={{
            justifyContent: 'center',
            margin: 5,
          }}>
          <VHeader type="five" color="white" text={'BILLBOARD HOT 100.'} />
        </View>

        <FlatList
          data={charts}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          listKey="Charts"
        />

        {/* <View
          style={{
            flexDirection: 'column',
            backgroundColor: 'transparent',
            margin: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <VHeader type="five" color="white" text={'2'} />
            </View>
            <View style={{flex: 3}}>
              <VHeader type="five" color="white" text={'Lil Baby'} />
              <Body type="two" color="#cecece" text={'On Me'} />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <MaterialIcons name="arrow-drop-down" size={30} color={'red'} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}} />
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text>x</Text>
              <Text>x</Text>
              <Text>x</Text>
            </View>
          </View>
        </View> */}

        {/* <View
          style={{
            flexDirection: 'column',
            backgroundColor: 'transparent',
            margin: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <VHeader type="five" color="white" text={'3'} />
            </View>
            <View style={{flex: 3}}>
              <VHeader type="five" color="white" text={'Drake'} />
              <Body
                type="two"
                color="#cecece"
                text={'Wants and Needs feat. (Lil Baby)'}
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <MaterialIcons name="arrow-drop-down" size={30} color={'red'} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}} />
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <Text>x</Text>
              <Text>x</Text>
              <Text>x</Text>
            </View>
          </View>
        </View> */}
      </View>
    </LinearGradient>
  );
};
