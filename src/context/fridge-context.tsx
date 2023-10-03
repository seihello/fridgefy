import React, { createContext, useReducer, ReactNode } from "react";

import { getDatabase, ref, set } from "firebase/database";

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
          addIngredientToDd("hoge@gmail.com", newFridge);
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


function addIngredientToDd(email: string, ingredients: string[]) {
  crypto.subtle.digest("SHA-256", new TextEncoder().encode(email))
  .then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedHexEmail = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(hashedHexEmail);
    const db = getDatabase();
    set(ref(db, `${hashedHexEmail}/myfridge`), {
      ingredients
    });
  });
}