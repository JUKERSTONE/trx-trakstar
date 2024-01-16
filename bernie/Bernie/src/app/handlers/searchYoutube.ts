import axios from 'axios';

const YOUTUBE_API_KEY = 'AIzaSyCMApte4mjX2IkQiDCXcjqT8FOjnP3To3I'; // Replace with your actual API key
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const searchYouTube = async (query: string) => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 10,
        type: 'video',
        key: YOUTUBE_API_KEY,
      },
    });

    const videos = response.data.items.map(item => {
      console.log('🚀 ~ file: searchYoutube.ts:24 ~ videos ~ item:', item);

      return {
        id: `http://www.youtube.com/watch?v=${item.id.videoId}`,
        title: item.snippet.title,
        thumbnails: item.snippet.thumbnails.default.url,
        description: item.snippet.description,
      };
    });

    return videos;
  } catch (error) {
    console.error('Error: ', error.response.data);
    throw error;
  }
};
