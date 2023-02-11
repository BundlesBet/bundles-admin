import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import {
  readContract,
  writeContract,
  prepareWriteContract,
} from "wagmi/actions";

import { contractDetails } from "config";
import {
  clearInputs,
  editPool,
  handleChange,
  toggleEditPoolLoading,
} from "redux/slices/poolSlice";
import { UPDATE_POOL_CONTRACT_CALL } from "utils/constants";

interface PoolEditProps {
  close: any;
}

export const EditPoolForm = (props: PoolEditProps) => {
  const { close } = props;
  const toast = useToast();
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();

  const { poolToBeEdited, isEditPoolLoading, poolName, fee, protocolFee } =
    useSelector((store) => store.pools);

  const onInputChange = (e: unknown) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  useEffect(() => {
    if (protocolFee || fee || poolName) return;
    return () => dispatch(clearInputs());
  }, []);

  useEffect(() => {
    if (parseInt(fee) < 1) {
      toast({
        position: "top-right",
        title: "Fee cannot be less than 1 BUND",
        description: `Incorrect Pool Fee ${fee}`,
        status: "error",
        isClosable: true,
      });
    }
    return () => {};
  }, [fee]);

  const onEditPool = async (e: unknown) => {
    e.preventDefault();
    // if (!address && !isConnected) return "Please connect you wallet";
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

      dispatch(toggleEditPoolLoading());
      const config = await prepareWriteContract({
        address: contractDetails.adminContract.address,
        abi: contractDetails.adminContract.abi,
        chainId: contractDetails.adminContract.chainId,
        functionName: UPDATE_POOL_CONTRACT_CALL,
        args: [
          poolToBeEdited.id,
          poolName,
          ethers.utils.parseUnits(fee.toString(), "ether"),
          ethers.utils.parseUnits(protocolFee.toString(), "ether"),
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
        poolName,
        fee: parseInt(fee),
        protocolFee: parseInt(protocolFee),
      };
      dispatch(editPool({ poolId: poolToBeEdited.id, poolDetails: payload }));
    } catch (error) {
      dispatch(toggleEditPoolLoading());
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
          disabled={isEditPoolLoading}
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
          disabled={isEditPoolLoading}
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
          disabled={isEditPoolLoading}
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
        disabled={
          !fee ||
          !address ||
          parseInt(fee) < 1 ||
          !poolName ||
          !isConnected ||
          !protocolFee ||
          isEditPoolLoading
        }
        onClick={(e) => onEditPool(e)}
      >
        {isEditPoolLoading ? "Loading" : "Edit Pool"}
      </Button>
    </Stack>
  );
};
