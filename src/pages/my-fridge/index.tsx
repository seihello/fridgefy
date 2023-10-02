import { Stack } from "@mantine/core";
import IngredientSearchBox from "@/components/my-fridge/search-ingredient";
import IngredientList from "@/components/my-fridge/ingredient-list";

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