import React, { useState } from 'react'
import { useContext, useEffect } from 'react';
import { Flex } from '@mantine/core'
import { RecipeContext } from '@/context/recipe-context';
import axios from 'axios';
import queryString from 'query-string';
import FilteredRecipe from './filtered-recipe';

type Query = {
  cuisine: string[] | undefined;
  intolerances: string[] | undefined;
  includeIngredients: string[] | undefined;
  apiKey: string | undefined;
}

export default function FilteredRecipes() {

  const { selectedCuisines, selectedIntolerances, selectedIngredients, isFridgeFilterChecked } = useContext(RecipeContext);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

  const [apiKeyIndex, setApiKeyIndex] = useState<number>(0);

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
    const fetchRecipes = async () => {
      try {
        const query: Query = {
          cuisine: selectedCuisines,
          intolerances: selectedIntolerances,
          includeIngredients: selectedIngredients,
          apiKey: process.env.NEXT_PUBLIC_API_KEYS?.split(",")[apiKeyIndex]
        };
        console.log(queryString.stringify(query, {arrayFormat: 'comma'}));
        const result = await axios('https://api.spoonacular.com/recipes/complexSearch?' + queryString.stringify(query, {arrayFormat: 'comma'}));
        console.log(result.data);
        // setRecipes(result.data.results);
        // setFilteredRecipes(result.data.results);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchRecipes();
  }, [selectedCuisines, selectedIntolerances, selectedIngredients, isFridgeFilterChecked, apiKeyIndex]);

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
