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
import { useCallback, useEffect, useRef, useState } from "react";

import {
  fetchLeagues,
  fetchMatches,
  fetchPools,
  getSports,
} from "utils/apiCalls";

import CreatePoolTable from "./CreatePoolTable";
import PoolTable from "./PoolTable";

const DashBoardTabs = () => {
  const pools = useRef([]);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [sports, setSports] = useState<any>([]);
  const [sport, setSport] = useState<string>("");
  const [leagues, setLeagues] = useState<any>([]);
  const [matches, setMatches] = useState<any>([]);
  const [league, setLeague] = useState<string>("");

  const handleDropDownChange = (e: any) => {
    setSport(e.target.value);
  };

  const handleDropDownChangePool = (e: any) => {
    setLeague(e.target.value);
  };

  const fetchSports = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSports();

      setSports(data.sportsData.items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchLeaguesData = useCallback(async () => {
    try {
      if (!sport) return;
      setIsLoading(true);

      const data = await fetchLeagues(sport);

      setLeagues(data.leaguesData.leagues.items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [sport]);

  const fetchMatchesData = useCallback(async () => {
    try {
      if (!league) return;
      setIsLoading(true);

      const data = await fetchMatches(sport, league);
      console.log(data);
      setMatches(data.matchesData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [league, sport]);

  const fetchPoolsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchPools();

      pools.current = data.poolsData;
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (pools.current.length > 0) return;
    fetchPoolsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchPoolsData]);

  useEffect(() => {
    if (sports.length > 0) return;
    fetchSports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSports]);

  useEffect(() => {
    fetchLeaguesData();
  }, [sport, fetchLeaguesData]);

  useEffect(() => {
    fetchMatchesData();
  }, [league, fetchMatchesData]);

  return (
    <Box textAlign="center" w="full">
      <Tabs variant="unstyled">
        <TabList>
          <Tab _selected={{ color: "black", bg: "#00ffc2" }}>Pools</Tab>
          <Tab _selected={{ color: "black", bg: "#00ffc2" }}>Add Pools</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {loading ? <Spinner /> : <PoolTable pools={pools.current} />}
          </TabPanel>
          <TabPanel>
            <Stack direction="column" spacing="4">
              <Select
                placeholder="Select Sport"
                borderColor="#00ffc2"
                _selected={{ borderColor: "#00ffc2" }}
                defaultValue="select_sport"
                onChange={handleDropDownChange}
                w="50%"
              >
                {sports.length &&
                  sports.map((sport: any, index: number) => {
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
                placeholder="Select Pool"
                borderColor="#00ffc2"
                _selected={{ borderColor: "#00ffc2" }}
                defaultValue="select_league"
                onChange={handleDropDownChangePool}
              >
                {leagues.length &&
                  leagues?.map((sport: any, index: number) => {
                    const { name, slug } = sport;
                    return (
                      <option key={index} value={slug}>
                        {name}
                      </option>
                    );
                  })}
              </Select>
              {loading && <Spinner />}
              {matches?.length > 0 ? (
                <>
                  <Heading size="xl" alignItems="start">
                    All Matches
                  </Heading>
                  <CreatePoolTable matches={matches} league={league} />
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
