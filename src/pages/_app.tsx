import Footer from '@app/components/Footer'
import Navbar from '@app/components/Navbar'
import MobileLayout from '@app/layouts/MobileLayout'
import { aiffAPI } from '@app/utils/aiffAPI'
import { NEXT_PUBLIC_MIXPANEL_TOKEN } from '@app/utils/constants'
import { NextUIProvider } from '@nextui-org/react'
import { ErrorBoundary } from '@sentry/react'
import mixpanel from 'mixpanel-browser'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect, useMemo } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'
import { SWRConfig } from 'swr'
import { initRelayEnvironment } from '../../relayEnvironment'
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useMemo(initRelayEnvironment, [])

  useEffect(() => {
    mixpanel.init(NEXT_PUBLIC_MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: 'localStorage',
    })
  }, [])

  return (
    <>
      <Script
        id={'googletag'}
        strategy="afterInteractive"
        src={'https://www.googletagmanager.com/gtag/js?id=G-X4P14LC53Q'}
      />

      <Script
        id={'gtag'}
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-X4P14LC53Q');`,
        }}
      />
      <RelayEnvironmentProvider environment={environment}>
        <NextUIProvider>
          <MobileLayout maxWidth={'28rem'}>
            <ErrorBoundary fallback={<p> 문제가 생겼어요.</p>}>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </ErrorBoundary>
          </MobileLayout>
        </NextUIProvider>
      </RelayEnvironmentProvider>
    </>
  )
}

export default MyApp
