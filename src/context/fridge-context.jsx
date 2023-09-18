import React, { createContext, useReducer } from "react";

export const FridgeContext = createContext();

export function FridgeContextProvider({ children }) {
  const myFridgeReducer = function (state, action) {
    switch (action.type) {
      case "add":
      
        const foundIngredient = state.find(
          (ingredient) => ingredient.ingredient === action.payload.ingredient
        );
        if (!foundIngredient) {
          const newFridge = [...state, action.payload];
          return newFridge;
        } else {
          alert(`${action.payload.ingredient} has already been in My Fridge.`);
          return state;
        }

      case "remove":
        const newFridge = state.filter(
          (ingredient) => ingredient.ingredient !== action.payload.ingredient
        );
        return newFridge;

      default:
        return state;
    }
  };

  const [myFridge, myFridgeDispatch] = useReducer(
    myFridgeReducer,
  );

  return (
    <FridgeContext.Provider
      value={{ myFridge, myFridgeDispatch }}
    >
      {children}
    </FridgeContext.Provider>
  );
}
