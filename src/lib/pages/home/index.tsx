import { NextSeo } from "next-seo";
import { Flex } from "@chakra-ui/react";
import CTASection from "lib/components/samples/CTASection";
import SomeText from "lib/components/samples/SomeText";

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />
      <SomeText />
      <CTASection />
    </Flex>
  );
};

export default Home;
