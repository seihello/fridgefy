import React, { createContext, useState, ReactNode } from "react";


type RecipeContextProps = {
  selectedCuisines: string[];
  setSelectedCuisines: (selectedCuisines: string[]) => void;
}

export const RecipeContext = createContext<RecipeContextProps>({} as RecipeContextProps);

export function RecipeContextProvider({ children }: { children: ReactNode }) {
  
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  return (
    <RecipeContext.Provider
      value={{ selectedCuisines, setSelectedCuisines }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
