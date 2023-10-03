import React, { createContext, useReducer, ReactNode, useEffect } from "react";

import { getDatabase, ref, set, get } from "firebase/database";

type State = string[];
type Action =
  | {
    type: 'set';
    payload: string[];
  }
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
      case 'set':
        return action.payload;
      case 'add':
        const foundIngredient = state.find(
          (ingredient: string) => ingredient === action.payload
        );
        if (!foundIngredient) {
          const newFridge = [...state, action.payload];
          addIngredientToDd("momoiropuchoman@gmail.com", newFridge);
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

  useEffect(() => {
    const fetchIngredients = async () => {
      const email = "momoiropuchoman@gmail.com";
      
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(email))
        .then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedHexEmail = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          console.log(hashedHexEmail);
          const db = getDatabase();
          get(ref(db, `${hashedHexEmail}/myfridge`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              let ingredients: string[] = snapshot.val().ingredients;

              myFridgeDispatch({
                type: 'set',
                payload: ingredients
              });
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
        });
    }
    fetchIngredients();
  }, [])

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