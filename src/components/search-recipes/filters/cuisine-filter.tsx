import React from 'react'
import { MultiSelect } from "@mantine/core";
import { useContext } from 'react';
import { RecipeContext } from '@/context/recipe-context';

export default function CuisineFilter() {

  const { setSelectedCuisines } = useContext(RecipeContext);

  return (
    <MultiSelect
      maw={320}
      placeholder="Cuisine"
      data={['African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese']}
      onChange={setSelectedCuisines}
      clearable
    />
  )
}
