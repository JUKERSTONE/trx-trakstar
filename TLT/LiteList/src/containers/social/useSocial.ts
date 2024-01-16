import React, {useEffect, useState, useContext} from 'react';
import {useLITELISTState} from '../../app';
import {useFirebase} from '../../app';
import moment from 'moment';
import {Alert} from 'react-native';

export const useSocial = ({navigation, route}: any) => {
  const {handleAddStory, handleRetrieveStory} = useFirebase();
  const [social, setSocial] = useState<any>([]);
  useEffect(() => {
    handleGetStories();
  }, []);

  const handleGetStories = async () => {
    const stories = await handleRetrieveStory();
    console.log(
      '🚀 ~ file: useSocial.ts ~ line 14 ~ handleGetStories ~ stories',
      stories,
    );
    // filter for 24 hour period only

    const filteredStory = stories.filter((story: any) => {
      const fromNow = moment(story.createdAt).fromNow(true);
      console.log(
        '🚀 ~ file: useSocial.ts ~ line 24 ~ filteredStory ~ fromNow',
        fromNow,
      );
      // const hours = fromNow.split(' ')[0];
      const mode = fromNow.split(' ')[1];
      if (mode === 'minutes' || mode === 'hours' || mode === 'hour') {
        return story;
      }
    });
    console.log(
      '🚀 ~ file: useSocial.ts ~ line 29 ~ filteredStory ~ filteredStory',
      filteredStory,
    );
    setSocial({
      owner: filteredStory,
    });
  };

  const data = [
    {
      image: 'user.image',
      user: 'user.meloID',
    },
    {
      imagwe: 'user.image',
      uswer: 'user.meloID',
    },
    {
      imdfage: 'user.image',
      useer: 'user.meloID',
    },
  ];

  const ITEM_WIDTH = 90;
  const ITEM_HEIGHT = 100;
  const STICKY_ITEM_WIDTH = 24;
  const STICKY_ITEM_HEIGHT = 24;
  const STICKY_ITEM_BACKGROUNDS = ['#222', '#000'];
  const SEPARATOR_SIZE = 10;
  const BORDER_RADIUS = 40;

  const handleStoryOption = () => {
    Alert.alert('TRAKLIST STORIES', `Post or View?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'POST',
        onPress: async () => {
          handleAddStory();
        },
      },
      {
        text: 'VIEW',
        onPress: async () => {
          navigation.navigate('MODAL', {
            type: 'story-view',
            exchange: {
              active: true,
              item: social.owner,
            },
          });
        },
      },
    ]);
  };

  return {
    data,
    ITEM_WIDTH,
    ITEM_HEIGHT,
    STICKY_ITEM_WIDTH,
    STICKY_ITEM_HEIGHT,
    STICKY_ITEM_BACKGROUNDS,
    SEPARATOR_SIZE,
    BORDER_RADIUS,
    handleStoryOption,
    social,
  };
};
