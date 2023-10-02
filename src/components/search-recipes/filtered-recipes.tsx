import React, { useState } from 'react'
import { useContext, useEffect } from 'react';
import { Flex } from '@mantine/core'
import { RecipeContext } from '@/context/recipe-context';
import { FridgeContext } from '@/context/fridge-context';
import axios from 'axios';
import queryString from 'query-string';
import FilteredRecipe from './filtered-recipe';

type Query = {
  cuisine: string[] | undefined;
  intolerances: string[] | undefined;
  includeIngredients: string[] | undefined;
  number: number;
  sort: string;
  apiKey: string | undefined;
}

const API_KEYS: string[] = process.env.NEXT_PUBLIC_API_KEYS!.split(",");

export default function FilteredRecipes() {

  const { selectedCuisines, selectedIntolerances, selectedIngredients, isFridgeFilterChecked, isSearching, setIsSearching } = useContext(RecipeContext);
  const { myFridge } = useContext(FridgeContext);
  const [recipes, setRecipes] = useState<any[]>([]);

  const [apiKeyIndex, setApiKeyIndex] = useState<number>(0);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await axios('/recipes.json');
        setRecipes(result.data.results);
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
          includeIngredients: isFridgeFilterChecked ? selectedIngredients.concat(myFridge) : selectedIngredients,
          number: 100,
          sort: "random",
          apiKey: API_KEYS[apiKeyIndex]
        };
        const result = await axios('https://api.spoonacular.com/recipes/complexSearch?' + queryString.stringify(query, { arrayFormat: 'comma' }));
        setRecipes(result.data.results);
        setIsSearching(false);
      } catch (error: any) {
        if (error.response?.status === 402 && apiKeyIndex < API_KEYS.length - 1) {
          setApiKeyIndex(apiKeyIndex + 1);
        } else {
          console.log(error);
          setIsSearching(false);
        }
      }
    };

    if (isSearching) {
      fetchRecipes();
    }
  }, [isSearching, apiKeyIndex]);

  return (
    <Flex wrap="wrap" rowGap='xl' columnGap='md'>
      {recipes.map((recipe) => {
        return (
          <FilteredRecipe
            title={recipe.title}
            image={recipe.image}
          />
        );
      })}
    </Flex>
  )
}
