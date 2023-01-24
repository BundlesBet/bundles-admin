/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { BsLinkedin, BsDiscord } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

import HelperImage from "lib/components/samples/HelperImage";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <HelperImage src="/green_logo.png" label="Logo" />
          <Text> Bundles bets</Text>
        </Stack>
        <Text>© 2023 Bundles bets finance</Text>
        <Stack direction="row" spacing={6}>
          <SocialButton label="Twitter" href="#">
            <FiTwitter />
          </SocialButton>
          <SocialButton label="Linkedin" href="#">
            <BsLinkedin />
          </SocialButton>
          <SocialButton label="Discord" href="#">
            <BsDiscord />
          </SocialButton>
          <SocialButton label="Facebook" href="#">
            <FaFacebookF />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
