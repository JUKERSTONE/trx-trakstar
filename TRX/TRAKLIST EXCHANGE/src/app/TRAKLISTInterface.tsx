import React, {useState, Component} from 'react';
import {View, StatusBar, Text, SafeAreaView} from 'react-native';
import {TRXPlayer} from '../elements';
import {TRXModalContainer} from '../containers';
import {store, handleMediaPlayerAction} from '../stores';

export const TRXInterfaceHOC = (InnerComponent: any) => {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  // };

  return class TRXInterfaceHOC extends Component {
    // constructor(props: any) {
    //   super(props);
    //   this.state = {
    //     playBack: store.getState().player as any,
    //   };
    // }

    handleMedia(type: string) {
      const action = handleMediaPlayerAction({playbackState: type});
      store.dispatch(action);
    }

    render() {
      return (
        <View style={[{flex: 1} /*backgroundStyle*/]}>
          <StatusBar barStyle={'dark-content'} />
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <InnerComponent {...this.props} />
            </View>
            <TRXPlayer {...this.state} handleMedia={this.handleMedia} />
          </View>
        </View>
      );
    }
  };
};
