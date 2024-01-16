export const geniusSearch = (query: string) => {
  const token =
    "Td_3LCV6W-ycC23T33ieBgf-mmsp3Dkct7NTDiyDt0TCQfeYfLbLHiGPbYR7I8Wb";
  const route =
    "http://api.genius.com/search?q=" + query + "&access_token=" + token;
  return route;
};
