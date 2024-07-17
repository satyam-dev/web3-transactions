import axios from "axios";

const ETHERSCAN_API_KEY = "NNSFDSIRYXVSHEZWM7696368XU4UHCINXS";

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  gasUsed: string;
  gas: string;
  gasPrice: string;
}

interface TransactionResponse {
  status: string;
  message: string;
  result: Transaction[];
}

export interface TransactionStatus {
  isError: "1" | "0";
  errDescription: string;
}

export interface GetUsedGasParams {
  data: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
}

export const getTransactions = async (
  address: string
): Promise<Transaction[]> => {
  try {
    const response = await axios.get<TransactionResponse>(
      `https://api.etherscan.io/api`,
      {
        params: {
          module: "account",
          action: "txlist",
          address,
          startblock: 0,
          endblock: 99999999,
          sort: "desc",
          apiKey: ETHERSCAN_API_KEY,
          page: 1,
          offset: 100,
        },
      }
    );

    if (response.data.status !== "1") {
      throw new Error("Failed to fetch transactions");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

interface BalanceResponse {
  status: string;
  message: string;
  result: string;
}

export const getBalance = async (address: string): Promise<string> => {
  try {
    const response = await axios.get<BalanceResponse>(
      `https://api.etherscan.io/api`,
      {
        params: {
          module: "account",
          action: "balance",
          address,
          tag: "latest",
          apiKey: ETHERSCAN_API_KEY,
        },
      }
    );

    if (response.data.status !== "1") {
      throw new Error("Failed to fetch balance");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

export const getTransactionStatus = async (
  txhash: string
): Promise<TransactionStatus> => {
  try {
    const response = await axios.get<{ result: TransactionStatus }>(
      `https://api.etherscan.io/api`,
      {
        params: {
          module: "transaction",
          action: "getstatus",
          txhash,
          apiKey: ETHERSCAN_API_KEY,
        },
      }
    );

    return response.data.result;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

export interface TransactionDetails {
  value: string;

  gas: string;
  gasPrice: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  blockNumber: string;
  hash: string;
  to: string;
}

export const getTransactionDetails = async (
  txHash: string
): Promise<TransactionDetails> => {
  try {
    const response = await axios.get<{ result: TransactionDetails }>(
      `https://api.etherscan.io/api`,
      {
        params: {
          module: "proxy",
          action: "eth_getTransactionByHash",
          txhash: txHash,
          apiKey: ETHERSCAN_API_KEY,
        },
      }
    );

    // console.log({ response: response.data });

    // if (response.data.status !== "1") {
    //   throw new Error("Failed to fetch transaction details");
    // }

    return response.data.result;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};

export const getTransactionDetailsV2 = async (
  address: string,
  block: number
): Promise<Transaction> => {
  try {
    const response = await axios.get<TransactionResponse>(
      `https://api.etherscan.io/api`,
      {
        params: {
          module: "account",
          action: "txlist",
          address,
          startblock: block,
          endblock: block,
          sort: "desc",
          apiKey: ETHERSCAN_API_KEY,
          page: 1,
          offset: 100,
        },
      }
    );

    if (response.data.status !== "1") {
      throw new Error("Failed to fetch transactions");
    }
    console.log(response.data.result[0]);
    return response.data.result[0];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
