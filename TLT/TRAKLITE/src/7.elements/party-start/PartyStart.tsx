import React, {FC} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

interface IPartyStart {
  handleInputChange: (text: string) => void;
  handleSubmitPartyForm: () => void;
}

export const PartyStart: FC<IPartyStart> = ({
  handleInputChange,
  handleSubmitPartyForm,
}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <View style={{marginBottom: 5, alignItems: 'center'}}>
          <Text style={{textAlign: 'center'}}>
            what's the capacity of your party?
          </Text>
        </View>

        <TextInput
          // onFocus={onFocus}
          multiline={false}
          onChangeText={handleInputChange}
          placeholder="enter a number"
          textAlign={'center'}
          style={{
            borderWidth: 1,
            padding: 15,
            borderColor: '#000',
            borderRadius: 10,
            color: '#1a1a1a',
            width: 300,
            alignSelf: 'center',
          }}
        />
      </View>

      <Button title="begin" onPress={handleSubmitPartyForm} />
    </View>
  );
};
