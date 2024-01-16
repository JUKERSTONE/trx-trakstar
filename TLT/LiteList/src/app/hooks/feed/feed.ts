import {handleGetTimeline} from '../../';
import {store, setTimeline} from '../../../stores';

export const handleFeed = async () => {
  const timeline: any = await handleGetTimeline();

  const sortedTimeline = timeline.sort((a: any, b: any) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.postedAt) - new Date(a.postedAt);
  });
  console.log(
    '🚀 ~ file: feed.ts:12 ~ sortedTimeline ~ sortedTimeline:',
    sortedTimeline,
  );

  const action = setTimeline({timeline: sortedTimeline});
  store.dispatch(action);
};
