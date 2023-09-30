import React, { createContext, useState, ReactNode } from "react";


type RecipeContextProps = {
  selectedCuisines: string[];
  setSelectedCuisines: (selectedCuisines: string[]) => void;
  selectedIntolerances: string[];
  setSelectedIntolerances: (selectedIntolerances: string[]) => void;
  isFridgeFilterChecked: boolean;
  setIsFridgeFilterChecked: (fridgeFilterChecked: boolean) => void
}

export const RecipeContext = createContext<RecipeContextProps>({} as RecipeContextProps);

export function RecipeContextProvider({ children }: { children: ReactNode }) {
  
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);
  const [isFridgeFilterChecked, setIsFridgeFilterChecked] = useState<boolean>(false);

  return (
    <RecipeContext.Provider
      value={{
        selectedCuisines,
        setSelectedCuisines,
        selectedIntolerances,
        setSelectedIntolerances,
        isFridgeFilterChecked,
        setIsFridgeFilterChecked
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
