/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ContractInterface extends utils.Interface {
  functions: {
    "addPoolData(string,uint256,uint256,uint256,uint256,string[],uint256)": FunctionFragment;
    "archivePool(uint256)": FunctionFragment;
    "batchAddMatches(string[],string[],string[],string[])": FunctionFragment;
    "cancelBet(uint256)": FunctionFragment;
    "claimReward(uint256)": FunctionFragment;
    "placeBets(uint256,string[],uint256[])": FunctionFragment;
    "updatePool(uint256,string,uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addPoolData"
      | "archivePool"
      | "batchAddMatches"
      | "cancelBet"
      | "claimReward"
      | "placeBets"
      | "updatePool"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addPoolData",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "archivePool",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "batchAddMatches",
    values: [
      PromiseOrValue<string>[],
      PromiseOrValue<string>[],
      PromiseOrValue<string>[],
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelBet",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "placeBets",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updatePool",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "addPoolData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "archivePool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchAddMatches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "cancelBet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "placeBets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updatePool", data: BytesLike): Result;

  events: {};
}

export interface Contract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addPoolData(
      pool_name: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocol_fee: PromiseOrValue<BigNumberish>,
      bet_start_time: PromiseOrValue<BigNumberish>,
      bet_end_time: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      participants: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    archivePool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    batchAddMatches(
      espn_ids: PromiseOrValue<string>[],
      match_names: PromiseOrValue<string>[],
      teamAs: PromiseOrValue<string>[],
      teamBs: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelBet(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimReward(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    placeBets(
      pool_id: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      selections: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updatePool(
      poolID: PromiseOrValue<BigNumberish>,
      poolName: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocolFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addPoolData(
    pool_name: PromiseOrValue<string>,
    entry_fee: PromiseOrValue<BigNumberish>,
    protocol_fee: PromiseOrValue<BigNumberish>,
    bet_start_time: PromiseOrValue<BigNumberish>,
    bet_end_time: PromiseOrValue<BigNumberish>,
    match_ids: PromiseOrValue<string>[],
    participants: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  archivePool(
    poolId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  batchAddMatches(
    espn_ids: PromiseOrValue<string>[],
    match_names: PromiseOrValue<string>[],
    teamAs: PromiseOrValue<string>[],
    teamBs: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelBet(
    pool_id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimReward(
    pool_id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  placeBets(
    pool_id: PromiseOrValue<BigNumberish>,
    match_ids: PromiseOrValue<string>[],
    selections: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updatePool(
    poolID: PromiseOrValue<BigNumberish>,
    poolName: PromiseOrValue<string>,
    entry_fee: PromiseOrValue<BigNumberish>,
    protocolFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addPoolData(
      pool_name: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocol_fee: PromiseOrValue<BigNumberish>,
      bet_start_time: PromiseOrValue<BigNumberish>,
      bet_end_time: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      participants: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    archivePool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    batchAddMatches(
      espn_ids: PromiseOrValue<string>[],
      match_names: PromiseOrValue<string>[],
      teamAs: PromiseOrValue<string>[],
      teamBs: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    cancelBet(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimReward(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    placeBets(
      pool_id: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      selections: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    updatePool(
      poolID: PromiseOrValue<BigNumberish>,
      poolName: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocolFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addPoolData(
      pool_name: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocol_fee: PromiseOrValue<BigNumberish>,
      bet_start_time: PromiseOrValue<BigNumberish>,
      bet_end_time: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      participants: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    archivePool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    batchAddMatches(
      espn_ids: PromiseOrValue<string>[],
      match_names: PromiseOrValue<string>[],
      teamAs: PromiseOrValue<string>[],
      teamBs: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelBet(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimReward(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    placeBets(
      pool_id: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      selections: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updatePool(
      poolID: PromiseOrValue<BigNumberish>,
      poolName: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocolFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addPoolData(
      pool_name: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocol_fee: PromiseOrValue<BigNumberish>,
      bet_start_time: PromiseOrValue<BigNumberish>,
      bet_end_time: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      participants: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    archivePool(
      poolId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    batchAddMatches(
      espn_ids: PromiseOrValue<string>[],
      match_names: PromiseOrValue<string>[],
      teamAs: PromiseOrValue<string>[],
      teamBs: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelBet(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimReward(
      pool_id: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    placeBets(
      pool_id: PromiseOrValue<BigNumberish>,
      match_ids: PromiseOrValue<string>[],
      selections: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updatePool(
      poolID: PromiseOrValue<BigNumberish>,
      poolName: PromiseOrValue<string>,
      entry_fee: PromiseOrValue<BigNumberish>,
      protocolFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
