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
  Flex,
  Button,
  TableCaption,
  TableContainer,
  Checkbox,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import moment from "moment";
import React, { forwardRef } from "react";

import { CreatePoolModal } from "../modals/CreatePool";

interface CreatePoolTableProps {
  matches?: any;
  league?: any;
}
const CreatePoolTable = (props: CreatePoolTableProps) => {
  const header = ["", "Sports", "Pool Name", "Match", "Date & Time"];
  const { matches, league } = props;
  const data = matches;

  const [current, setCurrent] = React.useState(1);
  const pageSize = 5;
  const offset = (current - 1) * pageSize;
  const posts = data.slice(offset, offset + pageSize);

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
            <Stack direction="column" alignItems=" center" spacing="20">
              <Button
                size="lg"
                colorScheme="teal"
                color="#111"
                onClick={onOpen}
              >
                Add Pool
              </Button>
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
            </Stack>
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
                matchData: {
                  teams: {
                    a: {
                      name:
                        | string
                        | number
                        | boolean
                        /* eslint-disable @typescript-eslint/no-explicit-any */
                        /* eslint-disable consistent-return */
                        /* eslint-disable react/no-unstable-nested-components */
                        /* eslint-disable react/no-array-index-key */
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    };
                    b: {
                      name:
                        | string
                        | number
                        | boolean
                        /* eslint-disable @typescript-eslint/no-explicit-any */
                        /* eslint-disable consistent-return */
                        /* eslint-disable react/no-unstable-nested-components */
                        /* eslint-disable react/no-array-index-key */
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    };
                  };
                  match: { startTime: any };
                },
                index: React.Key | null | undefined
              ) => {
                return (
                  <Tr key={index}>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      <Checkbox size="lg" colorScheme="teal" defaultChecked />
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {/* {matchData.match} */}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {league}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {matchData.teams.a.name} vs {matchData.teams.b.name}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {moment(
                        parseFloat(`${matchData.match.startTime}}`)
                      ).format("MM-DD-YYYY HH:MM")}
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <CreatePoolModal isOpen={isOpen} close={onClose} />
    </Flex>
  );
};

export default CreatePoolTable;
