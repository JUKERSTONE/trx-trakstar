import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {styles} from '../screen-wrapper/styles';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage} from '../../stores';
import {FlatList} from 'react-native-gesture-handler';
import {TokencyAction, TokencyForm} from '../mine-token/internal';
import {useSelector} from 'react-redux';

export const TRXFillElement = ({
  navigation,
  missingProviders,
  handleIDChange,
  handleSubmitTRX,
  isPreview,
  ...props
}: any) => {
  console.log(
    '🚀 ~ file: TRXFill.tsx:12 ~ missingProviders:',
    missingProviders,
  );

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // const state = useSelector((state: any) => {
  //   console.log('🚀 ~ file: useTRXFill.ts:22 ~ useTRXFill ~ state:', state);
  //   return state;
  // });
  // console.log('🚀 ~ file: useTRXFill.ts:25 ~ state ~ state:', state);
  // // console.log('🚀 ~ file: TokencyText.tsx:20 ~ suggestion:', suggestion);

  return (
    <View
      style={{
        backgroundColor: '#cecece',
        flex: 1,
        alignItems: 'center',
        marginBottom: isKeyboardVisible ? 270 : 0,
      }}>
      <FlatList
        listKey="TRAK"
        data={missingProviders}
        renderItem={({item}: any) => {
          let suffix =
            item === 'spotify' ? 'uri' : item === 'apple_music' ? 'id' : 'url';

          if (isPreview && item === 'spotify') return null;

          return (
            <TokencyForm
              name={`${item} ${suffix}`}
              provider={item}
              {...props}
              hasAction={false}
              action="SET"
              handleInputChange={(text: string) =>
                handleIDChange({text, provider: item})
              }
              isLink
              onPress={() => {
                navigation.navigate('FIND', {provider: item});
              }}
            />
          );
        }}
      />
      <View
        style={{
          height: 40,
          width: 180,
          backgroundColor: '#232323',
          borderRadius: 10,
        }}>
        <Button title="SUBMIT" onPress={handleSubmitTRX} />
      </View>
    </View>
  );
};
