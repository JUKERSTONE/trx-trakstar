export const stripAccentsAndApostrophes = (input: string): string => {
  // Normalize the string to decompose it into base characters and diacritics
  let output = input.normalize('NFD');

  // Use a regex to remove diacritics
  output = output.replace(/[\u0300-\u036f]/g, '');

  // Remove apostrophes
  output = output.replace(/['’]/g, '');

  return output.toLowerCase();
};
