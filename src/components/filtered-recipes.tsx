import React from 'react'
import { Flex } from '@mantine/core'
import { useContext, useEffect } from 'react';
import { RecipeContext } from '@/context/recipe-context';
import axios from 'axios';

export default function FilteredRecipes() {

  const { selectedCuisines, selectedIntolerances } = useContext(RecipeContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        console.log("fetch");
        const result = await axios('/recipes.json');
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchRecipes();
  }, [selectedCuisines, selectedIntolerances]);

  return (
    <Flex>

    </Flex>
  )
}
