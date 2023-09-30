import React from 'react'
import { MultiSelect } from "@mantine/core";
import { useContext } from 'react';
import { RecipeContext } from '@/context/recipe-context';

export default function IntoleranceFilter() {

  const { setSelectedIntolerances } = useContext(RecipeContext);

  return (
    <MultiSelect
      w={320}
      placeholder="Introlerance"
      data={['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat']}
      onChange={setSelectedIntolerances}
    />
  )
}
