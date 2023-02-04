import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleChange } from "redux/slices/poolSlice";

interface FormStates {
  poolName: string;
  fee: string;
  protocolFee: string;
}

interface PoolEditProps {
  pool?: any;
  close: any;
}

export const EditPoolForm = (props: PoolEditProps) => {
  const dispatch = useDispatch();
  const { close } = props;
  const { editPool, isEditPoolLoading, poolName, fee, protocolFee } =
    useSelector((store) => store.pools);

  const [formStates, setFormStates] = useState<FormStates>({
    poolName: editPool.poolName ? editPool.poolName : "",
    fee: editPool.fee ? editPool.fee : "",
    protocolFee: editPool.protocolFee ? editPool.protocolFee : "",
  });

  const onInputChange = (e: unknown) => {
    // setFormStates({ ...formStates, [e.target.name]: e.target.value });
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  // const onEditPool = async (e: unknown) => {
  //   e.preventDefault();
  //   if (!pool.id) return;
  //   try {
  //     await axios.put(
  //       `${process.env.NEXT_PUBLIC_PROD_BASE_URL}/${process.env.NEXT_PUBLIC_VERSION}/admin/updatePool/${pool.id}`,
  //       {
  //         poolName: formStates.poolName,
  //         fee: formStates.fee,
  //         protocolFee: formStates.protocolFee,
  //       }
  //     );
  //     close();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          value={formStates.poolName}
          onChange={onInputChange}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="fee">
        <FormLabel srOnly>Fee</FormLabel>
        <Input
          type="text"
          placeholder="Edit Fee"
          size="lg"
          fontSize="md"
          name="fee"
          value={formStates.fee}
          onChange={onInputChange}
          focusBorderColor={useColorModeValue("blue.500", "blue.200")}
        />
      </FormControl>
      <FormControl id="protocolFee">
        <FormLabel srOnly>Protocol Fee</FormLabel>
        <Input
          type="text"
          placeholder="Edit Protocol Fee"
          size="lg"
          fontSize="md"
          name="protocolFee"
          value={formStates.protocolFee}
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
        disabled={isEditPoolLoading}
        // onClick={onEditPool}
      >
        Edit Pool
      </Button>
    </Stack>
  );
};
