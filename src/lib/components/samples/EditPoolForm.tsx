import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { DatePicker } from "chakra-ui-date-input";
import { useDispatch, useSelector } from "react-redux";

import { editPool, handleChange } from "redux/slices/poolSlice";

interface PoolEditProps {
  close: any;
}

export const EditPoolForm = (props: PoolEditProps) => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const { editPoolId, isEditPoolLoading, poolName, fee, protocolFee } =
    useSelector((store) => store.pools);

  const onInputChange = (e: unknown) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const onEditPool = async (e: unknown) => {
    e.preventDefault();
    // if (!address && !isConnected) return "Please connect you wallet";
    if (!poolName || !fee || !protocolFee || !editPoolId)
      return console.log("Please fill out all the required fields)");
    try {
      const payload = {
        poolName,
        fee,
        protocolFee,
      };
      dispatch(editPool({ poolId: editPoolId, poolDetails: payload }));
      // close();
    } catch (error) {
      console.log(error);
    }
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
          placeholder="Edit Pool Name"
          size="lg"
          name="poolName"
          fontSize="md"
          value={poolName}
          onChange={onInputChange}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="fee">
        <FormLabel srOnly>Fee</FormLabel>
        <Input
          type="number"
          placeholder="Edit Fee"
          size="lg"
          fontSize="md"
          name="fee"
          value={fee}
          onChange={onInputChange}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="protocolFee">
        <FormLabel srOnly>Protocol Fee</FormLabel>
        <Input
          type="number"
          placeholder="Edit Protocol Fee"
          size="lg"
          fontSize="md"
          name="protocolFee"
          value={protocolFee}
          onChange={onInputChange}
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
        disabled={!poolName || !fee || !protocolFee || isEditPoolLoading}
        onClick={onEditPool}
      >
        Edit Pool
      </Button>
    </Stack>
  );
};
