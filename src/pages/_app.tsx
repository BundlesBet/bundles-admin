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
import { contractDetails } from "config";
import { readContract } from "wagmi/actions";
import { IS_ADMIN_CONTRACT_CALL } from "utils/constants";

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
  const toast = useToast();
  const router = useRouter();
  const loginRoutes = [urls.connectWallet];
  const { address, isConnected } = useAccount();

  const checkIsAdmin = async () => {
    toast({
      position: "top-right",
      title: "Validating",
      description: "Checking access rights.",
      status: "info",
      duration: 2000,
      isClosable: false,
    });
    const response = await readContract({
      address: contractDetails.adminContract.address,
      abi: contractDetails.adminContract.abi,
      chainId: contractDetails.adminContract.chainId,
      functionName: IS_ADMIN_CONTRACT_CALL,
      args: [address],
    });
    if (response) {
      toast({
        position: "top-right",
        title: "Success!",
        description: "Welcome to admin dashboard",
        status: "success",
        duration: 4000,
        isClosable: false,
      });
      router.push("/dashboard");
    } else {
      toast({
        position: "top-right",
        title: "Unauthorized",
        description: "You do not have admin access",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      router.push("/");
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      checkIsAdmin();
    } else {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

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
