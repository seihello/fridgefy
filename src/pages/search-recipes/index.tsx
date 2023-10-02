import { useEffect, useState } from "react";
import { Stack, Flex } from "@mantine/core";
import CuisineFilter from "@/components/search-recipes/filters/cuisine-filter";
import IntoleranceFilter from "@/components/search-recipes/filters/intolerance-filter";
import FilteredRecipes from "@/components/search-recipes/filtered-recipes";
import FridgeFilter from "@/components/search-recipes/filters/fridge-filter";
import IngredientFilter from "@/components/search-recipes/filters/ingredient-filter";

export default function SearchRecipes() {

  return (
    <Stack
      p="xl"
    >
      Search Recipes
      <Flex align="center" columnGap="sm">
        <CuisineFilter />
        <IntoleranceFilter />
        <IngredientFilter />
        <FridgeFilter />
      </Flex>

      <FilteredRecipes />
    </Stack>
  )
}