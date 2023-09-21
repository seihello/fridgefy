import { Stack } from "@mantine/core";
import IngredientSearchBox from "@/components/search-ingredient";
import IngredientList from "@/components/ingredient-list";

export default function MyFridge() {

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