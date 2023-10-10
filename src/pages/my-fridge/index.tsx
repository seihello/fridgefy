import { Stack, Title, Text, Flex } from "@mantine/core";
import IngredientSearchBox from "@/components/my-fridge/search-ingredient";
import IngredientList from "@/components/my-fridge/ingredient-list";

export default function MyFridge() {

  return (
    <Stack
      p="xl"
    >
      <Flex align='flex-end' columnGap='lg'>
        <Title order={2}>Add Ingredients to Your Fridge</Title>
        <Text >*Please login to save my fridge</Text>
      </Flex>
      <IngredientSearchBox />
      <IngredientList />
    </Stack>
  )
}