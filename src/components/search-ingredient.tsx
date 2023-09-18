import { forwardRef, useEffect, useState } from 'react';
import { Group, Avatar, Text, MantineColor, SelectItemProps, Autocomplete } from '@mantine/core';
import Papa from "papaparse";

interface ItemProps extends SelectItemProps {
  ingredient: string;
  ingredientId: number;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={``} />

        <div>
          <Text>{value}</Text>
        </div>
      </Group>
    </div>
  )
);

export default function IngredientSearchBox() {

  const [ingredientOptions, setIngredientOptions] = useState<ItemProps[]>([]);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/ingredients.csv');
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = ({ target }) => {
          const csv = Papa.parse(target?.result, { header: true });
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
  console.log(ingredientOptions);

  return (
    <Autocomplete
      placeholder="Search for Ingredient"
      itemComponent={AutoCompleteItem}
      data={data}
      limit={10}
    />
  );
}