import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

import { EditPoolForm } from "../samples/EditPoolForm";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
}

export const EditPoolModal = (props: ModalProps) => {
  const { isOpen, close } = props;
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
            <EditPoolForm />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
