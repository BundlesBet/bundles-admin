import { Box, Flex } from "@chakra-ui/react";

const CTASection = () => {
  return (
    <Box textAlign="center">
      <Box transform="scale(0.85)">
        <Flex marginY={4} justifyContent="center" gap={2}>
          {/* <Link
            aria-label="Deploy to Vercel"
            isExternal
            rel="noopener noreferrer"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsozonome%2Fnextarter-chakra"
          >
            <Image
              src="https://vercel.com/button"
              alt="Vercel deploy button"
              width="92px"
              height="32px"
            />
          </Link> */}
        </Flex>
      </Box>
    </Box>
  );
};

export default CTASection;
