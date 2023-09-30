import React, { useState } from 'react'
import { Flex } from '@mantine/core'
import { useContext, useEffect } from 'react';
import { RecipeContext } from '@/context/recipe-context';
import axios from 'axios';
import FilteredRecipe from './filtered-recipe';

export default function FilteredRecipes() {

  const { selectedCuisines, selectedIntolerances } = useContext(RecipeContext);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await axios('/recipes.json');
        setFilteredRecipes(result.data.results);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchRecipes();
  }, [selectedCuisines, selectedIntolerances]);

  return (
    <Flex wrap="wrap" rowGap='xl' columnGap='md'>
      {filteredRecipes.map((filteredRecipe) => {
        return (
          <FilteredRecipe
            title={filteredRecipe.title}
            image={filteredRecipe.image}
          />
        );
      })}
    </Flex>
  )
}
