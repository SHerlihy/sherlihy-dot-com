export const isBitSet = (number: number, position: number) =>
  (number & (1 << position)) !== 0;
