import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Stack, Flex, Avatar, Text } from '@mantine/core'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  User,
  UserInfo,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAUXI07eMpVmh0qiIgvqQUBc4RDdjCA1qY",
  authDomain: "fridgefy-2a2a1.firebaseapp.com",
  projectId: "fridgefy-2a2a1",
  storageBucket: "fridgefy-2a2a1.appspot.com",
  messagingSenderId: "985145473165",
  appId: "1:985145473165:web:e574f34c3f4f9a68178ac4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const provider = new GoogleAuthProvider();


export default function UserStatusComponent() {

  const [userInfo, setUserInfo] = useState<UserInfo | null>();

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
  }, []);



  return (userInfo?.email && userInfo?.displayName && userInfo?.photoURL) ? (
    <Stack>
      <Flex
        align='center'
        columnGap='sm'
        px="xl"
        py="sm"
      >
        <Avatar src={userInfo.photoURL} radius='xl' />
        <Text c='white' size='sm'>{userInfo.displayName}</Text>
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
