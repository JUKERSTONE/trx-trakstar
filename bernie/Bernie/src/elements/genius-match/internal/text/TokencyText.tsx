import React from 'react';
import {View, Text, TextInput, TouchableHighlight} from 'react-native';
import {styles} from './styles';

export const TokencyForm = ({
  name,
  type,
  action,
  handleInputChange,
  handleAction,
  hasAction = true,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={'Enter ' + name}
          onChangeText={handleInputChange}
        />
      </View>
      <View
        style={{
          marginHorizontal: 5,
          padding: 10,
          backgroundColor: '#cecece',
          // borderBottomLeftRadius: 10,
          // borderBottomRightRadius: 10,
          alignItems: 'flex-end',
        }}>
        {hasAction && (
          <TouchableHighlight
            onPress={handleAction}
            style={{backgroundColor: 'green', padding: 8, borderRadius: 10}}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>
              {action}
            </Text>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};
