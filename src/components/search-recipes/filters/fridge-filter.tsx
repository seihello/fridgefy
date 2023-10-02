import React from 'react'
import { useContext } from 'react';
import { Checkbox } from '@mantine/core'
import { RecipeContext } from '@/context/recipe-context';

export default function FridgeFilter() {

  const { isFridgeFilterChecked, setIsFridgeFilterChecked } = useContext(RecipeContext);

  return (
    <Checkbox
      label="Use ingredients in My Fridge"
      checked={isFridgeFilterChecked}
      onChange={(event) => setIsFridgeFilterChecked(event.currentTarget.checked)}
    >
    </Checkbox>
  )
}
