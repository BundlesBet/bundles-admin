import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { capMaxTime } from "utils/helpers";
import { DatePicker } from "chakra-ui-date-input";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChange,
  createNewPool,
  setMaxBetEndTime,
} from "redux/slices/poolSlice";
import moment from "moment";

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
    maxBetEndTime,
  } = useSelector((store) => store.pools);

  const onInputChange = (e: unknown) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const onCreatePool = async (e: unknown) => {
    e.preventDefault();
    // if (!address && !isConnected) return "Please connect you wallet";
    try {
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
      console.log(err);
    }
    // if (!address && !isConnected) return "Please connect you wallet";
  };

  // useEffect(() => {
  //   const sortedMatches = capMaxTime(selectedMatches);
  //   dispatch(setMaxBetEndTime(sortedMatches[0].startTime));
  // }, []);

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
          name="startTime"
          type="datetime-local"
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
        disabled={
          !fee ||
          !poolName ||
          !startTime ||
          !protocolFee ||
          !rewardPercentage ||
          isCreatePoolLoading
        }
      >
        Create Pool
      </Button>
    </Stack>
  );
};
