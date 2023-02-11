import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { ReplicatePoolForm } from "lib/components/samples/ReplicatePoolForm";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

export const ReplicatePoolModal = (props: ModalProps) => {
  const { isOpen, close } = props;
  const { poolToBeReplicated } = useSelector((store) => store.pools);

  if (
    new Date(poolToBeReplicated?.startTime).getTime() < new Date().getTime()
  ) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => close()}
        size="xl"
        isCentered
        // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
        blockScrollOnMount={false}
        trapFocus={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx="4" bg="#1C1C26">
          <ModalBody>
            <Stack
              maxW="xs"
              mx="auto"
              py={{ base: "12", md: "16" }}
              spacing={{ base: "6", md: "10" }}
            >
              <Stack spacing="3" textAlign="center">
                <Heading as="h2" size="xl">
                  Action Not Allowed
                </Heading>
              </Stack>
              <Text fontSize="xl">
                {poolToBeReplicated.poolName} is active and cannot be
                replicated.
              </Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => close()}
      size="xl"
      // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
      blockScrollOnMount={false}
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius="2xl" mx="4" bg="#1C1C26">
        <ModalBody>
          <Stack
            maxW="xs"
            mx="auto"
            py={{ base: "12", md: "16" }}
            spacing={{ base: "6", md: "10" }}
          >
            <Stack spacing="3" textAlign="center">
              <Heading size="2xl">Replicate Pool</Heading>
            </Stack>
            <ReplicatePoolForm />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
