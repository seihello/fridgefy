import React from 'react'
import { MultiSelect } from "@mantine/core";
import { useContext } from 'react';
import { RecipeContext } from '@/context/recipe-context';
import useIngredientOptions from '@/hooks/useIngredientOptions';
import IngredientOption from '../ingredient-option';

export default function IngredientFilter() {

  const ingredientOptions = useIngredientOptions();

  const { setSelectedIntolerances } = useContext(RecipeContext);

  return (
    <MultiSelect
      w={320}
      itemComponent={IngredientOption}
      placeholder="Ingredient"
      data={ingredientOptions}
      // onChange={setSelectedIntolerances}
      limit={10}
      clearable
      searchable
    />
  )
}