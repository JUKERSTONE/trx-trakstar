export const verifyCentralized = ({ centralized }: any) => {
  const missingPrimary = [];

  switch (centralized) {
    case "spotify":
      missingPrimary.push("spotify");
      break;
    case "apple_music":
      missingPrimary.push("spotify");
      break;
    case "genius":
      missingPrimary.push("spotify");
      break;
    default:
      console.log("Unknown Centralized Source");
  }

  return missingPrimary;
};
