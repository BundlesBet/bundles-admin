/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";
import { api } from "./index";

const adminRoute = "/admin";

const apiCall = async (response: any, error: any) => {
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

export const getSports = async () => {
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
