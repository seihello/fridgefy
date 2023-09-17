import type { AppProps } from 'next/app'
import Navigation from '@/components/Navigation'
import { Flex, MantineProvider } from '@mantine/core'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
      >
        <Flex>
          <aside>
            <Navigation />
          </aside>
          <main>
            <Component {...pageProps} />
          </main>
        </Flex>
      </MantineProvider>

    </>
  );
}

