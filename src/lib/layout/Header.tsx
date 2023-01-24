import { Flex, Heading } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import HelperImage from "lib/components/samples/HelperImage";

const Header = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  return (
    <Flex as="header" width="full" align="center">
      <Flex
        marginRight="auto"
        justifyContent="space-between"
        alignItems="center"
      >
        <HelperImage src="/green_logo.png" label="Logo" />
        <Heading
          as="h1"
          size="lg"
          onClick={() => {
            router.push("/");
          }}
          cursor="pointer"
        >
          Bundles Bets
        </Heading>
      </Flex>
      <Flex marginLeft="auto" align="center" gap={2}>
        {isConnected ? (
          <ConnectButton showBalance chainStatus="none" />
        ) : (
          <ConnectButton />
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
