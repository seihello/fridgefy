import React, { useState } from 'react'
import { useContext, useEffect } from 'react';
import { Flex } from '@mantine/core'
import { RecipeContext } from '@/context/recipe-context';
import axios from 'axios';
import FilteredRecipe from './filtered-recipe';

export default function FilteredRecipes() {

  const { selectedCuisines, selectedIntolerances, selectedIngredients, isFridgeFilterChecked } = useContext(RecipeContext);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await axios('/recipes.json');
        setRecipes(result.data.results);
        setFilteredRecipes(result.data.results);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filterRecipes = async () => {
      const newFilteredRecipes = recipes.filter((recipe) => {
        return recipe.cuisines.some((cuisine: string) => selectedCuisines.includes(cuisine));
      });
      setFilteredRecipes(newFilteredRecipes);
    };

    filterRecipes();
  }, [selectedCuisines, selectedIntolerances, selectedIngredients, isFridgeFilterChecked]);

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
