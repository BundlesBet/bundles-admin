import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, createNewPool } from "redux/slices/poolSlice";

export const CreatePoolForm = () => {
  const dispatch = useDispatch();
  const {
    fee,
    protocolFee,
    poolName,
    rewardPercentage,
    sport,
    league,
    startTime,
    selectedMatches,
    isCreatePoolLoading,
  } = useSelector((store) => store.pools);

  const onInputChange = (e: unknown) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const onCreatePool = async (e: unknown) => {
    e.preventDefault();
    const payload = {
      sport,
      poolName,
      leagueName: league,
      startTime,
      fee,
      protocolFee,
      matches: selectedMatches,
      rewardPercentage,
    };
    dispatch(createNewPool(payload));
  };

  return (
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
          size="lg"
          type="text"
          fontSize="md"
          name="poolName"
          onChange={onInputChange}
          value={poolName}
          placeholder="Enter your Pool Name"
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="startTime">
        <FormLabel srOnly>Start Time</FormLabel>
        <Input
          size="md"
          type="date"
          name="startTime"
          onChange={onInputChange}
          placeholder="Select Date"
        />
      </FormControl>
      <FormControl id="fee">
        <FormLabel srOnly>Fee</FormLabel>
        <Input
          size="lg"
          name="fee"
          type="number"
          fontSize="md"
          value={fee}
          placeholder="Enter Fee"
          onChange={onInputChange}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="protocolFee">
        <FormLabel srOnly>Protocol Fee</FormLabel>
        <Input
          size="lg"
          type="number"
          fontSize="md"
          name="protocolFee"
          value={protocolFee}
          onChange={onInputChange}
          placeholder="Enter Protocol Fee"
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <Select
        id="rewardPercentage"
        borderColor="#00ffc2"
        name="rewardPercentage"
        onChange={onInputChange}
        placeholder="Select Pool Reward %"
        value={rewardPercentage}
        _selected={{ borderColor: "#00ffc2" }}
      >
        <option value="10">10%</option>
        <option value="20">20%</option>
        <option value="50">50%</option>
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
        onClick={onCreatePool}
        disabled={isCreatePoolLoading}
      >
        Create Pool
      </Button>
    </Stack>
  );
};
