import React, { createContext, useReducer, ReactNode } from "react";

type State = string[];
type Action =
  | {
    type: 'add';
    payload: string;
  }
  | {
    type: 'remove';
    payload: string;
  };

type FridgeContextProps = {
  myFridge: State,
  myFridgeDispatch: (action: Action) => void
}

export const FridgeContext = createContext<FridgeContextProps>({} as FridgeContextProps);

export function FridgeContextProvider({ children }: { children: ReactNode }) {
  const myFridgeReducer = function (state: State, action: Action) {
    switch (action.type) {
      case 'add':

        const foundIngredient = state.find(
          (ingredient: string) => ingredient === action.payload
        );
        if (!foundIngredient) {
          const newFridge = [...state, action.payload];
          return newFridge;
        } else {
          alert(`${action.payload} has already been in My Fridge.`);
          return state;
        }

      case 'remove':
        const newFridge = state.filter(
          (ingredient: string) => ingredient !== action.payload
        );
        return newFridge;

      default:
        return state;
    }
  };

  const [myFridge, myFridgeDispatch] = useReducer(myFridgeReducer, []);

  return (
    <FridgeContext.Provider
      value={{ myFridge, myFridgeDispatch }}
    >
      {children}
    </FridgeContext.Provider>
  );
}
