import { useState, useContext } from 'react';
import { Flex, Autocomplete, Button } from '@mantine/core';
import { FridgeContext } from "@/context/fridge-context";
import useIngredientOptions from '@/hooks/useIngredientOptions';
import IngredientOption from '../common/ingredient-option';

export default function IngredientSearchBox() {

  const [inputIngredient, setInputIngredient] = useState<string>('');

  const fridgeContext = useContext(FridgeContext);
  if (!fridgeContext) return null;
  const { myFridgeDispatch } = fridgeContext;

  const ingredientOptions = useIngredientOptions();

  return (
    <Flex columnGap='xs'>
      <Autocomplete
        placeholder="Add Ingredient"
        itemComponent={IngredientOption}
        data={ingredientOptions}
        value={inputIngredient}
        limit={10}
        w={260}
        onChange={(value) => setInputIngredient(value)}
        onItemSubmit={(target) => {
          myFridgeDispatch({
            type: 'add',
            payload: target.value
          });
          setInputIngredient("");
        }}
        sx={{
          '& div[class$="itemsWrapper"]': {
            padding: 0
          },
        }}
      />
    </Flex>
  );
}