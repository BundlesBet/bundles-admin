/* eslint-disable import/order */
/* eslint-disable react/jsx-props-no-spreading */
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";

import defaultSEOConfig from "../../next-seo.config";
import { Chakra } from "lib/components/Chakra";
import Layout from "lib/layout";
import "lib/styles/globals.css";
import { useAccount, configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import type { ThemeOptions } from "@rainbow-me/rainbowkit/dist/themes/baseTheme";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { urls } from "utils";
import { useRouter } from "next/router";
import Footer from "lib/layout/Footer";
import store from "redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [polygonMumbai]
      : [polygon]),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_PRIVATE_KEY}`,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "BundlesBets Admin",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
  webSocketProvider,
});

const theme: ThemeOptions = {
  accentColor: "#00ffc2",
  accentColorForeground: "black",
  borderRadius: "small",
  fontStack: "system",
  overlayBlur: "small",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const loginRoutes = [urls.connectWallet];
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const toast = useToast();

  useEffect(() => {
    if (!address && !isConnected) {
      toast({
        position: "top-right",
        title: "Please connect your wallet.",
        description: "No account connected",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      router.push("/");
    }
  }, [address, isConnected]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        modalSize="compact"
        showRecentTransactions
        theme={darkTheme(theme)}
        chains={chains}
      >
        <Provider store={store}>
          <Chakra>
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />
            </Head>
            <DefaultSeo {...defaultSEOConfig} />
            {loginRoutes.includes(router.pathname) ? (
              <>
                <Component {...pageProps} />
                <Footer />
              </>
            ) : (
              <>
                {" "}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </>
            )}
          </Chakra>
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
