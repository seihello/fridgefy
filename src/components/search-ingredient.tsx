import { forwardRef, useEffect, useState, useContext } from 'react';
import { Flex, Avatar, Text, SelectItemProps, Autocomplete, Button } from '@mantine/core';
import Papa from "papaparse";
import { FridgeContext } from "@/context/fridge-context";

interface ItemProps extends SelectItemProps {
  ingredient: string;
  ingredientId: number;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, ingredient, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Flex align='center' columnGap='xs'>
        <Avatar
          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient}.jpg`}
          size='sm'
        />
        <Text>{value}</Text>
      </Flex>
    </div>
  )
);

export default function IngredientSearchBox() {

  const [ingredientOptions, setIngredientOptions] = useState<ItemProps[]>([]);
  const [inputIngredient, setInputIngredient] = useState<string>('');

  const fridgeContext = useContext(FridgeContext);
  if (!fridgeContext) return null;
  const { myFridge, myFridgeDispatch } = fridgeContext;

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/ingredients.csv');
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = ({ target }: any) => {
          const csv: Papa.ParseResult<ItemProps> = Papa.parse(target.result, { header: true });
          const parsedData = csv?.data;
          setIngredientOptions(parsedData);
        };
        reader.readAsText(blob);

      } catch (error) {
        console.error('Error fetching or reading CSV:', error);
      }
    };

    fetchCSV();
  }, []);


  const data = ingredientOptions.map((item) => ({ ...item, value: item.ingredient }));


  const onClickedAddButton = () => {
    myFridgeDispatch({
      type: 'add',
      payload: inputIngredient
    });
  }

  return (
    <Flex columnGap='xs'>
      <Autocomplete
        placeholder="Search for Ingredient"
        itemComponent={AutoCompleteItem}
        data={data}
        limit={10}
        w={260}
        onChange={(value) => setInputIngredient(value)}
        sx={{
          '& div[class$="itemsWrapper"]': {
            padding: 0
          },
        }}
      />
      <Button
        onClick={onClickedAddButton}
        color='orange'
      >
        Add
      </Button>
    </Flex>
  );
}