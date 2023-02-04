/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Stack,
  Spinner,
  Select,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPools } from "utils/apiCalls";
import {
  handleChange,
  fetchAllPools,
  fetchAllSports,
  fetchAllLeagues,
  fetchAllMatches,
} from "redux/slices/poolSlice";
import PoolTable from "./PoolTable";
import CreatePoolTable from "./CreatePoolTable";

const DashBoardTabs = () => {
  const dispatch = useDispatch();
  const {
    sport,
    sports,
    league,
    leagues,
    allPools,
    allMatches,
    isLoading,
    isAllMatchesLoading,
  } = useSelector((store) => store.pools);

  const onInputChange = (e: unknown) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const fetchSports = useCallback(async () => {
    dispatch(fetchAllSports());
  }, []);

  const fetchLeagues = useCallback(async () => {
    try {
      if (!sport) return;
      dispatch(fetchAllLeagues(sport));
    } catch (error) {
      console.log(error);
    }
  }, [sport]);

  const fetchMatches = useCallback(async () => {
    try {
      if (!league) return;
      dispatch(fetchAllMatches({ sport, league }));
    } catch (error) {
      console.log(error);
    }
  }, [league, sport]);

  const fetchPoolsData = useCallback(async () => {
    try {
      dispatch(fetchAllPools());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (allPools.length > 0) return;
    fetchPoolsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPoolsData]);

  useEffect(() => {
    if (sports.length > 0) return;
    fetchSports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSports]);

  useEffect(() => {
    fetchLeagues();
  }, [sport, fetchLeagues]);

  useEffect(() => {
    fetchMatches();
  }, [league, fetchMatches]);

  return (
    <Box textAlign="center" w="full">
      <Tabs variant="unstyled">
        <TabList>
          <Tab _selected={{ color: "black", bg: "#00ffc2" }}>Pools</Tab>
          <Tab _selected={{ color: "black", bg: "#00ffc2" }}>Add Pools</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{isLoading ? <Spinner /> : <PoolTable />}</TabPanel>
          <TabPanel>
            <Stack direction="column" spacing="4">
              <Select
                name="sport"
                borderColor="#00ffc2"
                placeholder="Select Sport"
                defaultValue="select_sport"
                onChange={onInputChange}
                _selected={{ borderColor: "#00ffc2" }}
                w="50%"
              >
                {sports?.length &&
                  sports?.map((sport: any, index: number) => {
                    const { name, slug } = sport;
                    return (
                      <option key={index} value={slug}>
                        {name}
                      </option>
                    );
                  })}
              </Select>
              <Select
                w="50%"
                name="league"
                borderColor="#00ffc2"
                placeholder="Select League"
                defaultValue="select_league"
                _selected={{ borderColor: "#00ffc2" }}
                onChange={onInputChange}
              >
                {leagues?.length &&
                  leagues?.map((sport: any, index: number) => {
                    const { name, slug } = sport;
                    return (
                      <option key={index} value={slug}>
                        {name}
                      </option>
                    );
                  })}
              </Select>
              {isAllMatchesLoading && <Spinner />}
              {allMatches?.length > 0 ? (
                <>
                  <Heading size="xl" alignItems="start">
                    All Matches
                  </Heading>
                  <CreatePoolTable />
                </>
              ) : (
                ""
              )}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default DashBoardTabs;
