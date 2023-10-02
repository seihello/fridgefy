import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { Box, Button, Center, NavLink, Stack, Title } from '@mantine/core'
import { IconType } from 'react-icons';
import { GiFruitBowl } from 'react-icons/gi'
import { RiFridgeLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { MdMenuBook } from 'react-icons/md';

import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUXI07eMpVmh0qiIgvqQUBc4RDdjCA1qY",
  authDomain: "fridgefy-2a2a1.firebaseapp.com",
  projectId: "fridgefy-2a2a1",
  storageBucket: "fridgefy-2a2a1.appspot.com",
  messagingSenderId: "985145473165",
  appId: "1:985145473165:web:e574f34c3f4f9a68178ac4"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

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
        >
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

          <Button w={100} mx='auto' onClick={() => {
            const auth = getAuth();
            signInWithPopup(auth, provider)
              .then((result) => {
                const user = result.user;
                console.log(user);
              })
              .catch((error) => {
                console.error(error);
              });
          }}>Login</Button>
      </Stack>
    </Box >
    </>
  )
}
