import React, { useContext } from 'react'
import { Flex } from "@mantine/core";
import { FridgeContext } from '@/context/fridge-context';
import IngredientCard from './ingredient-card';

export default function IngredientList() {
  const { myFridge, myFridgeDispatch } = useContext(FridgeContext);


  return (
    <Flex w='100%' gap={24} wrap='wrap'>
      {myFridge.map((ingredient: string) => {
        return (
          <IngredientCard name={ingredient} />
        )
      })}

    </Flex>
  )
}
