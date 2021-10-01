export const isValidDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
