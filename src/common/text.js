export const isHexCode = (text) => {
  return (/^#([0-9a-f]{3}){1,2}$/i).test(text);
};
