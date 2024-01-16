import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  Pressable,
} from 'react-native';

export const TRXDistributionElement = ({
  handleNavigateRedeem,
  handleNavigateMint,
}: any) => {
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#333333',
      }}>
      <Pressable
        onPress={handleNavigateRedeem}
        style={{
          marginBottom: 20,
          height: 80,
          backgroundColor: '#1a1a1a',
          width: '70%',
          borderRadius: 10,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'whitesmoke', fontWeight: 'bold', fontSize: 20}}>
            TrakStar Originals
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={handleNavigateMint}
        style={{
          marginBottom: 20,
          height: 80,
          backgroundColor: '#1a1a1a',
          width: '70%',
          borderRadius: 10,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'whitesmoke', fontWeight: 'bold', fontSize: 20}}>
            Sponsored Streams
          </Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};
