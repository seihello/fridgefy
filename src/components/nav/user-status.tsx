import React from 'react'
import { useEffect, useContext } from 'react';
import { Stack, NavLink, Box } from '@mantine/core'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { UserContext } from '@/context/user-context';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { FaCircleUser } from 'react-icons/fa6';

const provider = new GoogleAuthProvider();

export default function UserStatusComponent() {

  const { userStatus, setUserStatus } = useContext(UserContext);

  useEffect(() => {
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        setUserStatus({ email: user.email!, name: user.displayName!, image: user.photoURL! });
      } else {
        setUserStatus(null);
      }
    });
  }, []);

  return userStatus ? (
    <Stack spacing={0}>
      <NavLink
        label={userStatus.name}
        icon={<FaCircleUser />}
        px="xl"
        py="sm"
        variant='filled'
        c='white'
        color='orange.9'
        sx={{
          '&:hover': {
            background: 'none',
            color: 'white',
            cursor: 'default'
          }
        }}
      />
      <Box onClick={() => {
        const auth = getAuth();
        signOut(auth)
          .catch((error) => {
            console.error(error);
          });
      }}>
        <NavLink
          label='Logout'
          icon={<BiLogOut />}
          px="xl"
          py="sm"
          variant='filled'
          c='white'
          color='orange.9'
          sx={{
            '&:hover': {
              color: 'red'
            }
          }}
        />
      </Box>
    </Stack>
  ) : (
    <Box onClick={() => {
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .catch((error) => {
          console.error(error);
        });
    }}>
      <NavLink
        label='Login'
        icon={<BiLogIn />}
        px="xl"
        py="sm"
        variant='filled'
        c='white'
        color='orange.9'
        sx={{
          '&:hover': {
            color: 'red'
          }
        }}
      />
    </Box>
  );
}
