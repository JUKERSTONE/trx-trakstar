import React, {useRef} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {config} from './Input.config';
import {VHeader} from '../typography';

export interface InputProps {
  option: 'default' | 'active' | 'value' | 'disable' | 'error';
  isDarkMode?: boolean;
  isPassword?: boolean;
  label: string;
  onChangeText: any;
  inputHeight?: number;
  backgroundColor?: string;
  color?: string;
  opacity?: number;
}

export const Input: React.FC<InputProps> = ({
  option = 'default',
  isDarkMode,
  isPassword,
  label,
  onChangeText,
  inputHeight,
  backgroundColor,
  color,
  opacity,
}) => {
  const style = config(option, isDarkMode, inputHeight, backgroundColor, color);
  const lastNameRef: any = useRef();
  return (
    <TouchableOpacity onPress={() => lastNameRef.current!.focus()}>
      <SafeAreaView style={{opacity: opacity}}>
        <View style={style.outerContainer}>
          <View style={style.innerContainer}>
            <View>
              <View style={style.label}>
                <VHeader type="five" color={'grey'} text={label} />
              </View>
              <TextInput
                style={style.input}
                onChangeText={onChangeText}
                // value={text}
                secureTextEntry={isPassword}
                ref={lastNameRef}
              />
            </View>
            {option === 'error' && <Text style={style.icon}>icon</Text>}
          </View>
        </View>
        {option === 'error' && (
          <Text style={style.error}>Please, enter a valid data!</Text>
        )}
      </SafeAreaView>
    </TouchableOpacity>
  );
};
