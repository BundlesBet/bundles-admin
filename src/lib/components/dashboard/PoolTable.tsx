/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ButtonGroup,
  IconButton,
  Flex,
  Button,
  TableCaption,
  TableContainer,
  Tooltip,
  useDisclosure,
  Alert,
  AlertIcon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import moment from "moment";
import type React from "react";
import { useState, forwardRef } from "react";
import { BiCopy } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { writeContract, prepareWriteContract } from "wagmi/actions";

import { EditPoolModal } from "../modals/EditPool";
import { contractDetails } from "config";
import { ReplicatePoolModal } from "lib/components/modals/ReplicatePoolModal";
import {
  archivePool,
  handleEditPool,
  setArchivePoolId,
  setReplicatePoolId,
  toggleArchivePoolLoading,
} from "redux/slices/poolSlice";
import { ARCHIVE_POOL_CONTRACT_CALL } from "utils/constants";

const PoolTable = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { address, isConnected } = useAccount();
  const {
    allPools,
    archivePoolId,
    poolToBeArchived,
    isEditPoolLoading,
    isArchivePoolLoading,
    isReplicatePoolLoading,
  } = useSelector((store: any) => store.pools);
  const header = [
    "Pool Id",
    "League",
    "Name",
    "Start Time",
    "Fee",
    "Protocol Fee",
    "Reward %",
    "Bets Placed",
    "",
  ];
  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const pools =
    allPools?.length === 0 ? [] : allPools?.slice(offset, offset + pageSize);

  const Prev = forwardRef((props, ref: any) => {
    return (
      <Button ref={ref} {...props}>
        Prev
      </Button>
    );
  });
  const Next = forwardRef((props, ref: any) => {
    return (
      <Button ref={ref} {...props}>
        Next
      </Button>
    );
  });

  const itemRender: any = (_: any, type: string) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };

  const {
    isOpen: isEditPoolOpen,
    onOpen: onEditPoolOpen,
    onClose: onEditPoolClose,
  } = useDisclosure();
  const {
    isOpen: isReplicatePoolOpen,
    onOpen: onReplicatePoolOpen,
    onClose: onReplicatePoolClose,
  } = useDisclosure();

  const onPoolArchive = async () => {
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
      dispatch(toggleArchivePoolLoading());
      const config = await prepareWriteContract({
        address: contractDetails.adminContract.address,
        abi: contractDetails.adminContract.abi,
        chainId: contractDetails.adminContract.chainId,
        functionName: ARCHIVE_POOL_CONTRACT_CALL,
        args: [archivePoolId],
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
      dispatch(archivePool(archivePoolId));
    } catch (err) {
      dispatch(toggleArchivePoolLoading());
      console.log(err);
    }
  };

  if (!allPools.length) {
    return (
      <Alert status="warning">
        <AlertIcon />
        No pools founds. Maybe create one?
      </Alert>
    );
  }

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <TableContainer w="full">
        <Table
          w="full"
          bg="#1C1C26"
          _dark={{
            bg: "gray.800",
          }}
        >
          <TableCaption>
            <Pagination
              current={current}
              onChange={(page: any) => {
                setCurrent(page);
              }}
              pageSize={pageSize}
              total={allPools.length}
              itemRender={itemRender}
              paginationProps={{
                display: "flex",
                pos: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              focusRing="#00ffc2"
              baseStyles={{
                bg: "#00ffc2",
                color: "#000",
              }}
              activeStyles={{
                bg: "#fff",
                color: "#000",
              }}
              hoverStyles={{
                bg: "green.300",
              }}
            />
          </TableCaption>
          <Thead>
            <Tr>
              {header.map((x) => (
                <Th key={x}>{x}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {pools &&
              pools.length &&
              pools
                .filter((pool: any) => !pool.isArchive)
                .map(
                  (
                    pool: {
                      id:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      leagueName:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      poolName:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      startTime:
                        | string
                        | number
                        | boolean
                        | Date
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      fee:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      protocolFee:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      rewardPercentage:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                      participants: string[];
                    },
                    index: React.Key | null | undefined
                  ) => {
                    return (
                      <Tr key={index}>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {pool?.id}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {pool?.leagueName}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {pool?.poolName}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {moment(pool?.startTime).format("MM-DD-YYYY hh:mm A")}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {pool?.fee}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {pool?.protocolFee}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {pool?.rewardPercentage}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          {pool?.participants?.length
                            ? pool?.participants?.length
                            : 0}
                        </Td>
                        <Td color="#fff" fontSize="md" fontWeight="hairline">
                          <ButtonGroup variant="solid" size="sm" spacing={3}>
                            <Tooltip
                              hasArrow
                              label="Edit"
                              aria-label="edit"
                              placement="auto-end"
                            >
                              <IconButton
                                colorScheme="blue"
                                icon={<FaEdit />}
                                aria-label="Up"
                                disabled={
                                  isEditPoolLoading ||
                                  isArchivePoolLoading ||
                                  isReplicatePoolLoading
                                }
                                onClick={() => {
                                  dispatch(
                                    handleEditPool({
                                      allPools,
                                      poolId: pool.id,
                                    })
                                  );
                                  onEditPoolOpen();
                                }}
                              />
                            </Tooltip>
                            <Tooltip
                              hasArrow
                              aria-label="Archive"
                              label="Archive"
                              placement="top"
                            >
                              <Popover>
                                <PopoverTrigger>
                                  <IconButton
                                    colorScheme="green"
                                    icon={<BsFillTrashFill />}
                                    aria-label="Edit"
                                    isDisabled={
                                      isEditPoolLoading ||
                                      isArchivePoolLoading ||
                                      isReplicatePoolLoading
                                    }
                                    onClick={() =>
                                      dispatch(setArchivePoolId(pool.id))
                                    }
                                  />
                                </PopoverTrigger>
                                {archivePoolId &&
                                poolToBeArchived?.participants?.length ? (
                                  <Modal
                                    isOpen={isOpen}
                                    onClose={() => close()}
                                    size="xl"
                                    isCentered
                                    // `trapFocus` and `blockScrollOnMount` are only switched off so that the preview works properly.
                                    blockScrollOnMount={false}
                                    trapFocus={false}
                                  >
                                    <ModalOverlay />
                                    <ModalContent
                                      borderRadius="2xl"
                                      mx="4"
                                      bg="#1C1C26"
                                    >
                                      <ModalBody>
                                        <Stack
                                          maxW="xs"
                                          mx="auto"
                                          py={{ base: "12", md: "16" }}
                                          spacing={{ base: "6", md: "10" }}
                                        >
                                          <Stack spacing="3" textAlign="center">
                                            <Heading as="h2" size="xl">
                                              Action Not Allowed
                                            </Heading>
                                          </Stack>
                                          <Text fontSize="xl">
                                            {poolToBeArchived.poolName} has{" "}
                                            {
                                              poolToBeArchived?.participants
                                                ?.length
                                            }
                                            bets placed on it and it cannot be
                                            archived
                                          </Text>
                                        </Stack>
                                      </ModalBody>
                                    </ModalContent>
                                  </Modal>
                                ) : (
                                  <PopoverContent
                                    color="white"
                                    bg="#1C1C26"
                                    borderColor="blue.800"
                                    borderRadius="2xl"
                                  >
                                    <PopoverHeader fontWeight="semibold">
                                      Confirmation
                                    </PopoverHeader>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                      Are you sure you want to archive this
                                      pool?
                                    </PopoverBody>
                                    <PopoverFooter
                                      display="flex"
                                      justifyContent="flex-end"
                                    >
                                      <ButtonGroup size="sm">
                                        <Button
                                          variant="outline"
                                          as={PopoverCloseButton}
                                          disabled={isArchivePoolLoading}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          bg="#0EB634"
                                          color="#111"
                                          onClick={onPoolArchive}
                                          disabled={isArchivePoolLoading}
                                        >
                                          Archive
                                        </Button>
                                      </ButtonGroup>
                                    </PopoverFooter>
                                  </PopoverContent>
                                )}
                              </Popover>
                            </Tooltip>
                            <Tooltip
                              hasArrow
                              aria-label="replicate"
                              label="Replicate"
                              placement="right-end"
                            >
                              <IconButton
                                colorScheme="red"
                                variant="outline"
                                icon={<BiCopy />}
                                aria-label="Delete"
                                isDisabled={
                                  isEditPoolLoading ||
                                  isArchivePoolLoading ||
                                  isReplicatePoolLoading
                                }
                                onClick={() => {
                                  // setReplicatePoolId(pool.id);
                                  dispatch(
                                    setReplicatePoolId({ poolId: pool.id })
                                  );
                                  onReplicatePoolOpen();
                                }}
                              />
                            </Tooltip>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    );
                  }
                )}
          </Tbody>
        </Table>
      </TableContainer>
      <EditPoolModal isOpen={isEditPoolOpen} close={onEditPoolClose} />
      <ReplicatePoolModal
        isOpen={isReplicatePoolOpen}
        close={onReplicatePoolClose}
      />
    </Flex>
  );
};

export default PoolTable;
