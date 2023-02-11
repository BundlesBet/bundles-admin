import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { EditPoolForm } from "../samples/EditPoolForm";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

export const EditPoolModal = (props: ModalProps) => {
  const { isOpen, close } = props;
  const { poolToBeEdited } = useSelector((store) => store.pools);

  if (new Date(poolToBeEdited?.startTime).getTime() < new Date().getTime()) {
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
                {poolToBeEdited.poolName} is active and cannot be updated
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
              <Heading size="2xl">Edit Pool</Heading>
            </Stack>
            <EditPoolForm close={close} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
