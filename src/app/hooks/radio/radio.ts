import {handleGetTimeline, useLITELISTState} from '../..';
import {api, useAPI} from '../../../api';
import {
  store,
  setTimeline,
  useAsyncStorage,
  asyncStorageIndex,
  handleSetBasket,
  handleMediaPlayerAction,
  setTraklist,
} from '../../../stores';

export const handleGetTRXRadio = async () => {
  const {useGET} = useAPI();
  const {handleGetState} = useLITELISTState();
  const keys = handleGetState({index: 'keys'});

  const {handleGet, handleStore} = useAsyncStorage();

  console.log('🚀 ~ file: radio.ts:17 ~ handleGetTRXRadio ~ keys:', keys);

  const seriliazedRadio = await handleGet({
    key: asyncStorageIndex.radio,
  });
  console.log(
    '🚀 ~ file: radio.ts:25 ~ handleGetTRXRadio ~ seriliazedRadio:',
    seriliazedRadio,
  );

  if (seriliazedRadio) {
    console.log(
      '🚀 ~ file: radio.ts:31 ~ handleGetTRXRadio ~ seriliazedRadio:',
      seriliazedRadio,
    );

    const radioParams = JSON.parse(seriliazedRadio);
    console.log('🚀 ~ handleGetTRXRadio ~ radioParams:', radioParams);

    const trx = radioParams.trx;
    console.log('🚀 ~ handleGetTRXRadio ~ trx:', trx);
    const traklist = radioParams.traklist;
    console.log('🚀 ~ handleGetTRXRadio ~ traklist:', traklist);
    const index = radioParams.index;
    console.log('🚀 ~ handleGetTRXRadio ~ index:', index);

    // use old radio first

    console.log('🚀 ~ file: radio.ts:33 ~ trx ~ trx:', trx);
    const action1 = handleMediaPlayerAction({
      playbackState: 'pause:force',
    });

    store.dispatch(action1);
    const action = setTraklist({
      traklist,
      activeIndex: index,
      radio: trx,
    });
    store.dispatch(action);
    return;
  }

  const route = api.bernie({method: 'trx-radio'});
  console.log('🚀 ~ file: radio.ts:39 ~ handleGetTRXRadio ~ route:', route);
  const response = await useGET({route, token: keys.trx.accessToken}).catch(
    err => {
      console.log('🚀 ~ file: radio.ts:41 ~ handleGetTRXRadio ~ err:', err);
    },
  );
  console.log(
    '🚀 ~ file: radio.ts:15 ~ handleGetTRXRadio ~ response:',
    response,
  );

  const trx = response.data.radio.root;
  const traklist = response.data.traklist;

  const playerService = traklist.map((item: any) => {
    const trak = JSON.parse(item.serialized_trak).TRAK;
    console.log('🚀 ~ file: radio.ts:27 ~ trx ~ trak:', trak);
    return {
      player: {
        title: trak.trak.title,
        artist: trak.trak.artist,
        cover_art: trak.trak.thumbnail,
        geniusId: trak.trak.genius.id,
      },
      service: {provider: 'youtube', url: trak.trak.youtube.url},
      id: item.id,
    };
  });
  console.log('🚀 ~ file: radio.ts:33 ~ trx ~ trx:', trx);
  const action1 = handleMediaPlayerAction({
    playbackState: 'pause:force',
  });

  store.dispatch(action1);
  const action = setTraklist({
    traklist: playerService,
    activeIndex: 0,
    radio: trx,
  });

  store.dispatch(action);

  await handleStore({
    key: asyncStorageIndex.radio,
    value: {
      trx,
      traklist: playerService,
      index: 0,
    },
  });
};
