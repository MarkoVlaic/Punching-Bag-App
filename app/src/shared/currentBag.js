import { createContext, useContext } from 'react';

export const CurrentBagContext = createContext(null);
export const CurrentBagProvider = CurrentBagContext.Provider;

export const useCurrentBag = () => {
  const values = useContext(CurrentBagContext);
  return values;
};
