import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";

export const CreatePoolForm = () => (
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
        placeholder="Enter your Pool Name"
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
        placeholder="Enter Fee"
        size="lg"
        fontSize="md"
        focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      />
    </FormControl>
    <Select
      placeholder="Select Pool Type"
      borderColor="#00ffc2"
      _selected={{ borderColor: "#00ffc2" }}
    >
      <option value="option1">10%</option>
      <option value="option2">20%</option>
      <option value="option3">50%</option>
    </Select>

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
      Create Pool
    </Button>
  </Stack>
);
