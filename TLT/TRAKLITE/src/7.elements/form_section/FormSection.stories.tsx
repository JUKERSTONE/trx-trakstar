import React from 'react';

import {storiesOf} from '@storybook/react-native';
import FormSection from '../form_section';
import CenterView from '../../../../storybook/stories/0.CenterView';

storiesOf('FormSection', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('username', () => (
    <FormSection label="username" type="" name="" formType="register" />
  ));
