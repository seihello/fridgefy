import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navigation from '@/components/Navigation'
import { Box, Flex, MantineProvider } from '@mantine/core'
import { FridgeContextProvider } from '@/context/fridge-context'

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
          <Flex>
            <aside>
              <Navigation />
            </aside>
            <Box
              component='main'
              w='100%'>
              <Component {...pageProps} />
            </Box>
          </Flex>
        </FridgeContextProvider>
      </MantineProvider>

    </>
  );
}

