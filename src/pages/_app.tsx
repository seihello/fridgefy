import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navigation from '@/components/nav/navigation'
import { Box, Flex, MantineProvider } from '@mantine/core'
import { FridgeContextProvider } from '@/context/fridge-context'
import { RecipeContextProvider } from '@/context/recipe-context'
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { UserContextProvider } from '@/context/user-context'

const firebaseConfig = {
  apiKey: "AIzaSyAUXI07eMpVmh0qiIgvqQUBc4RDdjCA1qY",
  authDomain: "fridgefy-2a2a1.firebaseapp.com",
  projectId: "fridgefy-2a2a1",
  storageBucket: "fridgefy-2a2a1.appspot.com",
  messagingSenderId: "985145473165",
  appId: "1:985145473165:web:e574f34c3f4f9a68178ac4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Fridgefy | Search Today's Recipe</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
      >
        <UserContextProvider>
          <FridgeContextProvider>
            <RecipeContextProvider>
              <Flex>
                <aside>
                  <Navigation />
                </aside>
                <Box
                  component='main'
                  ml={300}
                  w='100%'>
                  <Component {...pageProps} />
                </Box>
              </Flex>
            </RecipeContextProvider>
          </FridgeContextProvider>
        </UserContextProvider>
      </MantineProvider>

    </>
  );
}

