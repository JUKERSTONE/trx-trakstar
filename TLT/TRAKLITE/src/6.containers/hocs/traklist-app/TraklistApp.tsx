// import React, {Component} from 'react';
// import {Text, View} from 'react-native';

// export default class TraklistApp extends Component {
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     );
//   }
// }

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TraklistApp} from '../../hooks/traklist-app/TraklistApp';

export const TraklistAppHOCContainer = ({
  InnerComponent,
  navigation,
  options,
}: any) => {
  class TraklistAppHOC extends Component {
    async componentDidMount() {
      //
    }

    render() {
      return (
        <TraklistApp navigation={() => {}}>
          <InnerComponent />
        </TraklistApp>
      );
    }
  }

  return TraklistAppHOC;
};
