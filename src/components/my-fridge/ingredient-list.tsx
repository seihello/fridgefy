import React, { useContext } from 'react'
import { Flex } from "@mantine/core";
import { FridgeContext } from '@/context/fridge-context';
import IngredientCard from './ingredient-card';

export default function IngredientList() {
  const { myFridge } = useContext(FridgeContext);

  return (
    <Flex w='100%' gap={24} wrap='wrap'>
      {myFridge.map((ingredient: string, index) => {
        return (
          <IngredientCard key={index} name={ingredient} />
        )
      })}

    </Flex>
  )
}
