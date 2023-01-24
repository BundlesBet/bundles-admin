import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export const EditPoolForm = () => (
  <Stack
    as="form"
    spacing="6"
    onSubmit={(e) => {
      e.preventDefault();
      // manage form submission
    }}
  >
    <FormControl id="poolName">
      <FormLabel srOnly>Pool Name</FormLabel>
      <Input
        type="text"
        placeholder="Edit your Pool Name"
        size="lg"
        fontSize="md"
        focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      />
    </FormControl>
    <FormControl id="startTime">
      <FormLabel srOnly>Start Time</FormLabel>
      <Input
        placeholder="Select Date and Time"
        size="md"
        type="datetime-local"
      />
    </FormControl>
    <FormControl id="fee">
      <FormLabel srOnly>Fee</FormLabel>
      <Input
        type="text"
        placeholder="Edit Fee"
        size="lg"
        fontSize="md"
        focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      />
    </FormControl>

    <Button
      type="submit"
      fontWeight="bold"
      textTransform="uppercase"
      fontSize="md"
      bg="#00ffc2"
      color="#111"
      _hover={{
        color: "#111",
        bg: "#00ffc2",
      }}
      size="lg"
    >
      Edit Pool
    </Button>
  </Stack>
);
