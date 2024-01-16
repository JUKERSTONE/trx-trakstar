import React, {useState, Component} from 'react';
import {View, StatusBar, Text, SafeAreaView} from 'react-native';
// import {TRXPlayer} from '../elements';
import {BernieModalContainer} from '../containers';
// import {store, handleMediaPlayerAction} from '../stores';

export const TRXInterfaceHOC = (InnerComponent: any) => {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  // };

  return class TRXInterfaceHOC extends Component {
    // handleMedia(type: string) {
    //   const action = handleMediaPlayerAction({playbackState: type});
    //   store.dispatch(action);
    // }

    render() {
      return (
        <View style={[{flex: 1} /*backgroundStyle*/]}>
          <StatusBar /*barStyle={isDarkMode ? 'light-content' : 'dark-content'}*/
          />
          <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <InnerComponent {...this.props} />
            </View>
            {/* <TRXPlayer {...this.state} handleMedia={this.handleMedia} /> */}
          </SafeAreaView>
          <BernieModalContainer {...this.props} />
        </View>
      );
    }
  };
};
