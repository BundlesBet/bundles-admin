import { polygon, polygonMumbai } from "wagmi/chains";

import { abi, contractName } from "./contracts/contract.json";

const allowedChain =
  process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
    ? [polygonMumbai]
    : [polygon];

export const contractDetails = {
  adminContract: {
    address: `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
    abi,
    name: contractName,
    chainId: allowedChain[0].id,
  },
};
