import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  useLITELISTState,
  handleAppendTRAKLIST,
  useEffectAsync,
  handleGetTRX01,
} from '../../app';

export const useLandingTRXCategories = ({navigation, route}: any) => {
  const data = [
    {
      title: 'TRX-00',
      subtitle: '[ MUSIC DATA ]',
      image:
        'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media&token=f81e029a-3f3c-481d-997c-715815bc7598',
      navigationPath: 'TRX00',
    },
    {
      title: 'TRX-01',
      subtitle: '[ AI MUSIC ]',
      image:
        'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media&token=f81e029a-3f3c-481d-997c-715815bc7598',
      navigationPath: 'TRX01',
    },
    {
      title: 'TRX-02',
      subtitle: '[ TRX ORIGINALS ]',
      image:
        'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media&token=f81e029a-3f3c-481d-997c-715815bc7598',
      navigationPath: 'TRX02',
    },
    {
      title: 'TRX-00',
      subtitle: '[ MUSIC DATA ]',
      image:
        'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media&token=f81e029a-3f3c-481d-997c-715815bc7598',
      navigationPath: 'TRX00',
    },
  ];
  return {
    data,
  };
};
