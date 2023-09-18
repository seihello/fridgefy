import { Container, Autocomplete } from "@mantine/core";
import IngredientSearchBox from "@/components/search-ingredient";

export default function MyFridge() {
  //https://spoonacular.com/cdn/ingredients_100x100/apple.jpg

  return (
    <Container
      p="xl"
    >
      My Fridge
      <IngredientSearchBox />
    </Container>
  )
}