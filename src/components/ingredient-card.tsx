import React from 'react'
import { Flex, Paper, Text, Image, ActionIcon, Group } from '@mantine/core'
import { AiFillCloseCircle } from 'react-icons/ai';
import { useContext } from 'react';
import { FridgeContext } from '@/context/fridge-context';

type Props = {
  name: string;
}

export default function IngredientCard({ name }: Props) {

  const { myFridgeDispatch } = useContext(FridgeContext);

  return (
    <Paper w={300} p='sm' shadow='xl' withBorder>
      <Flex justify='space-between' align='center'>
        <Flex align='center' columnGap='sm'>
          <Text>{name}</Text>
          <Image
            src={`https://spoonacular.com/cdn/ingredients_100x100/${name}.jpg`}
            width={60}
            height={40}
            fit='contain'
          />
        </Flex>
        <ActionIcon
          onClick={() => myFridgeDispatch({
            type: 'remove',
            payload: name
          })
          }
        >
          <AiFillCloseCircle size={24} />
        </ActionIcon>

      </Flex>
    </Paper >
  )
}
