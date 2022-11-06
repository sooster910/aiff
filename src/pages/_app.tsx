import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { SWRConfig } from 'swr'
import { aiffAPI } from '@app/utils/aiffAPI'
import { AuthProvider } from '@app/context/AuthProvider'
import Navbar from '@app/components/Navbar'
import MobileLayout from '@app/layouts/MobileLayout'
import { useEnvironment } from '@app/../relay/environment'
import Footer from '@app/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useEnvironment(pageProps.initialRecords)

  return (
    <RelayEnvironmentProvider environment={environment}>
      <GeistProvider>
        <CssBaseline>
          <SWRConfig
            value={{
              fetcher: resource => aiffAPI.get(resource).then(res => res.data),
            }}
          >
            <AuthProvider>
              <MobileLayout maxWidth={'28rem'}>
                <Navbar />

                <Component {...pageProps} />

                <Footer />
              </MobileLayout>
            </AuthProvider>
          </SWRConfig>
        </CssBaseline>
      </GeistProvider>
    </RelayEnvironmentProvider>
  )
}

export default MyApp
