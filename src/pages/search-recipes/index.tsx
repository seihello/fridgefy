import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import CuisineFilter from "@/components/filters/cuisine-filter";

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
    <Container
      p="xl"
    >
      Search Recipes
      <CuisineFilter />
    </Container>
  )
}