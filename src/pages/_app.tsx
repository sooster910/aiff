import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { SWRConfig } from "swr";
import { aiffAPI } from "@app/utils/aiffAPI";
import { AuthProvider } from "@app/context/AuthProvider";
import Navbar from "@app/components/Navbar";
import MobileLayout from "@app/layouts/MobileLayout";
import { useEnvironment } from "@app/../relay/environment";
import Footer from "@app/components/Footer";
import Script from "next/script";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { NEXT_PUBLIC_MIXPANEL_TOKEN } from "@app/utils/constants";

function MyApp({ Component, pageProps }: AppProps) {
  const environment = useEnvironment(pageProps);

  useEffect(() => {
    mixpanel.init(NEXT_PUBLIC_MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={"https://www.googletagmanager.com/gtag/js?id=G-X4P14LC53Q"}
      />

      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-X4P14LC53Q');`,
        }}
      />
      <RelayEnvironmentProvider environment={environment}>
        <GeistProvider>
          <CssBaseline>
            <SWRConfig
              value={{
                fetcher: (resource) =>
                  aiffAPI.get(resource).then((res) => res.data),
              }}
            >
              <AuthProvider>
                <MobileLayout maxWidth={"28rem"}>
                  <Navbar />
                  <Component {...pageProps} />
                  <Footer />
                </MobileLayout>
              </AuthProvider>
            </SWRConfig>
          </CssBaseline>
        </GeistProvider>
      </RelayEnvironmentProvider>
    </>
  );
}

export default MyApp;
