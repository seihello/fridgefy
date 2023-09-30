import React from 'react'
import { Stack, Paper, Text, Image } from '@mantine/core';

type Props = {
  title: string;
  image: string;
}

export default function FilteredRecipe(props: Props) {
  return (
    <Paper w="23%" shadow='xl'>
      <Stack w="100%">
        <Image w="100%" fit="contain" src={props.image}></Image>
        <Text h="3rem" px='sm'>{props.title}</Text>
      </Stack>
    </Paper>
  )
}
