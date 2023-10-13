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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Fridgefy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Hind, sans-serif",
          headings: {
            fontFamily: "Acme, sans-serif",
          },
          globalStyles: (theme) => ({
            'h1, h2': {
              letterSpacing: '1px',
            },
            'h2': {
              color: '#E6770B!important'
            },
          }),
        }}
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

