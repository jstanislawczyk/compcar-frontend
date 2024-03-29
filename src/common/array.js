export const createArrayInRange = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
};
