import React from 'react'
import { Stack, Paper, Text, Image, Anchor } from '@mantine/core';

type Props = {
  title: string;
  image: string;
  link: string;
}

export default function FilteredRecipe(props: Props) {
  return (
    <Paper w="23%" shadow='xl'>
      <Anchor href={props.link} target='_blank'>
        <Stack w="100%">
          <Image w="100%" fit="contain" src={props.image}></Image>
          <Text h="3rem" c='black' px='sm'>{props.title}</Text>
        </Stack>
      </Anchor>
    </Paper>
  )
}
