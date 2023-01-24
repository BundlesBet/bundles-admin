import { Flex } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import DashBoardTabs from "lib/components/dashboard/Tabs";

const Dashboard = () => {
  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      minHeight="60vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Dashboard" />
      <DashBoardTabs />
    </Flex>
  );
};

export default Dashboard;
