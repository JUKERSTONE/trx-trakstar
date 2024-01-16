export const validateAppendTRAK = (requiredProps: any) => {
  const isNull = (prop: any) => prop == null;
  const isValidNFT = !requiredProps.some(isNull);
  const isValidWeb = !requiredProps.some(isNull);

  if (isValidNFT && isValidWeb) {
    return "both";
  } else if (isValidWeb) {
    return "web";
  } else if (isValidNFT) {
    return "nft";
  }

  return null;
};
