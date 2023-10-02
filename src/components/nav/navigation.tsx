import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Center, NavLink, Stack, Title } from '@mantine/core'
import { IconType } from 'react-icons';
import { GiFruitBowl } from 'react-icons/gi'
import { RiFridgeLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { MdMenuBook } from 'react-icons/md';
import UserStatusComponent from './user-status';


type NavItem = {
  name: string;
  icon: IconType;
  path: string;
}

const navItems: Array<NavItem> = [
  { name: "My Fridge", icon: GiFruitBowl, path: "/my-fridge" },
  { name: "Search Recipes", icon: FiSearch, path: "/search-recipes" },
  { name: "My Recipes", icon: MdMenuBook, path: "/my-recipes" },
]

export default function Navigation() {

  const currentPath = useRouter().pathname;

  return (
    <>
      <Box
        component='nav'
        bg='yellow.9'
        pos='fixed'
      >
        <Stack
          w={300}
          h='100vh'
          py={20}
          sx={{ boxShadow: '3px 3px 20px 5px #e0e0e0' }}
          spacing="none"
          justify='space-between'
        >
          <Box>
            <Center py="lg" c='white'>
              <RiFridgeLine style={{
                fontSize: '24px',
              }} />
              <Title>Fridgefy</Title>
            </Center>
            {navItems.map((navItem, index) => (
              <NavLink
                key={index}
                label={navItem.name}
                active={navItem.path === currentPath}
                icon={<navItem.icon />}
                href={navItem.path}
                component={Link}
                px="xl"
                py="sm"
                variant='filled'
                c='white'
                color='orange.9'
                sx={{
                  '&:hover': {
                    color: navItem.path === currentPath ? 'white' : 'red'
                  }
                }}
              />
            ))}
          </Box>

          <UserStatusComponent />
        </Stack>
      </Box >
    </>
  )
}
