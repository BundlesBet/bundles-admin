import { Flex, Grid, Heading, Highlight } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import HelperImage from "./HelperImage";

const SomeText = () => {
  return (
    <Grid textAlign="center">
      <Flex
        gap={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Flex gap={2} justifyContent="center" alignItems="center">
          <HelperImage src="/green_logo.png" label="Logo" />
          <Heading as="h1" size="2xl">
            <Highlight query="Bundles" styles={{ color: "#0EB634" }}>
              Bundles Bets
            </Highlight>
          </Heading>
        </Flex>
        <Heading as="h2" size="lg" color="#0EB634">
          Welcome to the future of
        </Heading>
        <Heading as="h2" size="lg">
          Blockchain Betting
        </Heading>
        <ConnectButton showBalance={false} chainStatus="none" />
      </Flex>
    </Grid>
  );
};

export default SomeText;
