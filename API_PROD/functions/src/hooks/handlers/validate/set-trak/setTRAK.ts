export const validateSetTRAK = (requiredProps: any) => {
  const isNull = (prop: any) => prop == null;
  const isValid = !requiredProps.some(isNull);

  return isValid;
};
