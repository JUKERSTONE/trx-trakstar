import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Input} from './Input';
import CenterView from '../../../storybook/stories/0.CenterView';
import {withKnobs, boolean, text, radios} from '@storybook/addon-knobs';

storiesOf('Input', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add('Dynamic Input', () => {
    const options = {
      Default: 'default',
      Active: 'active',
      Value: 'value',
      Disable: 'disable',
      Error: 'error',
    };

    return (
      <Input
        option={radios('Option', options, 'default') as any}
        label={text('Label', 'Label')}
        inputHeight={47}
        onChangeText={() => {}}
        backgroundColor="#fff"
        opacity={0.8}
      />
    );
  });
