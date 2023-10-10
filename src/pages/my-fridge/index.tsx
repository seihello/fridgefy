import { Stack, Title } from "@mantine/core";
import IngredientSearchBox from "@/components/my-fridge/search-ingredient";
import IngredientList from "@/components/my-fridge/ingredient-list";

export default function MyFridge() {

  return (
    <Stack
      p="xl"
    >
      <Title order={2}>Add Ingredients to Your Fridge</Title>
      <IngredientSearchBox />
      <IngredientList />
    </Stack>
  )
}