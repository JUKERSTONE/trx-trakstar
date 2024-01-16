import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
} from 'react-native';
import {styles} from './styles';
import {useBERNIEState} from '../../../../app';
import {youtube} from '../../../../api/internal';

export const TokencyForm = ({
  name,
  type,
  action,
  handleInputChange,
  handleAction,
  hasAction = true,
  isLink,
  onPress,
  provider,
  ...style
}: any) => {
  const {handleGetState} = useBERNIEState();
  const suggestion = handleGetState({index: 'trak'});
  console.log('🚀 ~ file: TokencyText.tsx:20 ~ suggestion:', suggestion);

  const {spotify, apple_music, soundcloud, youtube} = suggestion.fill;
  console.log('🚀 ~ file: TokencyText.tsx:23 ~ spotify:', spotify);

  // const hasSuggestion = spotify;

  // if (provider === 'spotify' && hasSuggestion) {
  //   //
  // }

  if (spotify && provider === 'spotify') {
    console.log('🚀 ~ file: TokencyText.tsx:39 ~ spotify:', spotify);
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: spotify.thumbnails}}
            style={{flex: 1, backgroundColor: 'green', margin: 5}}
          />
          <View>
            <View
              style={{
                height: 30,
                width: 70,
                margin: 5,
              }}>
              <Text>{spotify.title}</Text>
            </View>
            <View
              style={{
                height: 30,
                width: 70,
                margin: 5,
              }}>
              <Text>{spotify.description}</Text>
            </View>
          </View>
        </View>
        <Button title="find" onPress={onPress} />
      </View>
    );
  } else if (youtube && provider === 'youtube') {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: youtube.thumbnails}}
            style={{flex: 1, margin: 5}}
          />
          <View>
            <View
              style={{
                height: 30,
                width: 70,
                margin: 5,
              }}>
              <Text>{youtube.title}</Text>
            </View>
            <View
              style={{
                height: 30,
                width: 70,
                margin: 5,
              }}>
              <Text>{youtube.description}</Text>
            </View>
          </View>
        </View>
        <Button title="find" onPress={onPress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.inputWrapper}>
        {!isLink ? (
          <TextInput
            placeholder={'Enter ' + name}
            onChangeText={handleInputChange}
          />
        ) : (
          <Button title="find" onPress={onPress} />
        )}
      </View>
      <View
        style={{
          marginHorizontal: 5,
          padding: 10,
          backgroundColor: '#cecece',
          // borderBottomLeftRadius: 10,
          // borderBottomRightRadius: 10,
          alignItems: 'flex-end',
          ...style,
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
