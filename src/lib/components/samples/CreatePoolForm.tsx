import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import CustomLoader from "./CustomLoader";
import { useDispatch, useSelector } from "react-redux";
import { contractDetails } from "config";
import {
  handleChange,
  createNewPool,
  setBetEndTime,
  setContractMatchIds,
  toggleCreatePoolLoading,
} from "redux/slices/poolSlice";
import {
  ADD_POOL_CONTRACT_CALL,
  ALL_MATCHES_CONTRACT_CALL,
} from "utils/constants";
import {
  prepareWriteContract,
  readContract,
  writeContract,
} from "wagmi/actions";

export const CreatePoolForm = () => {
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
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
    betEndTime,
    contractMatchIds,
  } = useSelector((store) => store.pools);
  const toast = useToast();

  const onInputChange = (e: unknown) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!selectedMatches.length) return;
    dispatch(setBetEndTime(selectedMatches));
    dispatch(setContractMatchIds(selectedMatches));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMatches.length]);

  // const checkMatchOnContract = async () => {
  //   try {
  //     contractMatchIds.forEach(async (matchId: string) => {
  //       const response = await readContract({
  //         address: contractDetails.adminContract.address,
  //         abi: contractDetails.adminContract.abi,
  //         chainId: contractDetails.adminContract.chainId,
  //         functionName: ALL_MATCHES_CONTRACT_CALL,
  //         args: [matchId],
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onCreatePool = async (e: unknown) => {
    e.preventDefault();
    try {
      if (!address && !isConnected) {
        toast({
          position: "top-right",
          title: "Please connect your wallet.",
          description: "No account connected",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      dispatch(toggleCreatePoolLoading());

      // checkMatchOnContract();

      const config = await prepareWriteContract({
        address: contractDetails.adminContract.address,
        abi: contractDetails.adminContract.abi,
        chainId: contractDetails.adminContract.chainId,
        functionName: ADD_POOL_CONTRACT_CALL,
        args: [
          poolName,
          ethers.utils.parseUnits(fee.toString(), "ether"),
          ethers.utils.parseUnits(protocolFee.toString(), "ether"),
          startTime.getTime(),
          betEndTime,
          contractMatchIds,
          1000,
        ],
      });

      const response = await (await writeContract(config)).wait(1);

      if (!response) {
        toast({
          position: "top-right",
          title: "Transaction Failed",
          description: "Some error occured.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }

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
    } catch (err) {
      dispatch(toggleCreatePoolLoading());
      console.log(err);
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
          size="lg"
          type="text"
          fontSize="md"
          name="poolName"
          value={poolName}
          onChange={onInputChange}
          disabled={isCreatePoolLoading}
          placeholder="Enter your Pool Name"
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>

      <FormControl id="startTime">
        <FormLabel srOnly>Start Time</FormLabel>
        <Input
          size="md"
          name="startTime"
          type="datetime-local"
          onChange={onInputChange}
          placeholder="Select Date"
          disabled={isCreatePoolLoading}
          min={new Date().toISOString().slice(0, -8)}
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
          disabled={isCreatePoolLoading}
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
          disabled={isCreatePoolLoading}
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
        disabled={isCreatePoolLoading}
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
        onClick={(e) => onCreatePool(e)}
        disabled={
          !fee ||
          !address ||
          !poolName ||
          !startTime ||
          !betEndTime ||
          !protocolFee ||
          !isConnected ||
          !rewardPercentage ||
          isCreatePoolLoading
        }
      >
        {isCreatePoolLoading ? "Loading" : "Create Pool"}
      </Button>
    </Stack>
  );
};
