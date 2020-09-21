export const getLocalStorage = (index: string): string[] => {
  const stringData = localStorage.getItem(index);
  const arrayData = stringData ? (JSON.parse(stringData) as string[]) : [];

  return arrayData;
};
