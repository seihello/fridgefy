import React from 'react'
import Link from 'next/link';
import { Box, Center, Flex, NavLink, Stack, Title } from '@mantine/core'
import { IconType } from 'react-icons';
import { GiFruitBowl } from 'react-icons/gi'
import { RiFridgeLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';

type NavItem = {
  name: string;
  icon: IconType;
  path: string;
}
const navItems: Array<NavItem> = [
  { name: "My Fridge", icon: GiFruitBowl, path: "/exchange" },
  { name: "Search Recipes", icon: FiSearch, path: "/stock" },
]

export default function Navigation() {
  return (
    <>
      <Box>
        <Stack
          w={300}
          h='100vh'
          sx={{ borderRight: '1px solid black' }}
        >
          <Center>
            <RiFridgeLine style={{
              fontSize: '24px',
            }}/>
            <Title>Fridgefy</Title>
          </Center>
          {navItems.map((navItem, index) => (
            <NavLink
              key={index}
              label={navItem.name}
              icon={<navItem.icon />}
              href={navItem.path}
              component={Link}
              px={40}
            />
          ))}
        </Stack>
      </Box>
    </>
  )
}
