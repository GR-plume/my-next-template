import type { AppProps } from 'next/app'
import { Provider } from '../store'
import React from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <React.StrictMode>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </React.StrictMode>
    )
}