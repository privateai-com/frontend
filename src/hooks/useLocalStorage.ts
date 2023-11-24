/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState, useEffect } from 'react';

export const useLocalStorage = (key: string) => {
  const [data, setData] = useState<any>(null);

  const saveData = useCallback((newData: any) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  }, [key]);

  const addItem = useCallback((item: any) => {
    const storedData = localStorage.getItem(item.id);
    let newData = [];
    if (storedData) {
      newData = JSON.parse(storedData);
    }
    newData.push(item);
    saveData(newData);
  }, [saveData]);

  const removeItemById = useCallback((id: string) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const newData = JSON.parse(storedData).filter((item: any) => item.id !== id);
      saveData(newData);
    }
  }, [key, saveData]);

  const getItemById = useCallback((id: number) => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      const item = JSON.parse(storedData).find((item: any) => item.id === id);
      return item;
    }
    return null;
  }, [key]);

  useEffect(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [key]);

  return {
    dataStorage: data,
    addItemStorage: addItem,
    removeItemByIdStorage: removeItemById,
    getItemByIdStorage: getItemById,
  };
};
