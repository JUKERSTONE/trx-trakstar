export const getSeedArray = (tracks: any, indicies: any, loggedIn: boolean) => {
  const feeder: any = [];
  indicies.map((number: any, key: any) => {
    if (loggedIn) {
      const id = tracks[number]
        ? tracks[number].id ?? tracks[number].trackID
        : null;
      feeder.push(id);
    } else feeder.push(tracks[number]);
  });
  return feeder;
};
