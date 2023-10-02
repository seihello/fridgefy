import React from 'react'
import { MultiSelect } from "@mantine/core";
import { useContext } from 'react';
import { RecipeContext } from '@/context/recipe-context';
import useIngredientOptions from '@/hooks/useIngredientOptions';
import IngredientOption from '../../common/ingredient-option';

export default function IngredientFilter() {

  const ingredientOptions = useIngredientOptions();

  const { setSelectedIngredients } = useContext(RecipeContext);

  return (
    <MultiSelect
      w={320}
      itemComponent={IngredientOption}
      placeholder="Ingredient"
      data={ingredientOptions}
      onChange={setSelectedIngredients}
      limit={10}
      clearable
      searchable
    />
  )
}
