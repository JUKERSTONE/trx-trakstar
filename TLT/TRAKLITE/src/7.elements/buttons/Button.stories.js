import React from 'react';
import {Text} from 'react-native';

import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';

import SubmitButton from './submit';
import CenterView from '../../../storybook/stories/0.CenterView';

storiesOf('Buttons', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('submit', () => (
    <SubmitButton onPress={action('clicked-text')}>
      <Text>{text('Button text', 'REGISTER NOW!')}</Text>
    </SubmitButton>
  ));
