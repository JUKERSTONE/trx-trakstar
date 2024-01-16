import React, {FC} from 'react';
import {Text} from 'react-native';
import {Showcase} from '../showcase/Showcase';

interface TTrack {
  tape: any;
  lyrics: string;
}

export const TrackView: FC<TTrack> = ({tape, lyrics}) => {
  return (
    <Showcase tape={tape}>
      <Text>{lyrics}</Text>
    </Showcase>
  );
};
