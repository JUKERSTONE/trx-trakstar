import {handleGetTRX01, handleGetTRX02} from '../../firebase';
import {handleTrakStarListenAgain} from '../../firebase/getTrakstarListenAgain';
import {handleGetGenreCollections} from '../../firebase/hooks/getGenreCollections';
import {handleGetHomeStructure} from '../../firebase/hooks/getHomeStructure';
import {handleRSS} from '../rss';

interface TrakStarHomeData {
  section:
    | 'listen-again'
    | 'trending' // fb-collection-listener - set by cron-job
    | 'traklists' // trx-collection
    | 'home-banner-1' // fb-collection-listener
    | 'artists-for-you' // fb-collection-listener - works with swipe cache
    | 'new-this-week' // trx-collection
    | 'traklist-of-the-week' // trx-collection
    | 'home-banner-2' // fb-collection-listener
    | 'genre-collections'
    | 'home-banner-3' // fb-collection-listener
    | 'ai-music'
    | 'trx-og'
    | 'complex-news'
    | 'hypebeast-news';
  items: any[];
}

// console.log('🚀 ~ file: home.ts:25 ~ structure:', structure);
// const components = [
//   'listen-again',
//   'trending', // fb-collection-listener - set by cron-job
//   'traklists',
//   'home-banner-1', // fb-collection-listener
//   'artists-for-you', // fb-collection-listener - works with swipe cache
//   // 'new-this-week', // trx-collection
//   // 'traklist-of-the-week', // trx-collection
//   'home-banner-2', // fb-collection-listener
//   'genre-collections',
//   'home-banner-3', // fb-collection-listener
//   'ai-music',
//   'trx-og',
//   'complex-news',
//   'hypebeast-news',
// ];

export const handleTrakStarHome = async () => {
  const structure = await handleGetHomeStructure();
  console.log(
    '🚀 ~ file: home.ts:44 ~ handleTrakStarHome ~ structure:',
    structure,
  );
  const coreCollections = await Promise.all(
    structure.map(async section => {
      switch (section.name) {
        case 'listen-again':
          const listenAgain = await handleTrakStarListenAgain();
          return {
            section: section.name,
            items: listenAgain.map((trak: any) => ({
              uri: trak.cover_art,
              captionTop: trak.title,
              captionBottom: trak.artist,
              nav: trak.nav,
            })),
          };
        //   case 'trending':
        //     break;
        //   case 'traklists':
        //     break;
        //   case 'home-banner-1':
        //     break;
        //   case 'artists-for-you':
        //     break;
        //   case 'new-this-week':
        //     break;
        //   case 'traklist-of-the-week':
        //     break;
        //   case 'home-banner-2':
        //     break;
        case 'genre-collections':
          const genreCollections = await handleGetGenreCollections();
          console.log(
            '🚀 ~ file: home.ts:80 ~ handleTrakStarHome ~ genreCollections:',
            genreCollections,
          );
          return {
            section: section.name,
            collections: genreCollections,
          };
        //   case 'home-banner-3':
        //     break;
        case 'ai-music':
          const aiMusic = await handleGetTRX01();
          console.log(
            '🚀 ~ file: home.ts:88 ~ handleTrakStarHome ~ aiMusic:',
            aiMusic,
          );
          return {
            section: section.name,
            items: aiMusic.map((trak: any) => ({
              uri: trak.coverArtUrl,
              captionTop: trak.title,
              captionBottom: trak.bots.artist,
              nav: trak.audioUrl,
            })),
          };
        case 'trx-og':
          const ogMusic = await handleGetTRX02();
          console.log(
            '🚀 ~ file: home.ts:99 ~ handleTrakStarHome ~ ogMusic:',
            ogMusic,
          );
          return {
            section: section.name,
            items: ogMusic.map((trak: any) => ({
              uri: trak.coverArtUrl,
              captionTop: trak.title,
              captionBottom: trak.artists.artist,
              nav: trak.audioUrl,
            })),
          };
        case 'complex-news':
          const complex: any = await handleRSS();
          console.log(
            '🚀 ~ file: home.ts:110 ~ handleTrakStarHome ~ complex:',
            complex,
          );
          return {
            section: section.name,
            items: complex,
          };
        default:
          return {
            section: section.name,
            items: [],
          };
      }
    }),
  );
  console.log(
    '🚀 ~ file: home.ts:102 ~ handleTrakStarHome ~ home:',
    coreCollections,
  );

  // const tsbCollections = await handleGetTSBCollections()

  // const genreCollections = await handleGetGenreCollections();
};
