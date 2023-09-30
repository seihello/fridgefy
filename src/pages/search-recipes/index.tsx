import { useEffect, useState } from "react";
import { Stack, Flex } from "@mantine/core";
import CuisineFilter from "@/components/filters/cuisine-filter";
import IntoleranceFilter from "@/components/filters/intolerance-filter";
import FilteredRecipes from "@/components/filtered-recipes";

export default function SearchRecipes() {

  return (
    <Stack
      p="xl"
    >
      Search Recipes
      <Flex columnGap="sm">
        <CuisineFilter />
        <IntoleranceFilter />
      </Flex>

      <FilteredRecipes />
    </Stack>
  )
}