import React from 'react'
import { Flex, Paper, Text, Image } from '@mantine/core'

type Props = {
  name: string;
}

export default function IngredientCard({name}: Props) {
  return (
    <Paper w={300} px='xl' py='sm' shadow='xl' withBorder>
      <Flex justify='space-between' align='center'>
        <Text>{name}</Text>
        <Image
          src={`https://spoonacular.com/cdn/ingredients_100x100/${name}.jpg`}
          maw={80}
          height={40}

          fit='contain'
        />
      </Flex>
    </Paper>
  )
}
