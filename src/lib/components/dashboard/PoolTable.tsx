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
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import React, { forwardRef } from "react";
import { BiCopy } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

import { EditPoolModal } from "../modals/EditPool";

interface TableProps {
  pools: any;
}
const PoolTable = (props: TableProps) => {
  const { pools } = props;

  const header = [
    "Pool Id",
    "Pool League",
    "Pool Name",
    "Pool Start Time",
    "Pool Fee",
    "",
  ];
  const data = pools;
  const [current, setCurrent] = React.useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts = data.length > 0 ? data.slice(offset, offset + pageSize) : [];

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
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              total={data.length}
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
            {posts.map(
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
                },
                index: React.Key | null | undefined
              ) => {
                return (
                  <Tr key={index}>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {pool.id}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {pool.leagueName}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {pool.poolName}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {pool.startTime}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {pool.fee}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      <ButtonGroup variant="solid" size="sm" spacing={3}>
                        <Tooltip
                          hasArrow
                          aria-label="edit"
                          label="Edit"
                          placement="auto-end"
                        >
                          <IconButton
                            colorScheme="blue"
                            icon={<FaEdit />}
                            aria-label="Up"
                            onClick={onOpen}
                          />
                        </Tooltip>
                        <Tooltip
                          hasArrow
                          aria-label="Archive"
                          label="Archive"
                          placement="top"
                        >
                          <IconButton
                            colorScheme="green"
                            icon={<BsFillTrashFill />}
                            aria-label="Edit"
                          />
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
      <EditPoolModal isOpen={isOpen} close={onClose} />
    </Flex>
  );
};

export default PoolTable;
