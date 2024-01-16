import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import {styles} from './styles';
import {store} from '../../stores';
// @ts-ignore
import {Picker} from '@react-native-picker/picker';
import {
  CardField,
  useStripe,
  confirmPayment,
} from '@stripe/stripe-react-native';
import {useAPI, api} from '../../api';
import {useFirebase, useTRAKLISTState} from '../../app';

export const DepositView = ({state}: any) => {
  const {usePOST} = useAPI();
  const {confirmPayment} = useStripe();

  const {handleStoreValue} = useFirebase();
  const [selectedToken, setSelectedToken] = useState('GBP');
  const [value, setValue] = useState<any>(0);
  const [unit, setUnit] = useState<any>(0);

  const {handleGetState} = useTRAKLISTState();

  const fundamentals = handleGetState({index: 'traklist_utility_coin'});

  useEffect(() => {
    console.log(
      '🚀 ~ file: DepositView.tsx ~ line 27 ~ DepositView ~ value',
      value,
    );
  });
  const handleDepositTest = async () => {
    console.log(value, 'erfoj');
    const payload = {
      price: value * 100,
      currency: 'usd',
    };
    const route = api.m3dia({
      method: 'payment_intent',
    });

    const response: any = await usePOST({route, payload}).catch(err => {});
    const clientSecret = response.data.clientSecret;
    const billingDetails = {
      email: 'test@example.com',
    };

    const {paymentIntent, error} = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails,
    });
    console.log(
      '🚀 ~ file: DepositView.tsx ~ line 67 ~ handleDepositTest ~ paymentIntent',
      paymentIntent,
      error,
    );

    if (!error) {
      alert(
        'thank you for purchasing TRAKLIST UTILITY COIN\nYour donation helps BERNARD run the music industry fairly\nkaizen.',
      );

      handleStoreValue({value: unit, tokency: 'tuc'});
    } else {
      alert('Error paying');
    }

    // console.log(
    //   '🚀 ~ file: DepositView.tsx ~ line 50 ~ handleDepositTest ~ response',
    //   response,
    // );
  };

  const handleChangeText = (text: any) => {
    setValue(text);
    const proposedTUC = text / fundamentals.price['µTUC'];
    const TUCAmount = proposedTUC.toFixed(2);
    setUnit(TUCAmount);

    console.log(
      "🚀 ~ file: DepositView.tsx ~ line 87 ~ handleChangeText ~ fundamentals.price['µTUC']",
      fundamentals.price['µTUC'],
    );
  };

  return (
    <View style={{flex: 1, width: '100%', backgroundColor: '#1a1a1a'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>DEPOSIT MONEY</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>{unit} µTUC</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            keyboardType="number-pad"
            value={value}
            placeholder={'Purchase TRAKLIST UTILITY COIN'}
            onChangeText={handleChangeText}
          />
        </View>
        <Picker
          selectedValue={selectedToken}
          onValueChange={(itemValue, itemIndex) => setSelectedToken(itemValue)}>
          <Picker.Item label="US" value="USD" />
          <Picker.Item label="GB" value="GBP" />
        </Picker>
      </View>
      {/* <Button title="deposit" onPress={handleDeposit} /> */}
      <Button title="deposit test" onPress={handleDepositTest} />

      <CardField
        postalCodeEnabled={false}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
          // alert(JSON.stringify(cardDetails));
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
    </View>
  );
};
