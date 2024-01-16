import {handleGetTimeline} from '../..';
import {
  store,
  setTimeline,
  useAsyncStorage,
  asyncStorageIndex,
  handleSetBasket,
  handleSetLocal,
} from '../../../stores';

export const handleInitTRX = async () => {
  const {handleGet} = useAsyncStorage();

  const serializedLocalFiles: any = await handleGet({
    key: '.trx',
  });

  if (!serializedLocalFiles) return;
  console.log(
    '🚀 ~ file: initTRX.ts:18 ~ handleInitTRX ~ serializedLocalFiles:',
    serializedLocalFiles,
  );

  const localFiles = JSON.parse(serializedLocalFiles);

  console.log(
    '🚀 ~ file: initTRX.ts:18 ~ handleInitTRX ~ localFiles:',
    localFiles,
  );

  const action = handleSetLocal({local: localFiles});
  store.dispatch(action);
};
