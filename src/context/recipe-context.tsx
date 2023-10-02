import React, { createContext, useState, ReactNode } from "react";


type RecipeContextProps = {
  selectedCuisines: string[];
  setSelectedCuisines: (selectedCuisines: string[]) => void;
  selectedIntolerances: string[];
  setSelectedIntolerances: (selectedIntolerances: string[]) => void;
  selectedIngredients: string[];
  setSelectedIngredients: (selectedIngredients: string[]) => void;
  isFridgeFilterChecked: boolean;
  setIsFridgeFilterChecked: (fridgeFilterChecked: boolean) => void
}

export const RecipeContext = createContext<RecipeContextProps>({} as RecipeContextProps);

export function RecipeContextProvider({ children }: { children: ReactNode }) {
  
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isFridgeFilterChecked, setIsFridgeFilterChecked] = useState<boolean>(false);

  return (
    <RecipeContext.Provider
      value={{
        selectedCuisines,
        setSelectedCuisines,
        selectedIntolerances,
        setSelectedIntolerances,
        selectedIngredients,
        setSelectedIngredients,
        isFridgeFilterChecked,
        setIsFridgeFilterChecked
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
