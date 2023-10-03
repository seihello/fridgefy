import React, { createContext, useReducer, ReactNode, useEffect, useContext } from "react";
import { UserContext } from "./user-context";

import { getDatabase, ref, set, get } from "firebase/database";
import { database } from "@/pages/_app";

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

  
  const { userStatus } = useContext(UserContext);

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
          if(userStatus) {
            addIngredientToDd(userStatus?.email, newFridge);
          }
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
      crypto.subtle.digest("SHA-256", new TextEncoder().encode(userStatus?.email))
        .then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashedHexEmail = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          console.log(hashedHexEmail);
          get(ref(database, `${hashedHexEmail}/myfridge`)).then((snapshot) => {
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
  }, [userStatus])

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
      set(ref(database, `${hashedHexEmail}/myfridge`), {
        ingredients
      });
    });
}