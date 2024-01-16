import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Modal,
  Alert,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

interface SearchProps {
  type: string;
  query: string;
  handleInputChange: any;
  handleSearchSettings: any;
}

export const Search: React.FC<SearchProps> = ({
  type,
  query,
  handleInputChange,
  handleSearchSettings,
}) => {
  return (
    <>
      <View style={{width: '100%', marginTop: 30}}>
        <View style={styles.search}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="search" size={30} color="#cecece" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Search ' + type + 's'}
              multiline={false}
              onChangeText={text => handleInputChange(text, type)}
              value={query}
            />
          </View>
          <Pressable
            onPress={handleSearchSettings}
            style={{justifyContent: 'center'}}>
            <View style={{padding: 5}}>
              <MaterialIcons name="settings" size={20} color="#1a1a1a" />
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default Search;
