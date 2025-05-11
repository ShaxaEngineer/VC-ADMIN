export const getLocalStorage = (key: string, parse: boolean = false) => {
  const item = localStorage.getItem(key);

  if (!item) return null;

  return parse ? JSON.parse(item) : item;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLocalStorage = (key: string, value: any, stringify: boolean = false): void => {
  localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
};

export const removeLocalStorage = (key: string): void => localStorage.removeItem(key);

export const clearLocalStorage = (): void => localStorage.clear();
