import React from 'react';
import {TextInput} from 'react-native';

interface CaptionInputProps {
  handleInputChange: any;
  onFocus: any;
}

export const CaptionInput: React.FC<CaptionInputProps> = ({
  handleInputChange,
  onFocus,
}) => {
  return (
    <TextInput
      onFocus={onFocus}
      multiline={false}
      onChangeText={handleInputChange}
      placeholder="enter a caption"
      textAlign={'center'}
      style={{
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        height: 100,
        color: '#fff',
        width: '60%',
        alignSelf: 'center',
      }}
    />
  );
};

export default CaptionInput;
