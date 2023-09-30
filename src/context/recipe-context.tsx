import React, { createContext, useState, ReactNode } from "react";


type RecipeContextProps = {
  selectedCuisines: string[];
  setSelectedCuisines: (selectedCuisines: string[]) => void;
  selectedIntolerances: string[];
  setSelectedIntolerances: (selectedIntolerances: string[]) => void;
}

export const RecipeContext = createContext<RecipeContextProps>({} as RecipeContextProps);

export function RecipeContextProvider({ children }: { children: ReactNode }) {
  
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);

  return (
    <RecipeContext.Provider
      value={{
        selectedCuisines,
        setSelectedCuisines,
        selectedIntolerances,
        setSelectedIntolerances
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
