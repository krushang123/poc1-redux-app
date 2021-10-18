import * as React from "react"
import { AppProps } from "next/app"
import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import "focus-visible/dist/focus-visible"

import store from "app/store"
import { useApollo } from "apollo/client"
import Layouts from "layouts"

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider>
          <Layouts>
            <Component {...pageProps} />
          </Layouts>
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
