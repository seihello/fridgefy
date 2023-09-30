import { useEffect, useState } from "react";
import { Stack, Flex } from "@mantine/core";
import CuisineFilter from "@/components/filters/cuisine-filter";
import IntoleranceFilter from "@/components/filters/intolerance-filter";
import FilteredRecipes from "@/components/filtered-recipes";
import FridgeFilter from "@/components/filters/fridge-filter";

export default function SearchRecipes() {

  return (
    <Stack
      p="xl"
    >
      Search Recipes
      <Flex align="center" columnGap="sm">
        <CuisineFilter />
        <IntoleranceFilter />
        <FridgeFilter />
      </Flex>

      <FilteredRecipes />
    </Stack>
  )
}