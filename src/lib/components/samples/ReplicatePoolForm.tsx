import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { contractDetails } from "config";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POOL_CONTRACT_CALL } from "utils/constants";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  readContract,
  writeContract,
  prepareWriteContract,
} from "wagmi/actions";

import {
  handleChange,
  replicatePool,
  setContractMatchIds,
} from "redux/slices/poolSlice";

export const ReplicatePoolForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const {
    fee,
    poolName,
    protocolFee,
    rewardPercentage,
    contractMatchIds,
    poolToBeReplicated,
    isReplicatePoolLoading,
  } = useSelector((store) => store.pools);

  const onInputChange = (e: unknown) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (!poolToBeReplicated.id) return;
    dispatch(setContractMatchIds(poolToBeReplicated.matches));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolToBeReplicated.id]);

  console.log(poolToBeReplicated.startTime);
  console.log(typeof new Date(poolToBeReplicated.startTime).getTime());
  console.log(new Date(poolToBeReplicated.startTime).getTime() / 1000);

  // const { config } = usePrepareContractWrite({
  //   address: contractDetails.adminContract.address,
  //   abi: contractDetails.adminContract.abi,
  //   chainId: contractDetails.adminContract.chainId,
  //   functionName: ADD_POOL_CONTRACT_CALL,
  //   args: [
  //     poolName,
  //     ethers.utils.parseUnits(fee, "ether"),
  //     ethers.utils.parseUnits(protocolFee, "ether"),
  //     new Date(poolToBeReplicated.startTime).getTime(),
  //     new Date(poolToBeReplicated.betEndTime).getTime(),
  //     contractMatchIds,
  //     1000,
  //   ],
  //   enabled: true,
  // });

  // const { writeAsync } = useContractWrite(config);

  const onReplicatePool = async (e: unknown) => {
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
        // close();
        return;
      }

      const config = await prepareWriteContract({
        address: contractDetails.adminContract.address,
        abi: contractDetails.adminContract.abi,
        chainId: contractDetails.adminContract.chainId,
        functionName: ADD_POOL_CONTRACT_CALL,
        args: [
          poolName,
          ethers.utils.parseUnits(fee.toString(), "ether"),
          ethers.utils.parseUnits(protocolFee.toString(), "ether"),
          new Date(poolToBeReplicated.startTime).getTime(),
          new Date(poolToBeReplicated.betEndTime).getTime(),
          contractMatchIds,
          1000,
        ],
        enabled: true,
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

      // (await writeAsync?.())?.wait(3).then((value) => {
      // console.log(value);
      const payload = {
        fee,
        poolName,
        protocolFee,
        rewardPercentage,
        poolId: poolToBeReplicated.id,
      };
      dispatch(replicatePool(payload));
      // onReplicatePool(e);
      // });
    } catch (err) {
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
          type="number"
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
          type="number"
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
        placeholder="Select Pool Reward %"
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
        isDisabled={
          !fee ||
          !address ||
          !poolName ||
          !isConnected ||
          !protocolFee ||
          !rewardPercentage ||
          isReplicatePoolLoading
        }
        onClick={(e) => onReplicatePool(e)}
      >
        Replicate Pool
      </Button>
    </Stack>
  );
};
