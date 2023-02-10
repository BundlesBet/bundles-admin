import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createPool,
  fetchPools,
  poolArchive,
  fetchSports,
  fetchLeagues,
  fetchMatches,
  poolUpdation,
  poolReplication,
} from "utils/apiCalls";
import {
  SLICE_NAMES,
  POOL_EDIT_POOL,
  POOL_CREATE_POOL,
  POOL_FETCH_POOLS,
  POOL_FETCH_SPORTS,
  POOL_ARCHIVE_POOL,
  POOL_FETCH_LEAGUES,
  POOL_FETCH_MATCHES,
  POOL_CREATE_REPLICATE,
} from "utils/constants";
import { capMaxBetEndTime, extractMatchIds } from "utils/helpers";

const initialState = {
  fee: "",
  sport: "",
  league: "",
  sports: [],
  leagues: [],
  poolName: "",
  editPoolId: null,
  totalPools: 0,
  isError: false,
  allMatches: [
    {
      teams: {
        a: {
          value: 1,
          abbreviation: "NFC",
          name: "NFC",
          link: "sportscenter://x-callback-url/showClubhouse?uid=s:20~l:28~t:32&section=scores",
          logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nfc.png",
          teamId: "32",
        },
        b: {
          value: 2,
          abbreviation: "AFC",
          name: "AFC",
          link: "sportscenter://x-callback-url/showClubhouse?uid=s:20~l:28~t:31&section=scores",
          logo: "https://a.espncdn.com/i/teamlogos/nfl/500/afc.png",
          teamId: "31",
        },
      },
      espnMatchId: 401492629,
      startTime: 1676135727000,
      name: "AFC  at NFC ",
    },
    {
      teams: {
        a: {
          value: 1,
          abbreviation: "TEN",
          name: "Tennessee Titans",
          link: "https://www.espn.com/nfl/team/_/name/ten/tennessee-titans",
          logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png",
          teamId: "10",
        },
        b: {
          value: 2,
          abbreviation: "DAL",
          name: "Dallas Cowboys",
          link: "https://www.espn.com/nfl/team/_/name/dal/dallas-cowboys",
          logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
          teamId: "6",
        },
      },
      espnMatchId: 401437932,
      startTime: 1676139327000,
      name: "TEN at DAL",
    },
    {
      teams: {
        a: {
          value: 1,
          abbreviation: "NE",
          name: "New England Patriots",
          link: "https://www.espn.com/nfl/team/_/name/ne/new-england-patriots",
          logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
          teamId: "17",
        },
        b: {
          value: 2,
          abbreviation: "MIA",
          name: "Miami Dolphins",
          link: "https://www.espn.com/nfl/team/_/name/mia/miami-dolphins",
          logo: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png",
          teamId: "15",
        },
      },
      espnMatchId: 401437938,
      startTime: 1676132127000,
      name: "NE at MIA",
    },
  ],
  protocolFee: "",
  betEndTime: null,
  isLoading: false,
  archivePoolId: null,
  allPools: [] as any,
  rewardPercentage: "",
  isPoolEditing: false,
  contractMatchIds: [],
  startTime: new Date(),
  poolToBeReplicated: {},
  isEditPoolLoading: false,
  isAllSportsLoading: false,
  isAllLeaguesLoading: false,
  selectedMatches: [] as any,
  isAllMatchesLoading: false,
  isCreatePoolLoading: false,
  isArchivePoolLoading: false,
  isReplicatePoolLoading: false,
};

export const fetchAllPools = createAsyncThunk(
  POOL_FETCH_POOLS,
  async (_, thunkAPI) => {
    try {
      return await fetchPools();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllSports = createAsyncThunk(
  POOL_FETCH_SPORTS,
  async (_, thunkAPI) => {
    try {
      return await fetchSports();
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllLeagues = createAsyncThunk(
  POOL_FETCH_LEAGUES,
  async (sportName, thunkAPI) => {
    try {
      return await fetchLeagues(sportName);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllMatches = createAsyncThunk(
  POOL_FETCH_MATCHES,
  async (payload, thunkAPI) => {
    try {
      const { sport, league } = payload;
      return await fetchMatches(sport, league);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewPool = createAsyncThunk(
  POOL_CREATE_POOL,
  async (poolDetails, thunkAPI) => {
    try {
      console.log("running");
      const response = await createPool(poolDetails);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(clearInputs());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const replicatePool = createAsyncThunk(
  POOL_CREATE_REPLICATE,
  async (poolDetails, thunkAPI) => {
    try {
      const response = await poolReplication(poolDetails);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(clearInputs());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editPool = createAsyncThunk(
  POOL_EDIT_POOL,
  async (payload, thunkAPI) => {
    const { poolId, poolDetails } = payload;
    try {
      const response = await poolUpdation(poolId, poolDetails);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(clearInputs());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const archivePool = createAsyncThunk(
  POOL_ARCHIVE_POOL,
  async (poolId, thunkAPI) => {
    if (!poolId) return;
    try {
      return await poolArchive(poolId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const poolSlice = createSlice({
  name: SLICE_NAMES.POOLS,
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { name } = payload;
      let { value } = payload;
      if (name === "startTime") {
        value = new Date(value);
      }
      state[name] = value;
    },
    handleSelectChange: (state, payload) => {
      const { payload: checkedMatch } = payload;
      const matchExists = state.selectedMatches.find(
        (selectedMatch: any) =>
          // eslint-disable-next-line radix
          parseInt(selectedMatch.espnMatchId) ===
          parseInt(checkedMatch.espnMatchId)
      );
      if (matchExists) {
        const filteredMatches = state.selectedMatches.filter(
          (existingMatch: any) =>
            // eslint-disable-next-line radix
            parseInt(existingMatch.espnMatchId) !==
            parseInt(checkedMatch.espnMatchId)
        );
        return { ...state, selectedMatches: filteredMatches };
        // eslint-disable-next-line no-else-return
      } else {
        return {
          ...state,
          selectedMatches: [...state.selectedMatches, checkedMatch],
        };
      }
    },
    clearInputs: (state) => {
      return {
        ...state,
        fee: "",
        poolName: "",
        protocolFee: "",
        replicatePoolId: "",
        selectedMatches: [],
        rewardPercentage: "",
        startTime: new Date(),
      };
    },
    handleEditPool: (state, payload) => {
      const {
        payload: { allPools, poolId },
      } = payload;
      console.log(payload);
      if (!poolId || !allPools.length) return;
      const poolToBeEdited = allPools.find((pool: any) => {
        return parseInt(pool.id) === parseInt(poolId);
      });
      state.editPoolId = poolToBeEdited.id;
      state.poolName = poolToBeEdited.poolName;
      state.fee = poolToBeEdited.fee;
      state.protocolFee = poolToBeEdited.protocolFee;
      state.rewardPercentage = poolToBeEdited.rewardPercentage;
    },
    setReplicatePoolId: (state, payload) => {
      const {
        payload: { poolId },
      } = payload;
      state.poolToBeReplicated = state.allPools.find(
        (pool) => pool.id === poolId
      );
    },
    setBetEndTime: (state, payload) => {
      const { payload: selectedMatches } = payload;
      const sortedMatches = capMaxBetEndTime(selectedMatches);
      state.betEndTime = sortedMatches[0].startTime;
    },
    setContractMatchIds: (state, payload) => {
      const { payload: selectedMatches } = payload;
      const selectedMatchIds = extractMatchIds(selectedMatches);
      const response = (state.contractMatchIds = selectedMatchIds);
    },
    setArchivePoolId: (state, payload) => {
      const { payload: poolId } = payload;
      console.log(payload);
      console.log(poolId);
      state.archivePoolId = poolId;
    },
    toggleCreatePoolLoading: (state) => {
      state.isCreatePoolLoading = !state.isCreatePoolLoading;
    },
    toggleEditPoolLoading: (state) => {
      state.isEditPoolLoading = !state.isEditPoolLoading;
    },
    toggleArchivePoolLoading: (state) => {
      state.isArchivePoolLoading = !state.isArchivePoolLoading;
    },
    toggleReplicatePoolLoading: (state) => {
      state.isReplicatePoolLoading = !state.isReplicatePoolLoading;
    },
  },
  extraReducers: (builder) => {
    builder
      // ** All the pools are being fetched below ** //
      .addCase(fetchAllPools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPools.fulfilled, (state, payload) => {
        const {
          payload: { poolsData },
        } = payload;
        if (poolsData === null) {
          state.allPools = [];
          state.isLoading = false;
          return;
        }
        state.allPools = poolsData;
        state.isLoading = false;
      })
      .addCase(fetchAllPools.rejected, (state, payload) => {
        console.log(payload);
        state.isLoading = false;
      })
      // ** All the sports are being fetched below ** //
      .addCase(fetchAllSports.pending, (state) => {
        state.isAllSportsLoading = true;
      })
      .addCase(fetchAllSports.fulfilled, (state, payload) => {
        const {
          payload: {
            sportsData: { items },
          },
        } = payload;
        state.sports = items;
        state.isAllSportsLoading = false;
      })
      .addCase(fetchAllSports.rejected, (state, payload) => {
        console.log(payload);
        state.isAllSportsLoading = false;
      })
      // ** All the leagues are being fetched below ** //
      .addCase(fetchAllLeagues.pending, (state) => {
        state.isAllLeaguesLoading = true;
      })
      .addCase(fetchAllLeagues.fulfilled, (state, payload) => {
        const {
          payload: {
            leaguesData: {
              leagues: { items },
            },
          },
        } = payload;
        state.leagues = items;
        state.isAllLeaguesLoading = false;
      })
      .addCase(fetchAllLeagues.rejected, (state, payload) => {
        console.log(payload);
        state.isAllLeaguesLoading = false;
      })
      // ** All the matches belonging to the current sport and league in the state are being fetched below ** //
      .addCase(fetchAllMatches.pending, (state) => {
        state.isAllMatchesLoading = true;
      })
      .addCase(fetchAllMatches.fulfilled, (state, payload) => {
        const {
          payload: { matchesData },
        } = payload;
        state.allMatches = matchesData;
        state.isAllMatchesLoading = false;
      })
      .addCase(fetchAllMatches.rejected, (state, payload) => {
        console.log(payload);
        state.isAllMatchesLoading = false;
      })
      // ** Create New Pool handlers are listed below ** //
      .addCase(createNewPool.pending, (state) => {
        state.isCreatePoolLoading = true;
      })
      .addCase(createNewPool.fulfilled, (state, payload) => {
        const {
          payload: { createdPool },
        } = payload;
        state.allPools = [...state.allPools, createdPool];
        state.isCreatePoolLoading = false;
      })
      .addCase(createNewPool.rejected, (state, payload) => {
        console.log(payload);
        state.isCreatePoolLoading = false;
      })
      // ** Edit Existing Pool handlers are listed below ** //
      .addCase(editPool.pending, (state) => {
        state.isEditPoolLoading = true;
      })
      .addCase(editPool.fulfilled, (state, payload) => {
        const {
          payload: { updatedPool },
        } = payload;
        const allPools = state.allPools.filter(
          (pool: any) => pool.id !== updatedPool.id
        );
        state.allPools = [...allPools, updatedPool];
        state.isEditPoolLoading = false;
      })
      .addCase(editPool.rejected, (state, payload) => {
        console.log(payload);
        state.isEditPoolLoading = false;
      })
      // ** Replicate Pool handlers are listed below ** //
      .addCase(replicatePool.pending, (state) => {
        state.isReplicatePoolLoading = true;
      })
      .addCase(replicatePool.fulfilled, (state, payload) => {
        const {
          payload: { replicatedPool },
        } = payload;
        state.allPools = [...state.allPools, replicatedPool];
        state.isReplicatePoolLoading = false;
      })
      .addCase(replicatePool.rejected, (state, payload) => {
        console.log(payload);
        state.isReplicatePoolLoading = false;
      })
      // ** Archive Pool handlers are listed below ** //
      .addCase(archivePool.pending, (state) => {
        state.isArchivePoolLoading = true;
      })
      .addCase(archivePool.fulfilled, (state, payload) => {
        const allPools = state.allPools.filter(
          (pool: any) => pool.id !== state.archivePoolId
        );
        console.log(allPools);
        state.allPools = [...allPools];
        state.isArchivePoolLoading = false;
      })
      .addCase(archivePool.rejected, (state, payload) => {
        console.log(payload);
        state.isArchivePoolLoading = false;
      });
  },
});

export const {
  clearInputs,
  handleChange,
  setBetEndTime,
  handleEditPool,
  setContractMatchIds,
  setArchivePoolId,
  setReplicatePoolId,
  handleSelectChange,
  toggleEditPoolLoading,
  toggleCreatePoolLoading,
  toggleArchivePoolLoading,
  toggleReplicatePoolLoading,
} = poolSlice.actions;

export default poolSlice.reducer;
