import { Stack } from "@mantine/core";
import IngredientSearchBox from "@/components/search-ingredient";
import IngredientList from "@/components/ingredient-list";

export default function MyFridge() {
  //https://spoonacular.com/cdn/ingredients_100x100/apple.jpg

  return (
    <Stack
      p="xl"
    >
      My Fridge
      <IngredientSearchBox />
      <IngredientList />
    </Stack>
  )
}