import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  ImageBackground,
  Image,
} from 'react-native';
import PostModal from '../../7.elements/modals/post';
import {FeedView} from '../../6.containers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useProvider} from '../../3.stores';
// @ts-ignore
import {TraklistApp} from '../../6.containers/hooks/traklist-app/TraklistApp';
import {store} from '../../3.stores';
import * as actions from '../../3.stores';

export const Timeline: React.FC<any> = ({navigation}) => {
  const {state} = useContext(useProvider);

  const modal = {
    type: 'post',
    post: {
      active: !state.modal?.post?.active,
    },
  };

  return (
    <TraklistApp navigation={navigation} hasPost>
      <View
        style={{
          backgroundColor: '#1A1A1A',
          height: Dimensions.get('window').height,
          paddingBottom: 150,
        }}>
        <View style={{height: Dimensions.get('window').height + 200}}>
          <FeedView navigation={navigation} />
        </View>

        <PostModal
          modalVisible={state.modal?.post?.active}
          setModalVisible={() =>
            store.dispatch(
              actions.TOGGLE_POST_OPTIONS('toggle post options.', modal),
            )
          }
          navigation={navigation}
          setModalVisibleWithNavigation={(type: any) => {
            let option;
            switch (type) {
              case 'song':
                option = 'Song';
                break;
            }
            store.dispatch(
              actions.TOGGLE_POST_OPTIONS('toggle post options.', modal),
            );
            state.loggedIn
              ? navigation.navigate('POST.', {type: option})
              : navigation.navigate('START', {screen: 'REGISTER.'});
          }}
        />
      </View>
    </TraklistApp>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
