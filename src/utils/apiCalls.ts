/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";
import { api } from "./index";

const adminRoute = "/admin";

export const apiCall = async (response: any, error: any) => {
  try {
    if (error) return { error: true, ...error.response.data };
    if (response.data.error) return { ...response.data };
    return { ...response.data, error: false };
    // eslint-disable-next-line @typescript-eslint/no-shadow
  } catch (error) {
    return { error: true };
  }
};

export const fetchPools = async () => {
  const [response, error] = await api(axios.get(`${adminRoute}/fetchPools`));
  return apiCall(response, error);
};

export const fetchSports = async () => {
  const [response, error] = await api(axios.get(`${adminRoute}/getSports`));
  return apiCall(response, error);
};

export const fetchLeagues = async (sportName: string) => {
  const [response, error] = await api(
    axios.get(`${adminRoute}/getLeagues/${sportName}`)
  );
  return apiCall(response, error);
};

export const fetchMatches = async (sport: string, league: string) => {
  const [response, error] = await api(
    axios.get(`${adminRoute}/fetchMatchesData/${sport}/${league}`)
  );

  return apiCall(response, error);
};

export const createPool = async (poolDetails: any) => {
  const [response, error] = await api(
    axios.post(`${adminRoute}/createPool`, poolDetails)
  );
  return apiCall(response, error);
};

export const poolReplication = async (poolDetails: any) => {
  const [response, error] = await api(
    axios.post(`${adminRoute}/replicatePool`, poolDetails)
  );
  return apiCall(response, error);
};

export const poolUpdation = async (poolId, poolDetails: any) => {
  const [response, error] = await api(
    axios.put(`${adminRoute}/updatePool/${poolId}`, poolDetails)
  );
  return apiCall(response, error);
};

export const poolArchive = async (poolId) => {
  const [response, error] = await api(
    axios.put(`${adminRoute}/archivePool/${poolId}`)
  );
  return apiCall(response, error);
};
