import React from 'react'
import { forwardRef } from 'react';
import { Flex, Avatar, Text } from '@mantine/core';
import { ItemProps } from '@/hooks/useIngredientOptions';

const IngredientOption = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Flex align='center' columnGap='xs'>
        <Avatar
          src={`https://spoonacular.com/cdn/ingredients_100x100/${value}.jpg`}
          size='sm'
        />
        <Text>{value}</Text>
      </Flex>
    </div>
  )
);

export default IngredientOption;