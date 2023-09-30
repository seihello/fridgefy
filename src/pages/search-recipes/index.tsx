import { useEffect, useState } from "react";
import { Stack, Flex } from "@mantine/core";
import CuisineFilter from "@/components/filters/cuisine-filter";
import IntoleranceFilter from "@/components/filters/intolerance-filter";

export default function SearchRecipes() {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/data/recipes.json");
        const data = await response.json();
        setRecipes(data.results);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);
  return (
    <Stack
      p="xl"
    >
      Search Recipes
      <Flex columnGap="sm">
        <CuisineFilter />
        <IntoleranceFilter />
      </Flex>

      
    </Stack>
  )
}