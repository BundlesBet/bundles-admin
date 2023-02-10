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
import { useState, forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreatePoolModal } from "../modals/CreatePool";
import { handleSelectChange } from "redux/slices/poolSlice";

const CreatePoolTable = () => {
  const dispatch = useDispatch();
  const header = ["", "League", "Match", "Date & Time"];
  const { sport, league, allMatches, selectedMatches } = useSelector(
    (store) => store.pools
  );

  const [matches, setMatches] = useState([selectedMatches]);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  // const offset = (current - 1) * pageSize;
  // const posts = data.slice(offset, offset + pageSize);

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

  const onSelectChange = (checkedMatch: any) => {
    dispatch(handleSelectChange(checkedMatch));
  };

  useEffect(() => {
    setMatches(selectedMatches);
  }, [selectedMatches.length]);

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
                isDisabled={!sport || !league || !selectedMatches.length}
              >
                Add Pool
              </Button>
              <Pagination
                current={current}
                onChange={(page: any) => {
                  setCurrent(page);
                }}
                pageSize={pageSize}
                total={allMatches?.length}
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
            {allMatches?.length &&
              allMatches?.map((match: any, index: number) => {
                return (
                  <Tr key={index}>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      <Checkbox
                        size="lg"
                        colorScheme="teal"
                        isChecked={
                          matches &&
                          matches.length &&
                          matches.find((selectedMatch: any) => {
                            return (
                              parseInt(match.espnMatchId) ===
                              parseInt(selectedMatch.espnMatchId)
                            );
                          })
                        }
                        onChange={() => onSelectChange(match)}
                      />
                    </Td>

                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {league}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {match.teams.a.name} vs {match.teams.b.name}
                    </Td>
                    <Td color="#fff" fontSize="md" fontWeight="hairline">
                      {moment(parseFloat(`${match.startTime}`)).format(
                        "MM-DD-YYYY hh:mm A"
                      )}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <CreatePoolModal isOpen={isOpen} close={onClose} />
    </Flex>
  );
};

export default CreatePoolTable;
