import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, replicatePool } from "redux/slices/poolSlice";

export const ReplicatePoolForm = () => {
  const dispatch = useDispatch();
  const {
    fee,
    poolName,
    protocolFee,
    replicatePoolId,
    rewardPercentage,
    isReplicatePoolLoading,
  } = useSelector((store) => store.pools);

  const onInputChange = (e: unknown) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const onReplicatePool = async (e: unknown) => {
    e.preventDefault();
    if (!replicatePoolId) return;
    console.log("running");
    const payload = {
      fee,
      poolName,
      protocolFee,
      poolId: replicatePoolId,
      rewardPercentage,
    };
    dispatch(replicatePool(payload));
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
          type="text"
          placeholder="Enter Pool Name"
          size="lg"
          name="poolName"
          fontSize="md"
          value={poolName}
          onChange={onInputChange}
          isDisabled={isReplicatePoolLoading}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="fee">
        <FormLabel srOnly>Fee</FormLabel>
        <Input
          type="text"
          placeholder="Enter Fee"
          size="lg"
          fontSize="md"
          name="fee"
          value={fee}
          onChange={onInputChange}
          isDisabled={isReplicatePoolLoading}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="protocolFee">
        <FormLabel srOnly>Protocol Fee</FormLabel>
        <Input
          type="text"
          placeholder="Enter Protocol Fee"
          size="lg"
          fontSize="md"
          name="protocolFee"
          value={protocolFee}
          isDisabled={isReplicatePoolLoading}
          onChange={onInputChange}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>

      <Select
        id="rewardPercentage"
        borderColor="#00ffc2"
        name="rewardPercentage"
        onChange={onInputChange}
        placeholder="Select Pool Type"
        value={rewardPercentage}
        isDisabled={isReplicatePoolLoading}
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
        isDisabled={isReplicatePoolLoading}
        onClick={onReplicatePool}
      >
        Replicate Pool
      </Button>
    </Stack>
  );
};
