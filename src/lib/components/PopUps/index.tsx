import {
  Button,
  Box,
  useToast,
  Wrap,
  WrapItem,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";

interface PopUpInterface {
  title: string;
  status: string;
}

const PopUp = (props: PopUpInterface) => {
  const toast = useToast();
  const { title, status };
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure();
  const statuses = ["success", "error", "warning", "info"];

  return (
    <Wrap>
      {statuses.map((status, i) => (
        <WrapItem key={i}>
          <Box>Show {status} toast</Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => (isOpen ? onClose : null)}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default PopUp;
