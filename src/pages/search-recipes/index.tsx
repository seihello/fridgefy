import { useContext } from "react";
import { Stack, Flex, Button } from "@mantine/core";
import { RecipeContext } from '@/context/recipe-context';
import CuisineFilter from "@/components/search-recipes/filters/cuisine-filter";
import IntoleranceFilter from "@/components/search-recipes/filters/intolerance-filter";
import FilteredRecipes from "@/components/search-recipes/filtered-recipes";
import FridgeFilter from "@/components/search-recipes/filters/fridge-filter";
import IngredientFilter from "@/components/search-recipes/filters/ingredient-filter";

export default function SearchRecipes() {

  const { setIsSearching } = useContext(RecipeContext);

  return (
    <Stack
      p="xl"
    >
      Search Recipes
      <Flex align="center" rowGap="sm" columnGap="sm" wrap="wrap">
        <CuisineFilter />
        <IntoleranceFilter />
        <IngredientFilter />
        <FridgeFilter />
        <Button color="teal" onClick={() => setIsSearching(true)}>Search</Button>
      </Flex>

      <FilteredRecipes />
    </Stack>
  )
}