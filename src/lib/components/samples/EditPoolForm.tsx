import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  readContract,
  writeContract,
  prepareWriteContract,
} from "wagmi/actions";
import { ethers } from "ethers";
import { contractDetails } from "config";
import { useAccount, useBalance } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import { editPool, handleChange } from "redux/slices/poolSlice";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { UPDATE_POOL_CONTRACT_CALL } from "utils/constants";

interface PoolEditProps {
  close: any;
}

export const EditPoolForm = (props: PoolEditProps) => {
  const dispatch = useDispatch();
  const toast = useToast();
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
        functionName: UPDATE_POOL_CONTRACT_CALL,
        args: [
          editPoolId,
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
      dispatch(editPool({ poolId: editPoolId, poolDetails: payload }));
      // });
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
        disabled={
          !fee ||
          !address ||
          !poolName ||
          !isConnected ||
          !protocolFee ||
          isEditPoolLoading
        }
        onClick={(e) => onEditPool(e)}
      >
        Edit Pool
      </Button>
    </Stack>
  );
};
