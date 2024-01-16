interface Errors {
  [key: string]: string;
}

const isEmail = (email: string) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string: string) => {
  if (string.trim() == "") return true;
  else return false;
};

export const validateRegistrationData = (data: any) => {
  let errors: Errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }

  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password !== data.confirm_password)
    errors.confirm_password = "Passwords must match";
  if (isEmpty(data.username)) errors.username = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateLogInData = (data: any) => {
  let errors: Errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const reduceUserDetails = (data: any) => {
  let userDetails: any = {};

  if (!isEmpty(data.playlist.trim())) userDetails.playlist = data.playlist;

  if (!isEmpty(data.topTracks.trim())) userDetails.topTracks = data.topTracks;

  if (!isEmpty(data.recentlyPlayed.trim()))
    userDetails.recentlyPlayed = data.recentlyPlayed;

  if (!isEmpty(data.topArtists.trim()))
    userDetails.topArtists = data.topArtists;

  // if (!isEmpty(data.acousticness.trim()))
  //   userDetails.gamification.acousticness = data.acousticness;
  // if (!isEmpty(data.energy.trim()))
  //   userDetails.gamification.energy = data.energy;
  // if (!isEmpty(data.instrumentalness.trim()))
  //   userDetails.gamification.instrumentalness = data.instrumentalness;
  // if (!isEmpty(data.liveness.trim()))
  //   userDetails.gamification.liveness = data.liveness;
  // if (!isEmpty(data.loudness.trim()))
  //   userDetails.gamification.loudness = data.loudness;
  // if (!isEmpty(data.speechiness.trim()))
  //   userDetails.gamification.speechiness = data.speechiness;

  return userDetails;
};
