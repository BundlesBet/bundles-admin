export const SLICE_NAMES = {
  POOLS: "pools",
  ADMINS: "admins",
};

// Below are the ACTIONS for createAsyncThunk
export const POOL_EDIT_POOL = "POOL_EDIT_POOL";
export const POOL_CREATE_POOL = "POOL_CREATE_POOL";
export const POOL_FETCH_POOLS = "POOL_FETCH_POOLS";
export const POOL_ARCHIVE_POOL = "POOL_ARCHIVE_POOL";
export const POOL_FETCH_SPORTS = "POOL_FETCH_SPORTS";
export const POOL_FETCH_LEAGUES = "POOL_FETCH_LEAGUES";
export const POOL_FETCH_MATCHES = "POOL_FETCH_MATCHES";
export const POOL_CREATE_REPLICATE = "POOL_CREATE_REPLICATE";

export const IS_ADMIN_CONTRACT_CALL = "isAdmin(address)";
export const ADD_POOL_CONTRACT_CALL =
  "addPoolData(string,uint256,uint256,uint256,uint256,string[],uint256,uint256)";
export const ARCHIVE_POOL_CONTRACT_CALL = "archivePool(uint256)";
export const UPDATE_POOL_CONTRACT_CALL =
  "updatePool(uint256,string,uint256,uint256)";
export const BATCH_ADD_MATCHES_CONTRACT_CALL =
  "batchAddMatches(string[],string[],string[],string[])";
