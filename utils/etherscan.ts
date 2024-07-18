import axios from "axios";
import {
  BalanceResponse,
  Transaction,
  TransactionDetails,
  TransactionResponse,
  TransactionStatus,
} from "../types/transactions";

const ETHERSCAN_API_KEY = "NNSFDSIRYXVSHEZWM7696368XU4UHCINXS";
const PAGE_LIMIT = 100; // Limiting to 100 entries
const PAGE_START = 1;
const BASE_URL = "https://api.etherscan.io/api";

/**
 * @description: Gets list of normal transactions of a given address
 * @param address
 * @returns
 */
export const getTransactions = async (
  address: string
): Promise<Transaction[]> => {
  try {
    const response = await axios.get<TransactionResponse>(BASE_URL, {
      params: {
        module: "account",
        action: "txlist",
        address,
        startblock: 0,
        endblock: 99999999,
        sort: "desc",
        apiKey: ETHERSCAN_API_KEY,
        page: PAGE_START,
        offset: PAGE_LIMIT,
      },
    });

    if (response.data.status !== "1") {
      throw new Error("Failed to fetch transactions");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

/**
 * @description Get balance in Wei for a given address
 * @param address
 * @returns
 */
export const getBalance = async (address: string): Promise<string> => {
  try {
    const response = await axios.get<BalanceResponse>(BASE_URL, {
      params: {
        module: "account",
        action: "balance",
        address,
        tag: "latest",
        apiKey: ETHERSCAN_API_KEY,
      },
    });

    if (response.data.status !== "1") {
      throw new Error("Failed to fetch balance");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

/**
 * @description: Gets the transaction status from hash. This can be success or a failour with a reason
 * @param txhash
 * @returns
 */
export const getTransactionStatus = async (
  txhash: string
): Promise<TransactionStatus> => {
  try {
    const response = await axios.get<{ result: TransactionStatus }>(BASE_URL, {
      params: {
        module: "transaction",
        action: "getstatus",
        txhash,
        apiKey: ETHERSCAN_API_KEY,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

/**
 * @description Gets transaction object from hash! Note: This API response doesn't contain timestamp and gas used.
 * @param txHash
 * @returns
 */
export const getTransactionDetailsFromHash = async (
  txHash: string
): Promise<TransactionDetails> => {
  try {
    const response = await axios.get<{ result: TransactionDetails }>(BASE_URL, {
      params: {
        module: "proxy",
        action: "eth_getTransactionByHash",
        txhash: txHash,
        apiKey: ETHERSCAN_API_KEY,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};

/**
 * @description Get transaction object from block. We limit the search by setting start and end block as same.
 *              This was required because as per the assessment we need to show gas used and timeStamp on details page.
 * @param address
 * @param block
 * @returns
 */

export const getTransactionDetailsFromBlockNumber = async (
  address: string,
  block: number
): Promise<Transaction> => {
  try {
    const response = await axios.get<TransactionResponse>(BASE_URL, {
      params: {
        module: "account",
        action: "txlist",
        address,
        startblock: block,
        endblock: block,
        sort: "desc",
        apiKey: ETHERSCAN_API_KEY,
        page: PAGE_START,
        offset: PAGE_LIMIT,
      },
    });

    if (response.data.status !== "1") {
      throw new Error("Failed to fetch transactions");
    }
    return response.data.result[0];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
