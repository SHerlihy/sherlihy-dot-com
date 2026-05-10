export const stringLineBreaksToBreakLine = (str: string): string => {
  return str.replace(/(\n|\r|\\n|\\r|0x0A|0x0D|U\+000A|U\+000D)+/g, '\n\n');
};
