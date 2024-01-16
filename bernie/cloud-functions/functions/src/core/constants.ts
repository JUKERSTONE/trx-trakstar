import { geniusSearch } from "./handlers";

export const constants = {
  currency: {
    trak: "TRX",
    juke: "JKX",
    patron: "PTX",
  },
  centralized: {
    spotify: "spotify",
    appleMusic: "apple_music",
    genius: "genius",
  },
  api: {
    genius: {
      search: (query: string) => geniusSearch(query),
    },
    spotify: "",
    musixmatch: "",
    soundcloud: "",
    apple_music: "",
  },
};
