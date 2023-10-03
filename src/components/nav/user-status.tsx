import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Button, Stack, Flex, Avatar, Text } from '@mantine/core'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  UserInfo,
} from "firebase/auth";
import { UserContext } from '@/context/user-context';

const provider = new GoogleAuthProvider();

export default function UserStatusComponent() {

  const { userStatus, setUserStatus } = useContext(UserContext);

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        setUserStatus({email: user.email!, name: user.displayName!, image: user.photoURL!});
      } else {
        setUserStatus(null);
      }
    });
  }, []);

  return userStatus ? (
    <Stack>
      <Flex
        align='center'
        columnGap='sm'
        px="xl"
        py="sm"
      >
        <Avatar src={userStatus.image} radius='xl' />
        <Text c='white' size='sm'>{userStatus.name}</Text>
      </Flex>
      <Button w={100} mx='auto' onClick={() => {
        const auth = getAuth();
        signOut(auth)
          .catch((error) => {
            console.error(error);
          });
      }}>Logout</Button>
    </Stack>
  ) : (
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
  );
}
