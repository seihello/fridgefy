import type { AppProps } from 'next/app'
import Navigation from '@/components/Navigation'
import { Flex, MantineProvider } from '@mantine/core'
import { FridgeContextProvider } from '@/context/fridge-context'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
      >
        <FridgeContextProvider>
          <Flex>
            <aside>
              <Navigation />
            </aside>
            <main>
              <Component {...pageProps} />
            </main>
          </Flex>
        </FridgeContextProvider>
      </MantineProvider>

    </>
  );
}

