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

const initialState = {
  fee: "",
  sport: "",
  league: "",
  sports: [],
  leagues: [],
  poolName: "",
  editPool: {},
  editPoolId: "",
  totalPools: 0,
  allMatches: [],
  protocolFee: "",
  isLoading: false,
  replicatePoolId: "",
  allPools: [] as any,
  rewardPercentage: "",
  isPoolEditing: false,
  startTime: new Date(),
  isEditPoolLoading: false,
  selectedMatches: [] as any,
  isAllSportsLoading: false,
  isAllLeaguesLoading: false,
  isAllMatchesLoading: false,
  isCreatePoolLoading: false,
  isArchivePoolLoading: false,
  isReplicatePoolLoading: false,
};

export const fetchAllPools = createAsyncThunk(
  POOL_FETCH_POOLS,
  async (_, thunkAPI) => {
    try {
      return fetchPools();
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
      return fetchSports();
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
      return fetchLeagues(sportName);
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
      return fetchMatches(sport, league);
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
      const response = await createPool(poolDetails);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(clearInputs());
      return response;
    } catch {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const replicatePool = createAsyncThunk(
  POOL_CREATE_REPLICATE,
  async (poolDetails, thunkAPI) => {
    try {
      const response = await poolReplication(poolDetails);
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(clearInputs());
      return response;
    } catch {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editPool = createAsyncThunk(
  POOL_EDIT_POOL,
  async (poolDetails, thunkAPI) => {
    try {
      const response = await poolReplication(poolDetails);
      console.log(response);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      thunkAPI.dispatch(clearInputs());
      return response;
    } catch {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const archivePool = createAsyncThunk(
  POOL_ARCHIVE_POOL,
  async ({ poolId }, thunkAPI) => {
    if (!poolId) return;
    try {
      const response = await poolArchive(poolId);
      console.log(response);
      return response;
    } catch {
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
      const matchExists = state.selectedMatches.some(
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
      console.log(poolToBeEdited);
      state.editPool = poolToBeEdited;
    },
    setReplicatePoolId: (state, payload) => {
      const {
        payload: { poolId },
      } = payload;
      state.replicatePoolId = poolId;
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
  handleEditPool,
  setReplicatePoolId,
  handleSelectChange,
} = poolSlice.actions;

export default poolSlice.reducer;
