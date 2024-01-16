import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import Video from 'react-native-video';

export class TraklistInput extends Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  handleChangeText = (text: string) => {
    this.setState({
      text,
    });
  };

  // const textInputRef =

  render() {
    return (
      <TextInput onChangeText={this.handleChangeText} ref={textInputRef} />
    );
  }
}
