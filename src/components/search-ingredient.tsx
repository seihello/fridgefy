import { useState, useContext } from 'react';
import { Flex, Autocomplete, Button } from '@mantine/core';
import { FridgeContext } from "@/context/fridge-context";
import useIngredientOptions from '@/hooks/useIngredientOptions';
import IngredientOption from './ingredient-option';

export default function IngredientSearchBox() {

  const [inputIngredient, setInputIngredient] = useState<string>('');

  const fridgeContext = useContext(FridgeContext);
  if (!fridgeContext) return null;
  const { myFridgeDispatch } = fridgeContext;

  const ingredientOptions = useIngredientOptions();

  const data = ingredientOptions.map((item) => ({ ...item, value: item.ingredient }));

  const onClickedAddButton = () => {
    myFridgeDispatch({
      type: 'add',
      payload: inputIngredient
    });
  }

  return (
    <Flex columnGap='xs'>
      <Autocomplete
        placeholder="Search for Ingredient"
        itemComponent={IngredientOption}
        data={data}
        limit={10}
        w={260}
        onChange={(value) => setInputIngredient(value)}
        sx={{
          '& div[class$="itemsWrapper"]': {
            padding: 0
          },
        }}
      />
      <Button
        onClick={onClickedAddButton}
        color='orange'
      >
        Add
      </Button>
    </Flex>
  );
}