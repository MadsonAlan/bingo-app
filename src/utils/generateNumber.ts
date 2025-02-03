export const generateBingoNumber = (): number => {
  return Math.floor(Math.random() * 75) + 1;
};