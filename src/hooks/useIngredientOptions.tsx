import { useState, useEffect } from "react";
import { SelectItemProps } from "@mantine/core";
import Papa from "papaparse";

export interface ItemProps extends SelectItemProps {
  value: string;
  label: string;
}

const useIngredientOptions = () => {

  const [ingredientOptions, setIngredientOptions] = useState<ItemProps[]>([]);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/ingredients.csv');
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = ({ target }: any) => {
          const csv: Papa.ParseResult<any> = Papa.parse(target.result, { header: true });
          const rows = csv?.data;
          setIngredientOptions(rows.map((row) => ({ value: row.ingredient, label: row.ingredient})));
        };
        reader.readAsText(blob);

      } catch (error) {
        console.error('Error fetching or reading CSV:', error);
      }
    };

    fetchCSV();
  }, []);

  return ingredientOptions;

};

export default useIngredientOptions;