import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navigation from '@/components/nav/navigation'
import { Box, Flex, MantineProvider } from '@mantine/core'
import { FridgeContextProvider } from '@/context/fridge-context'
import { RecipeContextProvider } from '@/context/recipe-context'

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
      </MantineProvider>

    </>
  );
}

