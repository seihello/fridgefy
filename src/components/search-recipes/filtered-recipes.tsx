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
  addRecipeInformation: boolean;
}

export default function FilteredRecipes() {

  const { selectedCuisines, selectedIntolerances, selectedIngredients, isFridgeFilterChecked, isSearching, setIsSearching } = useContext(RecipeContext);
  const { myFridge } = useContext(FridgeContext);
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await axios('/recipes.json');
        setRecipes(result.data.results);
      } catch (error) {
        console.error(error);
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
          sort: "popularity",
          addRecipeInformation: true
        };
        const result = await axios('/api/recipes?' + queryString.stringify(query, { arrayFormat: 'comma' }));
        setRecipes(result.data.results);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    };

    if (isSearching) {
      fetchRecipes();
    }
  }, [isSearching]);

  return (
    <Flex wrap="wrap" rowGap='xl' columnGap='md'>
      {recipes.map((recipe, index) => {
        return (
          <FilteredRecipe
            key={index}
            title={recipe.title}
            image={recipe.image}
            link={recipe.sourceUrl}
          />
        );
      })}
    </Flex>
  )
}
