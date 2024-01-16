import {storiesOf} from '@storybook/react-native';
import {ScrollView, View} from 'react-native';
import React from 'react';
import CenterView from '../../../storybook/stories/0.CenterView';
import {BHeader} from './BHeader';
import {Body} from './Body';
import {Caption} from './Caption';
import {Paragraph} from './Paragraph';
import {VHeader} from './VHeader';

storiesOf('Typography', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Visual Header', () => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
      }}>
      <VHeader text="Visual Header 1" type="one" color="red" />
      <View style={{height: 20}} />
      <VHeader text="Visual Header 2" type="two" />
      <View style={{height: 20}} />
      <VHeader text="Visual Header 3" type="three" />
      <View style={{height: 20}} />
      <VHeader text="Visual Header 4" type="four" />
      <View style={{height: 20}} />
      <VHeader text="Visual Header 5" type="five" />
      <View style={{height: 20}} />
      <VHeader text="Visual Header 6" type="six" />
    </ScrollView>
  ))
  .add('Body Header', () => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
      }}>
      <BHeader text="Body Header 3" type="three" color="red" />
      <View style={{height: 20}} />
      <BHeader text="Body Header 4" type="four" />
      <View style={{height: 20}} />
      <BHeader text="Body Header 5" type="five" />
    </ScrollView>
  ))
  .add('Body', () => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
      }}>
      <Body
        text="(Body 1) The quick little brown fox jumps over the back of the lazy dog."
        type="one"
        color="red"
      />
      <View style={{height: 20}} />
      <Body
        text="(Body 2) The quick little brown fox jumps over the back of the lazy dog."
        type="two"
      />
    </ScrollView>
  ))
  .add('Paragraph', () => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
      }}>
      <Paragraph
        text="(Paragraph 1) The quick little brown fox jumps over the back of the lazy dog."
        type="one"
        color="red"
      />
      <View style={{height: 20}} />
      <Paragraph
        text="(Paragraph 1B) The quick little brown fox jumps over the back of the lazy dog."
        type="oneB"
      />
      <View style={{height: 20}} />
      <Paragraph
        text="(Paragraph 2) The quick little brown fox jumps over the back of the lazy dog."
        type="two"
      />
      <View style={{height: 20}} />
      <Paragraph
        text="(Paragraph 3) The quick little brown fox jumps over the back of the lazy dog."
        type="three"
      />
    </ScrollView>
  ))
  .add('Caption', () => (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 10,
      }}>
      <Caption
        text="(Caption 1) The quick little brown fox jumps over the back of the lazy dog."
        type="one"
      />
      <View style={{height: 20}} />
      <Caption
        text="(Caption 2) The quick little brown fox jumps over the back of the lazy dog."
        type="two"
      />
    </ScrollView>
  ));
